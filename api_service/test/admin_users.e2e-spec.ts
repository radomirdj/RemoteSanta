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
import { MailerService } from '@nestjs-modules/mailer';
import { MailerServiceMock } from '../src/emails/__mocks__/mailer.service.mock';
import {
  UserRoleEnum,
  LedgerTypeEnum,
  OrgTransactionTypeEnum,
  Prisma,
} from '@prisma/client';
import { LedgerModule } from '../src/ledger/ledger.module';
import { LedgerService } from '../src/ledger/ledger.service';
import {
  checkOneAddedLedger,
  checkBalance,
  checkZeroAddedLedger,
} from './utils/ledgerChecks';

import {
  user1,
  user2,
  user1ActivePoints,
  user1ReservedPoints,
  admin,
  org1,
  user1ActiveBalanceSideId,
  org1BalanceSideId,
  org1Points,
  deleteUserEvent,
  user2ActivePoints,
  user2ReservedPoints,
  user3Manager,
  orgSendToUserEvent,
} from './utils/preseededData';
import { expectUserRsp } from './utils/userChecks';

jest.mock('../src/users/jwt-values.service');
jest.mock('../src/worker_user_invites/woker_module_config');
 

describe('admin/users', () => {
  let app: INestApplication;
  let ledgerService: LedgerService;
  const testStartTime = new Date();
  let prisma: PrismaService;

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
    ledgerService = app.get(LedgerService);
    await app.init();
  });

  describe('/:id (GET)', () => {
    it('/:id (GET) - get USER1 details by ADMIN', async () => {
      const response = await request(app.getHttpServer())
        .get(`/admin/users/${user1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);

      expect(response.body.userBalance.pointsActive).toEqual(user1ActivePoints);
      expect(response.body.userBalance.pointsReserved).toEqual(
        user1ReservedPoints,
      );

      expectUserRsp(response.body, {
        ...user1,
        userRole: UserRoleEnum.BASIC_USER,
        orgName: org1.name,
      });
    });

    it('/:id (GET) - get wrong USER details by ADMIN', async () => {
      await request(app.getHttpServer())
        .get(`/admin/users/${org1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(404);
    });

    it('/:id (GET) - NON ADMIN user, get USER details', async () => {
      await request(app.getHttpServer())
        .get(`/admin/users/${user1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(403);
    });

    it('/:id (GET) - try to get USER details without token', async () => {
      await request(app.getHttpServer())
        .get(`/admin/users/${user1.id}`)
        .expect(401);
    });
  });

  describe('/:id/send-points (POST)', () => {
    const sendPointsBody = {
      amount: 550,
      message: 'abcba',
    };

    it('/:id/send-points (POST) - SEND ORG POINTS to USER1 by ADMIN', async () => {
      await request(app.getHttpServer())
        .post(`/admin/users/${user1.id}/send-points`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .send(sendPointsBody)
        .expect(201);

      // Check Ledger and balance
      await checkOneAddedLedger(prisma, testStartTime, {
        fromId: org1BalanceSideId,
        toId: user1ActiveBalanceSideId,
        amount: sendPointsBody.amount,
        type: LedgerTypeEnum.ORG_TO_EMPLOYEES_BY_EVENT,
      });

      await checkBalance(ledgerService, user1.id, {
        pointsActive: user1ActivePoints + sendPointsBody.amount,
        pointsReserved: user1ReservedPoints,
      });

      const orgBalance = await ledgerService.getOrgBalance(org1.id);
      expect(orgBalance).toEqual(org1Points - sendPointsBody.amount);

      // Check Org Transaction
      const orgTransactionList = await prisma.orgTransaction.findMany({
        where: {
          createdAt: {
            gte: testStartTime,
          },
        },
      });

      expect(orgTransactionList.length).toEqual(1);
      const orgTransaction = orgTransactionList[0];
      expect(orgTransaction.totalAmount).toEqual(sendPointsBody.amount);
      expect(orgTransaction.message).toEqual(sendPointsBody.message);
      expect(orgTransaction.createdById).toEqual(admin.id);
      expect(orgTransaction.eventId).toEqual(orgSendToUserEvent.id);
      expect(orgTransaction.type).toEqual(
        OrgTransactionTypeEnum.ORG_TO_EMPLOYEES_BY_EVENT,
      );
      expect(orgTransaction.orgId).toEqual(org1.id);

      // Check Org Transaction Fulfillment
      const dbClaimPointsEventFulfillmentList =
        await prisma.claimPointsEventFulfillment.findMany({
          where: {
            orgTransactionId: orgTransaction.id,
          },
        });

      expect(dbClaimPointsEventFulfillmentList.length).toEqual(1);
      expect(dbClaimPointsEventFulfillmentList[0].amount).toEqual(
        sendPointsBody.amount,
      );

      expect(dbClaimPointsEventFulfillmentList[0].orgTransactionId).toEqual(
        orgTransaction.id,
      );

      // Clean DB
      await prisma.ledger.deleteMany({
        where: {
          createdAt: {
            gte: testStartTime,
          },
        },
      });

      await prisma.claimPointsEventFulfillment.deleteMany({
        where: {
          orgTransactionId: orgTransaction.id,
        },
      });

      await prisma.orgTransaction.deleteMany({
        where: {
          id: orgTransaction.id,
        },
      });
    });

    it('/:id/send-points (POST) - TRY TO SEND ORG POINTS to USER1 by ADMIN - not enough points', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/users/${user1.id}/send-points`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .send({ ...sendPointsBody, amount: 50000 })
        .expect(400);

      await checkBalance(ledgerService, user1.id, {
        pointsActive: user1ActivePoints,
        pointsReserved: user1ReservedPoints,
      });

      expect(response.body.message).toEqual('Not Enough Balance');
      const orgBalance = await ledgerService.getOrgBalance(org1.id);
      expect(orgBalance).toEqual(org1Points);
    });

    it('/:id/send-points (POST) - TRY TO SEND ORG POINTS to USER1 by ADMIN - NON ADMIN', async () => {
      await request(app.getHttpServer())
        .post(`/admin/users/${user1.id}/send-points`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user1.email, sub: user1.cognitoSub }),
        )
        .send(sendPointsBody)
        .expect(403);
    });
  });

  describe('/:id (DELETE)', () => {
    it('/:id (DELETE) - delete USER1 by ADMIN', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/users/${user1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);

      const userList = await prisma.user.findMany({
        where: { id: user1.id },
      });
      expect(userList.length).toEqual(0);

      // Check Ledger and balance
      await checkOneAddedLedger(prisma, testStartTime, {
        fromId: user1ActiveBalanceSideId,
        toId: org1BalanceSideId,
        amount: user1ActivePoints,
        type: LedgerTypeEnum.EMPLOYEES_TO_ORG_BY_EVENT,
      });

      await checkBalance(ledgerService, user1.id, {
        pointsActive: 0,
        pointsReserved: user1ReservedPoints,
      });

      const orgBalance = await ledgerService.getOrgBalance(org1.id);
      expect(orgBalance).toEqual(org1Points + user1ActivePoints);

      // Check Org Transaction
      const orgTransactionList = await prisma.orgTransaction.findMany({
        where: {
          createdAt: {
            gte: testStartTime,
          },
        },
      });

      expect(orgTransactionList.length).toEqual(1);
      const orgTransaction = orgTransactionList[0];
      expect(orgTransaction.totalAmount).toEqual(user1ActivePoints);
      expect(orgTransaction.createdById).toEqual(admin.id);
      expect(orgTransaction.eventId).toEqual(deleteUserEvent.id);
      expect(orgTransaction.type).toEqual(
        OrgTransactionTypeEnum.EMPLOYEES_TO_ORG_BY_EVENT,
      );
      expect(orgTransaction.orgId).toEqual(org1.id);

      // Check Org Transaction Fulfillment
      const dbClaimPointsEventFulfillmentList =
        await prisma.claimPointsEventFulfillment.findMany({
          where: {
            orgTransactionId: orgTransaction.id,
          },
        });

      expect(dbClaimPointsEventFulfillmentList.length).toEqual(1);
      expect(dbClaimPointsEventFulfillmentList[0].amount).toEqual(
        user1ActivePoints,
      );
      expect(dbClaimPointsEventFulfillmentList[0].orgTransactionId).toEqual(
        orgTransaction.id,
      );

      // Clean DB
      await prisma.ledger.deleteMany({
        where: {
          createdAt: {
            gte: testStartTime,
          },
        },
      });

      await prisma.claimPointsEventFulfillment.deleteMany({
        where: {
          orgTransactionId: orgTransaction.id,
        },
      });

      await prisma.orgTransaction.deleteMany({
        where: {
          id: orgTransaction.id,
        },
      });

      await prisma.$queryRaw(
        Prisma.sql`UPDATE  public."User" set deleted = false WHERE id = ${user1.id}`,
      );
    });

    it('/:id (DELETE) - delete USER2 0 points by ADMIN', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/users/${user2.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);

      const userList = await prisma.user.findMany({
        where: { id: user2.id },
      });
      expect(userList.length).toEqual(0);

      // Check Ledger and balance
      await checkZeroAddedLedger(prisma, testStartTime);

      await checkBalance(ledgerService, user2.id, {
        pointsActive: user2ActivePoints,
        pointsReserved: user2ReservedPoints,
      });

      const orgBalance = await ledgerService.getOrgBalance(org1.id);
      expect(orgBalance).toEqual(org1Points);

      // Check Org Transaction
      const orgTransactionList = await prisma.orgTransaction.findMany({
        where: {
          createdAt: {
            gte: testStartTime,
          },
        },
      });

      expect(orgTransactionList.length).toEqual(0);

      // Clean DB
      await prisma.$queryRaw(
        Prisma.sql`UPDATE  public."User" set deleted = false WHERE id = ${user2.id}`,
      );
    });

    it('/:id (DELETE) - ADMIN try to delete user manager', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/users/${user3Manager.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(405);

      const userList = await prisma.user.findMany({
        where: { id: user3Manager.id },
      });
      expect(userList.length).toEqual(1);
    });

    it('/:id (DELETE) - NON ADMIN try to delete user', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/users/${user1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .expect(403);
    });

    it('/:id (DELETE) - NON authorised user try to delete user', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/users/${user1.id}`)
        .expect(401);
    });
  });
});
