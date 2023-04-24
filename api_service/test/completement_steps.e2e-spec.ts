import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { IntegrationConsraintTypeEnum } from '@prisma/client';

import { AppModule } from '../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';
import { GiftCardIntegrationsModule } from '../src/gift_card_integrations/gift_card_integrations.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AwsCognitoService } from '../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from '../src/users/aws-cognito/__mock__/aws-cognito.service.mock';
import {
  giftCardIntegration1,
  user1,
  user3Manager,
  org2Manager,
} from './utils/preseededData';
import { createToken } from './utils/tokenService';

jest.mock('../src/users/jwt-values.service');

describe('/completement-steps', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        PrismaModule,
        UsersModule,
        GiftCardIntegrationsModule,
      ],
    })
      .overrideProvider(AwsCognitoService)
      .useValue(AwsCognitoServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
  });

  describe('/ (GET)', () => {
    it('/ (GET) - get list of completement steps', async () => {
      const response = await request(app.getHttpServer())
        .get('/completement-steps/')
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
      response.body.forEach((stepStatus) => {
        expect(stepStatus.completed).toEqual(true);
      });
    });
    it('/ (GET) - get list of completement steps Org2', async () => {
      const response = await request(app.getHttpServer())
        .get('/completement-steps/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: org2Manager.email,
              sub: org2Manager.cognitoSub,
            }),
        )
        .expect(200);
      expect(response.body.length).toEqual(4);
      const rspMap = {};
      response.body.forEach((stepStatus) => {
        rspMap[stepStatus.name] = stepStatus.completed;
      });
      expect(rspMap['INVITE_EMPLOYEES']).toEqual(true);
      expect(rspMap['ADD_PAYMENT']).toEqual(true);
      expect(rspMap['AUTOMATIC_POINTS']).toEqual(true);
      expect(rspMap['WATCH_TUTORIAL']).toEqual(false);
    });
    it('/ (GET) - get list of completement steps - basic user with no access', async () => {
      const response = await request(app.getHttpServer())
        .get('/completement-steps/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user1.email,
              sub: user1.cognitoSub,
            }),
        )
        .expect(200);
      expect(response.body.length).toEqual(0);
    });
    it('/ (GET) - get list of completement steps - Error with no token', async () => {
      await request(app.getHttpServer())
        .get('/completement-steps/')
        .expect(401);
    });
  });
});
