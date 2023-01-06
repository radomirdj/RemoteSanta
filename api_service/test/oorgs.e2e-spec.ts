import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';
import { AwsCognitoService } from '../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from '../src/users/aws-cognito/__mock__/aws-cognito.service.mock';
import { createToken } from './utils/tokenService';
import { expectOrgRsp } from './utils/orgsChecks';
import {
  user2,
  user3Manager,
  org1,
  org2,
  org1Transactions,
  org1Points,
  org2Points,
  org2Manager,
} from './utils/preseededData';

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

describe('orgs', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, UsersModule],
    })
      .overrideProvider(AwsCognitoService)
      .useValue(AwsCognitoServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/current_org (GET)', () => {
    it('/current_org (GET) - get ORG details by USER_MANAGER', async () => {
      const response = await request(app.getHttpServer())
        .get('/orgs/current_org')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .expect(200);

      const rspOrg = response.body;
      expectOrgRsp(rspOrg, {
        ...org1,
        balance: org1Points,
      });
    });

    it('/current_org (GET) - get ORG2 details by USER_MANAGER', async () => {
      const response = await request(app.getHttpServer())
        .get('/orgs/current_org')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: org2Manager.email,
              sub: org2Manager.cognitoSub,
            }),
        )
        .expect(200);
      const rspOrg = response.body;
      expectOrgRsp(rspOrg, {
        ...org2,
        balance: org2Points,
      });
    });

    it('/current_org (GET) - NON USER_MANAGER user, get ORG details', async () => {
      await request(app.getHttpServer())
        .get('/orgs/current_org')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(403);
    });

    it('/current_org (GET) - try to get ORG details without token', async () => {
      await request(app.getHttpServer()).get('/orgs/current_org').expect(401);
    });
  });

  describe('/current_org/transactions (GET)', () => {
    it('/ (GET) - get ORGS TRANSACTIONS by USER_MANAGER', async () => {
      const response = await request(app.getHttpServer())
        .get('/orgs/current_org/transactions/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .expect(200);

      expect(response.body.length).toEqual(4);
      expectOrgTransactionRsp(response.body[0], org1Transactions[0]);
      expectOrgTransactionRsp(response.body[1], org1Transactions[1]);
    });

    it('/ (GET) - get ORGS2 TRANSACTIONS by USER_MANAGER', async () => {
      const response = await request(app.getHttpServer())
        .get('/orgs/current_org/transactions/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: org2Manager.email,
              sub: org2Manager.cognitoSub,
            }),
        )
        .expect(200);

      expect(response.body.length).toEqual(0);
    });

    it('/ (GET) - NON USER_MANAGER try to get ORGS TRANSACTIONS', async () => {
      await request(app.getHttpServer())
        .get('/orgs/current_org/transactions/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user2.email,
              sub: user2.cognitoSub,
            }),
        )
        .expect(403);
    });
  });
});
