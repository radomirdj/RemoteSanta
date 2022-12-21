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
import { AmountFailsCounstraintException } from '../src/errors//amountFailsCounstraintException';

import {
  expectGiftCardRequestInDB,
  expectGiftCardRequestRsp,
} from './utils/giftCardRequestChecks';

import { GiftCardRequestStatusEnum } from '@prisma/client';

import {
  user1,
  user2,
  user3,
  giftCardRequest1,
  giftCardRequest2,
  giftCardIntegration1,
} from './utils/preseededData';

jest.mock('../src/users/jwt-values.service');

describe('/gift-card-requests', () => {
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

      expectGiftCardRequestRsp(response.body, giftCardRequest1);
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
      expectGiftCardRequestRsp(giftDateRsp1, giftCardRequest2);
      expect(giftDateRsp2.id).toEqual(giftCardRequest1.id);
      expectGiftCardRequestRsp(giftDateRsp2, giftCardRequest1);
    });

    it('/ (GET) - user2 gets 0 gift card requests', async () => {
      const response = await request(app.getHttpServer())
        .get('/gift-card-requests/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user3.email, sub: user3.cognitoSub }),
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
      amount: 700,
      //   status shouls be ignored
      status: GiftCardRequestStatusEnum.COMPLETED,
    };

    it('/ (POST) - create gift card request', async () => {
      const response = await request(app.getHttpServer())
        .post('/gift-card-requests/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .send(newGiftCardRequest)
        .expect(201);

      const id = response.body.id;

      expectGiftCardRequestRsp(response.body, {
        ...newGiftCardRequest,
        userId: user2.id,
        status: GiftCardRequestStatusEnum.PENDING,
      });
      await expectGiftCardRequestInDB(
        id,
        {
          ...newGiftCardRequest,
          status: GiftCardRequestStatusEnum.PENDING,
          userId: user2.id,
        },
        prisma,
      );

      await prisma.giftCardRequest.delete({ where: { id } });
    });

    it('/ (POST) - try to create gift card request with wrong amount', async () => {
      const response = await request(app.getHttpServer())
        .post('/gift-card-requests/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: user2.email, sub: user2.cognitoSub }),
        )
        .send({ ...newGiftCardRequest, amount: 400 })
        .expect(400);

      expect(response.body.message).toEqual(
        AmountFailsCounstraintException.defaultMessage,
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
