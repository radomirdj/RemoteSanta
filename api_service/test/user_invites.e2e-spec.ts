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
import {
  user2,
  user3Manager,
  userInvite1,
  userInviteCanceled,
  userInviteCompleted,
  org2Manager,
} from './utils/preseededData';
import { expectUserInviteRsp } from './utils/userInviteChecks';

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

    it('/ (GET) - get USER_INVITE list by USER_MANAGER', async () => {
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
      expect(rspInvites.length).toEqual(0);
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
});
