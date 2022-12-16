import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { IntegrationConsraintTypeEnum } from '@prisma/client';

import { AppModule } from '../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';
import { AwsCognitoService } from '../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from '../src/users/aws-cognito/__mock__/aws-cognito.service.mock';
import { giftCardIntegration1, user1 } from './utils/preseededData';

jest.mock('../src/users/jwt-values.service');

export const expectGiftCardIntegrationRsp = (responseBody, expectedValue) => {
  expect(responseBody.priority).toEqual(expectedValue.priority);
  expect(responseBody.website).toEqual(expectedValue.website);
  expect(responseBody.image).toEqual(expectedValue.image);
  expect(responseBody.title).toEqual(expectedValue.title);
  expect(responseBody.description).toEqual(expectedValue.description);
  expect(responseBody.constraintType).toEqual(expectedValue.constraintType);
  expect(responseBody.constraintJson).toEqual(expectedValue.constraintJson);
};

describe('/gift-card-integrations', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, UsersModule],
    })
      .overrideProvider(AwsCognitoService)
      .useValue(AwsCognitoServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/:id (GET)', () => {
    it('/:id (GET) - get gift card integration', async () => {
      const response = await request(app.getHttpServer())
        .get(`/gift-card-integrations/${giftCardIntegration1.id}`)
        .expect(200);

      const id = response.body.id;
      expect(id).toEqual(giftCardIntegration1.id);

      expectGiftCardIntegrationRsp(response.body, giftCardIntegration1);
    });

    it('/:id (GET) - get gift card integration - wrong id', async () => {
      await request(app.getHttpServer())
        .get(`/gift-card-integrations/${user1.id}`)
        .expect(404);
    });
  });

  describe('/ (GET)', () => {
    it('/ (GET) - get gift card integration list', async () => {
      const response = await request(app.getHttpServer())
        .get('/gift-card-integrations/')
        .expect(200);
      expect(response.body.length).toEqual(19);
      const giftCardIntegrationRsp1 = response.body.find(
        (giftDateRsp) => giftDateRsp.id === giftCardIntegration1.id,
      );

      response.body.forEach((giftCardIntegrationRsp) => {
        if (
          giftCardIntegrationRsp.constraintType ===
          IntegrationConsraintTypeEnum.MIN_MAX
        ) {
          expect(typeof giftCardIntegrationRsp.constraintJson.MIN).toBe(
            'number',
          );
          expect(typeof giftCardIntegrationRsp.constraintJson.MAX).toBe(
            'number',
          );
        }
      });

      expectGiftCardIntegrationRsp(
        giftCardIntegrationRsp1,
        giftCardIntegration1,
      );
    });
  });
});