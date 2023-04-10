import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AwsCognitoService } from '../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from '../src/users/aws-cognito/__mock__/aws-cognito.service.mock';
import { createToken } from './utils/tokenService';
import { EmailInUseException } from '../src/errors/emailInUseException';
import { EmailInActiveInviteException } from '../src/errors/emailInActiveInviteException';
import { InviteNotActiveException } from '../src/errors/inviteNotActiveException';

import { LedgerModule } from '../src/ledger/ledger.module';

import {
  user1,
  user2,
  admin,
  org1,
  org2,
  userInvite1,
  userInviteCompleted,
  userInviteCanceled,
  userInviteOrg2,
} from './utils/preseededData';

import {
  expectUserInviteRsp,
  expectUserInviteDB,
} from './utils/userInviteChecks';
import { UserInviteStatusEnum, UserRoleEnum } from '@prisma/client';
import { MailerService } from '@nestjs-modules/mailer';
import { MailerServiceMock } from '../src/emails/__mocks__/mailer.service.mock';

jest.mock('../src/users/jwt-values.service');

export const expectOrgTransactionRsp = (responseBody, expectedValue) => {
  expect(responseBody.orgId).toEqual(expectedValue.orgId);
  expect(responseBody.type).toEqual(expectedValue.type);
  expect(responseBody.totalAmount).toEqual(expectedValue.totalAmount);
  expect(responseBody.createdAt).toBeDefined();
  if (expectedValue.event) {
    expect(responseBody.event.description).toEqual(
      expectedValue.event.description,
    );
  } else {
    expect(responseBody.event).toBeFalsy();
  }
};

describe('admin user invites', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const testStartTime = new Date();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, UsersModule, LedgerModule],
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

  describe('/admin/orgs/:id/user-invites (GET)', () => {
    it('/ (GET) - get ORG USER INVITES by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .get(`/admin/orgs/${org1.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);

      const rspInvites = response.body;
      expect(rspInvites.length).toEqual(3);
      expectUserInviteRsp(rspInvites[0], userInvite1);
      expectUserInviteRsp(rspInvites[1], userInviteCompleted);
      expectUserInviteRsp(rspInvites[2], userInviteCanceled);
    });

    it('/ (GET) - get ORG2 USER INVITES by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .get(`/admin/orgs/${org2.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);
      const rspInvites = response.body;
      expect(rspInvites.length).toEqual(2);
    });

    it('/ (GET) - ADMIN user, get WRONG ORG USER INVITES', async () => {
      await request(app.getHttpServer())
        .get(`/admin/orgs/${user1.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(404);
    });

    it('/ (GET) - NON ADMIN user, get ORG USER INVITES', async () => {
      await request(app.getHttpServer())
        .get(`/admin/orgs/${org1.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(403);
    });

    it('/ (GET) - try to get ORG USER INVITES without token', async () => {
      await request(app.getHttpServer())
        .get(`/admin/orgs/${org1.id}/user-invites/`)
        .expect(401);
    });
  });

  describe('/admin/orgs/:id/user-invites (POST)', () => {
    const newUserInvite = {
      email: 'email@newinvite.com',
    };

    it('/ (POST) - create ORG USER INVITE by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/orgs/${org1.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
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
        createdById: admin.id,
        userRole: UserRoleEnum.BASIC_USER,
      });
      await prisma.userInvite.delete({ where: { id } });
    });

    it('/ (POST) - create ORG2 USER INVITE by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/orgs/${org2.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .send(newUserInvite)
        .expect(201);

      const inviteRsp = response.body;
      expect(inviteRsp.email).toEqual(newUserInvite.email);
      const id = inviteRsp.id;

      await expectUserInviteDB(prisma, id, {
        email: newUserInvite.email,
        status: UserInviteStatusEnum.ACTIVE,
        orgId: org2.id,
        createdById: admin.id,
        userRole: UserRoleEnum.BASIC_USER,
      });
      await prisma.userInvite.delete({ where: { id } });
    });

    it('/ (POST) - create ORG2 USER MANAGER INVITE by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/orgs/${org2.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .send({ ...newUserInvite, userRole: UserRoleEnum.USER_MANAGER })
        .expect(201);

      const inviteRsp = response.body;
      expect(inviteRsp.email).toEqual(newUserInvite.email);
      const id = inviteRsp.id;

      await expectUserInviteDB(prisma, id, {
        email: newUserInvite.email,
        status: UserInviteStatusEnum.ACTIVE,
        orgId: org2.id,
        createdById: admin.id,
        userRole: UserRoleEnum.USER_MANAGER,
      });
      await prisma.userInvite.delete({ where: { id } });
    });

    it('/ (POST) - USER_INVITE by ADMIN - invite exists', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/orgs/${org2.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: admin.email,
              sub: admin.cognitoSub,
            }),
        )
        .send({ email: userInvite1.email })
        .expect(400);
      expect(response.body.message).toEqual(
        EmailInActiveInviteException.defaultMessage,
      );
    });

    it('/ (POST) - USER_INVITE by ADMIN - user exists', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/orgs/${org2.id}/user-invites/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: admin.email,
              sub: admin.cognitoSub,
            }),
        )
        .send({ email: user1.email })
        .expect(400);
      expect(response.body.message).toEqual(EmailInUseException.defaultMessage);
    });

    it('/ (POST) - NON ADMIN, create USER_INVITE', async () => {
      await request(app.getHttpServer())
        .post(`/admin/orgs/${org2.id}/user-invites/`)
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
        .post(`/admin/orgs/${org2.id}/user-invites/`)
        .send(newUserInvite)
        .expect(401);
    });
  });

  describe('/admin/:id/cancel (POST)', () => {
    it('/admin/user-invites/:id/cancel (POST) - USER_INVITE by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/user-invites/${userInviteOrg2.id}/cancel`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: admin.email,
              sub: admin.cognitoSub,
            }),
        )
        .expect(201);

      const inviteRsp = response.body;
      const id = inviteRsp.id;

      await expectUserInviteDB(prisma, id, {
        email: userInviteOrg2.email,
        status: UserInviteStatusEnum.CANCELED,
        orgId: org2.id,
        createdById: userInviteOrg2.createdById,
        userRole: UserRoleEnum.BASIC_USER,
      });

      await prisma.userInvite.update({
        where: { id },
        data: {
          status: UserInviteStatusEnum.ACTIVE,
        },
      });
    });

    it('/:id/cancel (POST) - USER_INVITE by ADMIN, invite COMPLETED', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/user-invites/${userInviteCompleted.id}/cancel`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: admin.email,
              sub: admin.cognitoSub,
            }),
        )
        .send({ email: userInvite1.email })
        .expect(400);
      expect(response.body.message).toEqual(
        InviteNotActiveException.defaultMessage,
      );
    });

    it('/:id/cancel (POST) - NON ADMIN user, cancel USER_INVITE', async () => {
      await request(app.getHttpServer())
        .post(`/admin/user-invites/${userInviteOrg2.id}/cancel`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(403);
    });

    it('/:id/cancel (POST) - try to cancel USER_INVITE', async () => {
      await request(app.getHttpServer())
        .post(`/user-invites/${userInviteOrg2.id}/cancel`)
        .expect(401);
    });
  });
});
