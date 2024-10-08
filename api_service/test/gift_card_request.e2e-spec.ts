import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { LedgerModule } from '../src/ledger/ledger.module';
import { LedgerService } from '../src/ledger/ledger.service';
import { AwsCognitoService } from '../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from '../src/users/aws-cognito/__mock__/aws-cognito.service.mock';
import { createToken } from './utils/tokenService';
import { AmountFailsCounstraintException } from '../src/errors//amountFailsCounstraintException';
import { NotEnoughBalanceException } from '../src/errors/notEnoughBalanceException';

import {
  expectGiftCardRequestInDB,
  expectGiftCardRequestRsp,
} from './utils/giftCardRequestChecks';

import { GiftCardRequestStatusEnum, LedgerTypeEnum } from '@prisma/client';

import {
  user1,
  user2,
  user3Manager,
  giftCardRequest1,
  giftCardRequest2,
  giftCardIntegration1,
  giftCardIntegration2,
  user1ActiveBalanceSideId,
  user1ReservedBalanceSideId,
  user1ActivePoints,
  user1ReservedPoints,
  user3ActivePoints,
  user3ReservedPoints,
  user3ActiveBalanceSideId,
  user3ReservedBalanceSideId,
  giftCardIntegrationSrb,
  giftCardIntegrationIndia,
  org1,
} from './utils/preseededData';
import { checkOneAddedLedger, checkBalance } from './utils/ledgerChecks';
import { MailerService } from '@nestjs-modules/mailer';
import { MailerServiceMock } from '../src/emails/__mocks__/mailer.service.mock';

import { GogiftApiService } from '../src/gift_card_third_party_api/gogift_api/gogift_api.service';
import { GogiftApiServiceMock } from '../src/gift_card_third_party_api/gogift_api/__mocks__/gogift_api.service.mock';

jest.mock('../src/users/jwt-values.service');
jest.mock('../src/worker_user_invites/woker_module_config');
jest.mock(
  '../src/currency_rates/currency_rates_api/currency_rates_api.service',
);

describe('/gift-card-requests', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let ledgerService: LedgerService;
  const testStartTime = new Date();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, UsersModule, LedgerModule],
    })
      .overrideProvider(AwsCognitoService)
      .useValue(AwsCognitoServiceMock)
      .overrideProvider(MailerService)
      .useValue(MailerServiceMock)
      .overrideProvider(GogiftApiService)
      .useValue(GogiftApiServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    ledgerService = app.get(LedgerService);
    await app.init();
  });

  describe('/:id (GET)', () => {
    it('/:id (GET) - get gift card request - createdBy user - sender', async () => {
      const response = await request(app.getHttpServer())
        .get(`/gift-card-requests/${giftCardRequest1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user1.email, sub: user1.cognitoSub }),
        )
        .expect(200);

      const id = response.body.id;
      expect(id).toEqual(giftCardRequest1.id);

      expectGiftCardRequestRsp(response.body, {
        ...giftCardRequest1,
        integrationTitle: giftCardIntegration1.title,
      });
    });

    it("/:id (GET) - get gift card request - owner user - the one it's sent to", async () => {
      const response = await request(app.getHttpServer())
        .get(`/gift-card-requests/${giftCardRequest1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .expect(200);

      const id = response.body.id;
      expect(id).toEqual(giftCardRequest1.id);

      expectGiftCardRequestRsp(response.body, {
        ...giftCardRequest1,
        integrationTitle: giftCardIntegration1.title,
      });
    });

    it('/:id (GET) - wrong user try to get gift card request', async () => {
      await request(app.getHttpServer())
        .get(`/gift-card-requests/${giftCardRequest1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(404);
    });

    it('/:id (GET) - try to get gift card request without token', async () => {
      await request(app.getHttpServer())
        .get(`/gift-card-requests/${giftCardRequest1.id}`)
        .expect(401);
    });
  });

  describe('/ (GET)', () => {
    it('/ (GET) - get gift card request list', async () => {
      const response = await request(app.getHttpServer())
        .get('/gift-card-requests/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user1.email, sub: user1.cognitoSub }),
        )
        .expect(200);
      expect(response.body.length).toEqual(3);
      const giftDateRsp1 = response.body[0];
      const giftDateRsp2 = response.body[1];

      expect(giftDateRsp1.id).toEqual(giftCardRequest2.id);
      expectGiftCardRequestRsp(giftDateRsp1, {
        ...giftCardRequest2,
        integrationTitle: giftCardIntegration2.title,
      });
      expect(giftDateRsp2.id).toEqual(giftCardRequest1.id);
      expectGiftCardRequestRsp(giftDateRsp2, {
        ...giftCardRequest1,
        integrationTitle: giftCardIntegration1.title,
        owner: user3Manager,
        createdBy: user1,
      });
    });

    it('/ (GET) - user3Manager gets 2 gift card requests - those sent to him', async () => {
      const response = await request(app.getHttpServer())
        .get('/gift-card-requests/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .expect(200);

      expect(response.body.length).toEqual(2);
    });

    it('/ (GET) - try to get gift card requests without token', async () => {
      await request(app.getHttpServer())
        .get('/gift-card-requests/')
        .expect(401);
    });
  });

  describe('/ (POST)', () => {
    const newGiftCardRequest = {
      giftCardIntegrationId: giftCardIntegration1.id,
      amount: 2500,
      giftCardIntegrationCurrencyAmount: 25,
      //   status shouls be ignored
      status: GiftCardRequestStatusEnum.COMPLETED,
    };

    const newGiftCardRequestAmountList = {
      giftCardIntegrationId: giftCardIntegrationIndia.id,
      amount: 492,
      giftCardIntegrationCurrencyAmount: 400,
      //   status shouls be ignored
      status: GiftCardRequestStatusEnum.COMPLETED,
    };

    const newGiftCardRequestAutomaticFulfill = {
      giftCardIntegrationId: '79982a89-d4dd-4f19-b891-9949a821d0bd',
      amount: 2000,
      giftCardIntegrationCurrencyAmount: 20,
    };

    it('/ (POST) - create gift card request', async () => {
      const response = await request(app.getHttpServer())
        .post('/gift-card-requests/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .send(newGiftCardRequest)
        .expect(201);

      const id = response.body.id;

      expectGiftCardRequestRsp(response.body, {
        ...newGiftCardRequest,
        giftCardIntegrationCurrencyAmount: 25,
        createdById: user3Manager.id,
        ownerId: user3Manager.id,
        status: GiftCardRequestStatusEnum.PENDING,
      });
      await expectGiftCardRequestInDB(
        id,
        {
          ...newGiftCardRequest,
          giftCardIntegrationCurrencyAmount: 25,
          status: GiftCardRequestStatusEnum.PENDING,
          createdById: user3Manager.id,
          ownerId: user3Manager.id,
        },
        prisma,
      );

      // Check Ledger
      await checkOneAddedLedger(prisma, testStartTime, {
        fromId: user3ActiveBalanceSideId,
        toId: user3ReservedBalanceSideId,
        amount: newGiftCardRequest.amount,
        type: LedgerTypeEnum.GIFT_CARD_REQUEST_CREATED,
      });

      await checkBalance(ledgerService, user3Manager.id, {
        pointsActive: user3ActivePoints - newGiftCardRequest.amount,
        pointsReserved: user3ReservedPoints + newGiftCardRequest.amount,
      });

      // Clean DB
      await prisma.ledger.deleteMany({
        where: {
          createdAt: {
            gte: testStartTime,
          },
        },
      });

      await prisma.giftCardRequest.delete({ where: { id } });
    });

    it('/ (POST) - create gift card request - send to other user', async () => {
      const response = await request(app.getHttpServer())
        .post('/gift-card-requests/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .send({
          ...newGiftCardRequest,
          sendToUserId: user1.id,
          message: 'All the best!',
        })
        .expect(201);

      const id = response.body.id;

      expectGiftCardRequestRsp(response.body, {
        ...newGiftCardRequest,
        giftCardIntegrationCurrencyAmount: 25,
        createdById: user3Manager.id,
        ownerId: user1.id,
        status: GiftCardRequestStatusEnum.PENDING,
      });
      await expectGiftCardRequestInDB(
        id,
        {
          ...newGiftCardRequest,
          giftCardIntegrationCurrencyAmount: 25,
          status: GiftCardRequestStatusEnum.PENDING,
          createdById: user3Manager.id,
          ownerId: user1.id,
        },
        prisma,
      );

      // Check Ledger
      await checkOneAddedLedger(prisma, testStartTime, {
        fromId: user3ActiveBalanceSideId,
        toId: user3ReservedBalanceSideId,
        amount: newGiftCardRequest.amount,
        type: LedgerTypeEnum.GIFT_CARD_REQUEST_CREATED,
      });

      await checkBalance(ledgerService, user3Manager.id, {
        pointsActive: user3ActivePoints - newGiftCardRequest.amount,
        pointsReserved: user3ReservedPoints + newGiftCardRequest.amount,
      });

      // Clean DB
      await prisma.ledger.deleteMany({
        where: {
          createdAt: {
            gte: testStartTime,
          },
        },
      });

      await prisma.giftCardRequest.delete({ where: { id } });
    });

    it('/ (POST) - create gift card request US user, SRB card', async () => {
      const response = await request(app.getHttpServer())
        .post('/gift-card-requests/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .send({
          ...newGiftCardRequest,
          giftCardIntegrationId: giftCardIntegrationSrb.id,
          giftCardIntegrationCurrencyAmount: 2696,
        })
        .expect(201);

      const id = response.body.id;

      expectGiftCardRequestRsp(response.body, {
        ...newGiftCardRequest,
        giftCardIntegrationCurrencyAmount: 2696,
        giftCardIntegrationId: giftCardIntegrationSrb.id,
        createdById: user3Manager.id,
        ownerId: user3Manager.id,
        status: GiftCardRequestStatusEnum.PENDING,
      });
      await expectGiftCardRequestInDB(
        id,
        {
          ...newGiftCardRequest,
          giftCardIntegrationCurrencyAmount: 2696,
          giftCardIntegrationId: giftCardIntegrationSrb.id,
          status: GiftCardRequestStatusEnum.PENDING,
          createdById: user3Manager.id,
          ownerId: user3Manager.id,
        },
        prisma,
      );

      // Check Ledger
      await checkOneAddedLedger(prisma, testStartTime, {
        fromId: user3ActiveBalanceSideId,
        toId: user3ReservedBalanceSideId,
        amount: newGiftCardRequest.amount,
        type: LedgerTypeEnum.GIFT_CARD_REQUEST_CREATED,
      });

      await checkBalance(ledgerService, user3Manager.id, {
        pointsActive: user3ActivePoints - newGiftCardRequest.amount,
        pointsReserved: user3ReservedPoints + newGiftCardRequest.amount,
      });

      // Clean DB
      await prisma.ledger.deleteMany({
        where: {
          createdAt: {
            gte: testStartTime,
          },
        },
      });

      await prisma.giftCardRequest.delete({ where: { id } });
    });

    it('/ (POST) - try to create gift card request with wrong amount', async () => {
      const response = await request(app.getHttpServer())
        .post('/gift-card-requests/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .send({
          ...newGiftCardRequest,
          amount: 400,
          giftCardIntegrationCurrencyAmount: 4,
        })
        .expect(400);

      expect(response.body.message).toEqual(
        AmountFailsCounstraintException.defaultMessage,
      );
    });

    it('/ (POST) - try to create gift card request with wrong amount, giftCardIntegrationCurrencyAmount missmatch', async () => {
      const response = await request(app.getHttpServer())
        .post('/gift-card-requests/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .send({
          ...newGiftCardRequest,
          giftCardIntegrationCurrencyAmount: 25.001,
        })
        .expect(400);

      expect(response.body.message).toEqual(
        AmountFailsCounstraintException.defaultMessage,
      );
    });

    it('/ (POST) - create gift card request India - amount from the list', async () => {
      const response = await request(app.getHttpServer())
        .post('/gift-card-requests/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .send(newGiftCardRequestAmountList)
        .expect(201);

      const id = response.body.id;

      expectGiftCardRequestRsp(response.body, {
        ...newGiftCardRequestAmountList,
        createdById: user3Manager.id,
        ownerId: user3Manager.id,
        status: GiftCardRequestStatusEnum.PENDING,
      });
      await expectGiftCardRequestInDB(
        id,
        {
          ...newGiftCardRequestAmountList,
          status: GiftCardRequestStatusEnum.PENDING,
          createdById: user3Manager.id,
          ownerId: user3Manager.id,
        },
        prisma,
      );

      // Check Ledger
      await checkOneAddedLedger(prisma, testStartTime, {
        fromId: user3ActiveBalanceSideId,
        toId: user3ReservedBalanceSideId,
        amount: newGiftCardRequestAmountList.amount,
        type: LedgerTypeEnum.GIFT_CARD_REQUEST_CREATED,
      });

      await checkBalance(ledgerService, user3Manager.id, {
        pointsActive: user3ActivePoints - newGiftCardRequestAmountList.amount,
        pointsReserved:
          user3ReservedPoints + newGiftCardRequestAmountList.amount,
      });

      // Clean DB
      await prisma.ledger.deleteMany({
        where: {
          createdAt: {
            gte: testStartTime,
          },
        },
      });

      await prisma.giftCardRequest.delete({ where: { id } });
    });

    it('/ (POST) - create gift card request Canada - automatic fulfill gift card request', async () => {
      const response = await request(app.getHttpServer())
        .post('/gift-card-requests/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .send(newGiftCardRequestAutomaticFulfill)
        .expect(201);

      const id = response.body.id;

      expectGiftCardRequestRsp(response.body, {
        ...newGiftCardRequestAutomaticFulfill,
        createdById: user3Manager.id,
        ownerId: user3Manager.id,
        status: GiftCardRequestStatusEnum.COMPLETED,
      });
      await expectGiftCardRequestInDB(
        id,
        {
          ...newGiftCardRequestAutomaticFulfill,
          status: GiftCardRequestStatusEnum.COMPLETED,
          createdById: user3Manager.id,
          ownerId: user3Manager.id,
        },
        prisma,
      );

      await checkBalance(ledgerService, user3Manager.id, {
        pointsActive:
          user3ActivePoints - newGiftCardRequestAutomaticFulfill.amount,
        pointsReserved: user3ReservedPoints,
      });

      // Clean DB
      await prisma.ledger.deleteMany({
        where: {
          createdAt: {
            gte: testStartTime,
          },
        },
      });

      await prisma.giftCardRequest.delete({ where: { id } });
    });

    it("/ (POST) - create gift card request Canada - automatic fulfill gift card request - TEST OTG DOESN'T FULFILL AUTOMATIC", async () => {
      await prisma.org.update({
        where: {
          id: org1.id,
        },
        data: {
          isTestOrg: true,
        },
      });
      const response = await request(app.getHttpServer())
        .post('/gift-card-requests/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .send(newGiftCardRequestAutomaticFulfill)
        .expect(201);

      const id = response.body.id;

      expectGiftCardRequestRsp(response.body, {
        ...newGiftCardRequestAutomaticFulfill,
        createdById: user3Manager.id,
        ownerId: user3Manager.id,
        status: GiftCardRequestStatusEnum.PENDING,
      });
      await expectGiftCardRequestInDB(
        id,
        {
          ...newGiftCardRequestAutomaticFulfill,
          status: GiftCardRequestStatusEnum.PENDING,
          createdById: user3Manager.id,
          ownerId: user3Manager.id,
        },
        prisma,
      );

      await checkBalance(ledgerService, user3Manager.id, {
        pointsActive:
          user3ActivePoints - newGiftCardRequestAutomaticFulfill.amount,
        pointsReserved:
          user3ReservedPoints + newGiftCardRequestAutomaticFulfill.amount,
      });

      // Clean DB
      await prisma.org.update({
        where: {
          id: org1.id,
        },
        data: {
          isTestOrg: false,
        },
      });
      await prisma.ledger.deleteMany({
        where: {
          createdAt: {
            gte: testStartTime,
          },
        },
      });

      await prisma.giftCardRequest.delete({ where: { id } });
    });

    it('/ (POST) - create gift card request India - amount from the list - wrong amount', async () => {
      const response = await request(app.getHttpServer())
        .post('/gift-card-requests/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .send({
          ...newGiftCardRequestAmountList,
          giftCardIntegrationCurrencyAmount: 2000,
        })
        .expect(400);

      expect(response.body.message).toEqual(
        AmountFailsCounstraintException.defaultMessage,
      );
    });

    it('/ (POST) - try to create gift card - user without points', async () => {
      const response = await request(app.getHttpServer())
        .post('/gift-card-requests/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .send(newGiftCardRequest)
        .expect(400);

      expect(response.body.message).toEqual(
        NotEnoughBalanceException.defaultMessage,
      );
    });

    it('/ (POST) - try to create gift card request with wrong giftCardIntegrationId', async () => {
      const response = await request(app.getHttpServer())
        .post('/gift-card-requests/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .send({ ...newGiftCardRequest, giftCardIntegrationId: user1.id })
        .expect(404);

      expect(response.body.message).toEqual('GiftCardIntegration Not Found');
    });

    it('/ (POST) - try to create gift card request with non authorised user', async () => {
      await request(app.getHttpServer())
        .post('/gift-card-requests/')
        .send(newGiftCardRequest)
        .expect(401);
    });
  });
});
