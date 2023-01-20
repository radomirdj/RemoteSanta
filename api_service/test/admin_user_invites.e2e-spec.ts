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

import { LedgerService } from '../src/ledger/ledger.service';
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
} from './utils/preseededData';
import { expectUserInviteRsp } from './utils/userInviteChecks';

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
      expect(rspInvites.length).toEqual(0);
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
});
