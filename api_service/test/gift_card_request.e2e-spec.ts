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
} from './utils/preseededData';
import { checkOneAddedLedger, checkBalance } from './utils/ledgerChecks';
import { MailerService } from '@nestjs-modules/mailer';
import { MailerServiceMock } from '../src/emails/__mocks__/mailer.service.mock';

jest.mock('../src/users/jwt-values.service');
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
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    ledgerService = app.get(LedgerService);
    await app.init();
  });

  describe('/:id (GET)', () => {
    it('/:id (GET) - get gift card request', async () => {
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
      });
    });

    it('/ (GET) - user2 gets 0 gift card requests', async () => {
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

      expect(response.body.length).toEqual(0);
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
      amount: 2700,
      giftCardIntegrationCurrencyAmount: 27,
      //   status shouls be ignored
      status: GiftCardRequestStatusEnum.COMPLETED,
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
        giftCardIntegrationCurrencyAmount: 27,
        userId: user3Manager.id,
        status: GiftCardRequestStatusEnum.PENDING,
      });
      await expectGiftCardRequestInDB(
        id,
        {
          ...newGiftCardRequest,
          giftCardIntegrationCurrencyAmount: 27,
          status: GiftCardRequestStatusEnum.PENDING,
          userId: user3Manager.id,
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
          giftCardIntegrationCurrencyAmount: 2912,
        })
        .expect(201);

      const id = response.body.id;

      expectGiftCardRequestRsp(response.body, {
        ...newGiftCardRequest,
        giftCardIntegrationCurrencyAmount: 2912,
        giftCardIntegrationId: giftCardIntegrationSrb.id,
        userId: user3Manager.id,
        status: GiftCardRequestStatusEnum.PENDING,
      });
      await expectGiftCardRequestInDB(
        id,
        {
          ...newGiftCardRequest,
          giftCardIntegrationCurrencyAmount: 2912,
          giftCardIntegrationId: giftCardIntegrationSrb.id,
          status: GiftCardRequestStatusEnum.PENDING,
          userId: user3Manager.id,
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
          giftCardIntegrationCurrencyAmount: 27.001,
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
