import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { IntegrationConsraintTypeEnum, GenderEnum } from '@prisma/client';

import { AppModule } from '../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';
import { GiftCardIntegrationsModule } from '../src/gift_card_integrations/gift_card_integrations.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AwsCognitoService } from '../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from '../src/users/aws-cognito/__mock__/aws-cognito.service.mock';
import { user3Manager, org1 } from './utils/preseededData';
import { createToken } from './utils/tokenService';
import consts from '../src/utils/consts';
import { MailerService } from '@nestjs-modules/mailer';
import { MailerServiceMock } from '../src/emails/__mocks__/mailer.service.mock';

jest.mock('../src/users/jwt-values.service');
jest.mock('../src/worker_user_invites/woker_module_config');
jest.mock(
  '../src/currency_rates/currency_rates_api/currency_rates_api.service',
);

describe('/secret-santa-trial', () => {
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
      .overrideProvider(MailerService)
      .useValue(MailerServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
  });

  describe('/activate (POST)', () => {
    it('/activate (POST) - activate secret santa for org', async () => {
      const response = await request(app.getHttpServer())
        .post('/secret-santa-trial/activate')
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user3Manager.email,
              sub: user3Manager.cognitoSub,
            }),
        )
        .expect(201);

      const org1Updated = await prisma.org.findUnique({
        where: { id: org1.id },
      });
      expect(org1Updated.isSecretSantaTrialActivated).toBeTruthy();
      // clear
      await prisma.org.update({
        where: {
          id: org1.id,
        },
        data: {
          isSecretSantaTrialActivated: null,
        },
      });
    });
  });
});
