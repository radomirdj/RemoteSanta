import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { join } from 'path';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AwsCognitoService } from '../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from '../src/users/aws-cognito/__mock__/aws-cognito.service.mock';
import { createToken } from './utils/tokenService';
import { AmountFailsCounstraintException } from '../src/errors/amountFailsCounstraintException';
import {
  expectGiftCardRequestInDB,
  expectGiftCardRequestRsp,
} from './utils/giftCardRequestChecks';
import { LedgerService } from '../src/ledger/ledger.service';

import { GiftCardRequestStatusEnum, LedgerTypeEnum } from '@prisma/client';

import {
  user2,
  admin,
  giftCardRequest1,
  giftCardRequest2,
  giftCardRequestFulfilled,
  giftCardIntegration1,
  giftCardIntegration2,
  user3ReservedPoints,
  user1ActiveBalanceSideId,
  user1ReservedBalanceSideId,
  platformBalanceSideId,
  user1,
  user1ActivePoints,
  user1ReservedPoints,
} from './utils/preseededData';
import { checkOneAddedLedger, checkBalance } from './utils/ledgerChecks';

jest.mock('../src/users/jwt-values.service');

describe('admin/gift-card-requests', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let ledgerService: LedgerService;
  const testStartTime = new Date();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, UsersModule],
    })
      .overrideProvider(AwsCognitoService)
      .useValue(AwsCognitoServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    ledgerService = app.get(LedgerService);
    await app.init();
  });

  describe('/:id (GET)', () => {
    it('/:id (GET) -  Admin get gift card request', async () => {
      const response = await request(app.getHttpServer())
        .get(`/admin/gift-card-requests/${giftCardRequest1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);

      const id = response.body.id;
      expect(id).toEqual(giftCardRequest1.id);

      expectGiftCardRequestRsp(response.body, {
        ...giftCardRequest1,
        integrationTitle: giftCardIntegration1.title,
      });
    });

    it('/:id (GET) - user (NOT ADMIN) try to get gift card request', async () => {
      await request(app.getHttpServer())
        .get(`/admin/gift-card-requests/${giftCardRequest1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(403);
    });

    it('/:id (GET) - ADMIN try to get gift card request without token', async () => {
      await request(app.getHttpServer())
        .get(`/admin/gift-card-requests/${giftCardRequest1.id}`)
        .expect(401);
    });
  });

  describe('/ (GET)', () => {
    it('/ (GET) - get gift ADMIN card request list', async () => {
      const response = await request(app.getHttpServer())
        .get('/admin/gift-card-requests/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);
      expect(response.body.length).toEqual(2);
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

    it('/ (GET) - NON ADMIN user, get gift card request list', async () => {
      await request(app.getHttpServer())
        .get('/admin/gift-card-requests/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(403);
    });

    it('/ (GET) - try to get gift ADMIN card requests without token', async () => {
      await request(app.getHttpServer())
        .get('/gift-card-requests/')
        .expect(401);
    });
  });

  describe('/:id/fulfill (POST)', () => {
    it('/:id/fulfill (POST) -  Admin fulfill gift card request', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/gift-card-requests/${giftCardRequest1.id}/fulfill`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .attach('file', join(__dirname, 'files/gift_card_image.png'))
        .expect(201);

      const id = response.body.id;
      expect(id).toEqual(giftCardRequest1.id);

      expectGiftCardRequestRsp(response.body, {
        ...giftCardRequest1,
        status: GiftCardRequestStatusEnum.COMPLETED,
      });

      await expectGiftCardRequestInDB(
        id,
        {
          ...giftCardRequest1,
          status: GiftCardRequestStatusEnum.COMPLETED,
        },
        prisma,
      );

      const giftCard = await prisma.giftCard.findUnique({
        where: { giftCardRequestId: id },
      });
      expect(giftCard.createdById).toEqual(admin.id);
      expect(giftCard.giftCardRequestId).toEqual(id);

      // Check Ledger
      await checkOneAddedLedger(prisma, testStartTime, {
        fromId: user1ReservedBalanceSideId,
        toId: platformBalanceSideId,
        amount: giftCardRequest1.amount,
        type: LedgerTypeEnum.GIFT_CARD_REQUEST_COMPLETED,
      });

      await checkBalance(ledgerService, user1.id, {
        pointsActive: user1ActivePoints,
        pointsReserved: user1ReservedPoints - giftCardRequest1.amount,
      });

      // User Get File
      const response2 = await request(app.getHttpServer())
        .get(`/gift-card-requests/${giftCardRequest1.id}/file`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user1.email, sub: user1.cognitoSub }),
        )
        .expect(200);

      // Other User Get File
      await request(app.getHttpServer())
        .get(`/gift-card-requests/${giftCardRequest1.id}/file`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .expect(404);

      // Clean DB
      await prisma.ledger.deleteMany({
        where: {
          createdAt: {
            gte: testStartTime,
          },
        },
      });

      await prisma.giftCardRequest.update({
        where: { id },
        data: { status: GiftCardRequestStatusEnum.PENDING },
      });

      await prisma.giftCard.deleteMany({
        where: { giftCardRequestId: id },
      });
    });

    it('/:id/fulfill (POST) -  (ADMIN) try to fulfill gift card request which is already fulfilled', async () => {
      await request(app.getHttpServer())
        .post(
          `/admin/gift-card-requests/${giftCardRequestFulfilled.id}/fulfill`,
        )
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .attach('file', join(__dirname, 'files/gift_card_image.png'))
        .expect(405);
    });

    it('/:id/fulfill (POST) -  (NOT ADMIN) try to fulfill gift card request', async () => {
      await request(app.getHttpServer())
        .post(`/admin/gift-card-requests/${giftCardRequest1.id}/fulfill`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .attach('file', join(__dirname, 'files/gift_card_image.png'))
        .expect(403);
    });

    it('/:id (GET) - ADMIN try to fulfill gift card request without token', async () => {
      await request(app.getHttpServer())
        .post(`/admin/gift-card-requests/${giftCardRequest1.id}/fulfill`)
        .attach('file', join(__dirname, 'files/gift_card_image.png'))
        .expect(401);
    });
  });

  describe('/:id/decline (POST)', () => {
    const declineRequest = {
      adminComment: 'there are problems with card',
    };
    it('/:id/decline (POST) -  Admin decline gift card request', async () => {
      const response = await request(app.getHttpServer())
        .post(`/admin/gift-card-requests/${giftCardRequest1.id}/decline`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .send(declineRequest)
        .expect(201);

      const id = response.body.id;
      expect(id).toEqual(giftCardRequest1.id);

      expectGiftCardRequestRsp(response.body, {
        ...giftCardRequest1,
        status: GiftCardRequestStatusEnum.DECLINED,
      });

      await expectGiftCardRequestInDB(
        id,
        {
          ...giftCardRequest1,
          status: GiftCardRequestStatusEnum.DECLINED,
        },
        prisma,
      );

      // Check Ledger
      await checkOneAddedLedger(prisma, testStartTime, {
        fromId: user1ReservedBalanceSideId,
        toId: user1ActiveBalanceSideId,
        amount: giftCardRequest1.amount,
        type: LedgerTypeEnum.GIFT_CARD_REQUEST_DECLINED,
      });

      await checkBalance(ledgerService, user1.id, {
        pointsActive: user1ActivePoints + giftCardRequest1.amount,
        pointsReserved: user1ReservedPoints - giftCardRequest1.amount,
      });

      // Clean DB
      await prisma.ledger.deleteMany({
        where: {
          createdAt: {
            gte: testStartTime,
          },
        },
      });

      await prisma.giftCardRequest.update({
        where: { id },
        data: { status: GiftCardRequestStatusEnum.PENDING },
      });
    });

    it('/:id/decline (POST) -  (ADMIN) try to decline gift card request which is already fulfilled', async () => {
      await request(app.getHttpServer())
        .post(
          `/admin/gift-card-requests/${giftCardRequestFulfilled.id}/decline`,
        )
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .send(declineRequest)
        .expect(405);
    });
  });
});
