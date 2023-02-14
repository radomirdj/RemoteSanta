import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';
import { AwsCognitoService } from '../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from '../src/users/aws-cognito/__mock__/aws-cognito.service.mock';
import { PrismaService } from '../src/prisma/prisma.service';
import { createToken } from './utils/tokenService';
import { EmailInUseException } from '../src/errors/emailInUseException';
import { EmailInActiveInviteException } from '../src/errors/emailInActiveInviteException';
import { UserInviteStatusEnum } from '@prisma/client';
import { InviteNotActiveException } from '../src/errors/inviteNotActiveException';
import { MailerService } from '@nestjs-modules/mailer';
import { MailerServiceMock } from '../src/emails/__mocks__/mailer.service.mock';

import {
  user2,
  user3Manager,
  userInvite1,
  userInviteCanceled,
  userInviteCompleted,
  org2Manager,
  user1,
  org1,
} from './utils/preseededData';
import {
  expectUserInviteRsp,
  expectUserInviteDB,
} from './utils/userInviteChecks';

jest.mock('../src/users/jwt-values.service');

describe('user-invites', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, UsersModule],
    })
      .overrideProvider(AwsCognitoService)
      .useValue(AwsCognitoServiceMock)
      .overrideProvider(MailerService)
      .useValue(MailerServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
  });

  describe('/ (GET)', () => {
    it('/ (GET) - get USER_INVITE list by USER_MANAGER', async () => {
      const response = await request(app.getHttpServer())
        .get('/user-invites/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .expect(200);

      const rspInvites = response.body;
      expect(rspInvites.length).toEqual(3);

      expectUserInviteRsp(rspInvites[0], userInvite1);
      expectUserInviteRsp(rspInvites[1], userInviteCompleted);
      expectUserInviteRsp(rspInvites[2], userInviteCanceled);
    });

    it('/ (GET) - get USER_INVITE list by USER_MANAGER ORG2', async () => {
      const response = await request(app.getHttpServer())
        .get('/user-invites/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: org2Manager.email,
              sub: org2Manager.cognitoSub,
            }),
        )
        .expect(200);
      const rspInvites = response.body;
      expect(rspInvites.length).toEqual(2);
    });

    it('/ (GET) - NON USER_MANAGER user, get USER_INVITE list', async () => {
      await request(app.getHttpServer())
        .get('/user-invites/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(403);
    });

    it('/ (GET) - try to get USER_INVITE list', async () => {
      await request(app.getHttpServer()).get('/user-invites/').expect(401);
    });
  });

  describe('/ (POST)', () => {
    const newUserInvite = {
      email: 'email@newinvite.com',
    };

    it('/ (POST) - USER_INVITE by USER_MANAGER', async () => {
      const response = await request(app.getHttpServer())
        .post('/user-invites/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .send(newUserInvite)
        .expect(201);

      const inviteRsp = response.body;
      expect(inviteRsp.email).toEqual(newUserInvite.email);
      const id = inviteRsp.id;

      await expectUserInviteDB(prisma, id, {
        email: newUserInvite.email,
        status: UserInviteStatusEnum.ACTIVE,
        orgId: org1.id,
        createdById: user3Manager.id,
      });
      await prisma.userInvite.delete({ where: { id } });
    });

    it('/ (POST) - USER_INVITE by USER_MANAGER - invite exists', async () => {
      const response = await request(app.getHttpServer())
        .post('/user-invites/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .send({ email: userInvite1.email })
        .expect(400);
      expect(response.body.message).toEqual(
        EmailInActiveInviteException.defaultMessage,
      );
    });

    it('/ (POST) - USER_INVITE by USER_MANAGER - user exists', async () => {
      const response = await request(app.getHttpServer())
        .post('/user-invites/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .send({ email: user1.email })
        .expect(400);
      expect(response.body.message).toEqual(EmailInUseException.defaultMessage);
    });

    it('/ (POST) - NON USER_MANAGER user, create USER_INVITE', async () => {
      await request(app.getHttpServer())
        .post('/user-invites/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .send(newUserInvite)
        .expect(403);
    });

    it('/ (POST) - try to create USER_INVITE', async () => {
      await request(app.getHttpServer())
        .post('/user-invites/')
        .send(newUserInvite)
        .expect(401);
    });
  });

  describe('/:id/cancel (POST)', () => {
    it('/:id/cancel (POST) - USER_INVITE by USER_MANAGER', async () => {
      const response = await request(app.getHttpServer())
        .post(`/user-invites/${userInvite1.id}/cancel`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .expect(201);

      const inviteRsp = response.body;
      const id = inviteRsp.id;

      await expectUserInviteDB(prisma, id, {
        email: userInvite1.email,
        status: UserInviteStatusEnum.CANCELED,
        orgId: org1.id,
        createdById: user3Manager.id,
      });

      await prisma.userInvite.update({
        where: { id },
        data: {
          status: UserInviteStatusEnum.ACTIVE,
        },
      });
    });

    it('/:id/cancel (POST) - USER_INVITE by USER_MANAGER from other ORG', async () => {
      await request(app.getHttpServer())
        .post(`/user-invites/${userInvite1.id}/cancel`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: org2Manager.email,
              sub: org2Manager.cognitoSub,
            }),
        )
        .send({ email: userInvite1.email })
        .expect(404);
    });

    it('/:id/cancel (POST) - USER_INVITE by USER_MANAGER, invite  COMPLETED', async () => {
      const response = await request(app.getHttpServer())
        .post(`/user-invites/${userInviteCompleted.id}/cancel`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .send({ email: userInvite1.email })
        .expect(400);
      expect(response.body.message).toEqual(
        InviteNotActiveException.defaultMessage,
      );
    });

    it('/:id/cancel (POST) - NON USER_MANAGER user, cancel USER_INVITE', async () => {
      await request(app.getHttpServer())
        .post(`/user-invites/${userInviteCompleted.id}/cancel`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(403);
    });

    it('/:id/cancel (POST) - try to cancel USER_INVITE', async () => {
      await request(app.getHttpServer())
        .post(`/user-invites/${userInviteCompleted.id}/cancel`)
        .expect(401);
    });
  });
});
