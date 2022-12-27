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
import { OrgTransactionTypeEnum } from '@prisma/client';

import {
  user2,
  admin,
  org1,
  org2,
  org1Transactions,
} from './utils/preseededData';

jest.mock('../src/users/jwt-values.service');

export const expectOrgTransactionRsp = (responseBody, expectedValue) => {
  expect(responseBody.orgId).toEqual(expectedValue.orgId);
  expect(responseBody.type).toEqual(expectedValue.type);
  expect(responseBody.totalAmount).toEqual(expectedValue.totalAmount);
  if (expectedValue.event) {
    expect(responseBody.event.description).toEqual(
      expectedValue.event.description,
    );
  } else {
    expect(responseBody.event).toBeFalsy();
  }
};

describe('admin/orgs', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
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

  describe('/:id (GET)', () => {
    it('/:id (GET) - get ORG details by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .get(`/admin/orgs/${org1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);
      const rspOrg = response.body;
      expect(rspOrg.name).toEqual(org1.name);
      expect(rspOrg.pointsPerMonth).toEqual(org1.pointsPerMonth);
      expect(rspOrg.userCount).toEqual(4);
      expect(rspOrg.totalPointsPerMonth).toEqual(4800);
    });

    it('/:id (GET) - get ORG2 details by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .get(`/admin/orgs/${org2.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);
      const rspOrg = response.body;
      expect(rspOrg.name).toEqual(org2.name);
      expect(rspOrg.pointsPerMonth).toEqual(org2.pointsPerMonth);
      expect(rspOrg.userCount).toEqual(0);
      expect(rspOrg.totalPointsPerMonth).toEqual(0);
    });

    it('/:id (GET) - NON ADMIN user, get ORG details', async () => {
      await request(app.getHttpServer())
        .get(`/admin/orgs/${org1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(403);
    });

    it('/:id (GET) - try to get ORGS details without token', async () => {
      await request(app.getHttpServer())
        .get(`/admin/orgs/${org1.id}`)
        .expect(401);
    });
  });

  describe('/ (GET)', () => {
    it('/ (GET) - get ORGS by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .get('/admin/orgs/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);

      expect(response.body.length).toEqual(2);
      const rspOrg = response.body[0];
      expect(rspOrg.name).toEqual(org1.name);
      expect(rspOrg.pointsPerMonth).toEqual(org1.pointsPerMonth);
    });

    it('/ (GET) - NON ADMIN user, get ORGS', async () => {
      await request(app.getHttpServer())
        .get('/admin/orgs/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(403);
    });

    it('/ (GET) - try to get ORGS without token', async () => {
      await request(app.getHttpServer()).get('/admin/orgs/').expect(401);
    });
  });

  describe('/:id/transactions (GET)', () => {
    it('/ (GET) - get ORGS TRANSACTIONS by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .get(`/admin/orgs/${org1.id}/transactions/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);

      expect(response.body.length).toEqual(2);
      expectOrgTransactionRsp(response.body[0], org1Transactions[0]);
      expectOrgTransactionRsp(response.body[1], org1Transactions[1]);
    });

    it('/ (GET) - get ORGS2 TRANSACTIONS by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .get(`/admin/orgs/${org2.id}/transactions/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);

      expect(response.body.length).toEqual(0);
    });

    it('/ (GET) - NON ADMIN user, try to get ORGS TRANSACTIONS', async () => {
      await request(app.getHttpServer())
        .get(`/admin/orgs/${org1.id}/transactions/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(403);
    });
  });

  describe('/:id/transactions/admin-to-org/ (POST)', () => {
    const newAdmitToOrgTransaction = {
      amount: 12000,
    };

    it('/ (POST) - ADMIN create admin-to-org transaction', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/orgs/${org1.id}/transactions/admin-to-org/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .send(newAdmitToOrgTransaction)
        .expect(201);

      const id = response.body.id;
      expect(response.body.totalAmount).toEqual(
        newAdmitToOrgTransaction.amount,
      );
      expect(response.body.eventId).toBeFalsy();
      expect(response.body.type).toEqual(OrgTransactionTypeEnum.ADMIN_TO_ORG);
      expect(response.body.orgId).toEqual(org1.id);

      const dbAdminToOrg = await prisma.orgTransaction.findUnique({
        where: {
          id,
        },
      });

      expect(dbAdminToOrg.totalAmount).toEqual(newAdmitToOrgTransaction.amount);
      expect(dbAdminToOrg.eventId).toBeFalsy();
      expect(dbAdminToOrg.type).toEqual(OrgTransactionTypeEnum.ADMIN_TO_ORG);
      expect(dbAdminToOrg.orgId).toEqual(org1.id);
      await prisma.orgTransaction.deleteMany({
        where: {
          id,
        },
      });
    });

    it('/ (POST) - ADMIN try to create admin-to-org transaction with bad ORG id', async () => {
      await request(app.getHttpServer())
        .post(`/admin/orgs/${user2.id}/transactions/admin-to-org/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .send(newAdmitToOrgTransaction)
        .expect(404);
    });

    it('/ (POST) - NOT ADMIN try to create admin-to-org transaction', async () => {
      await request(app.getHttpServer())
        .post(`/admin/orgs/${org1.id}/transactions/admin-to-org/`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .send(newAdmitToOrgTransaction)
        .expect(403);
    });
  });
});
