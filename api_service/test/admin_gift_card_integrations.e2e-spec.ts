import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';
import { CurrencyRatesModule } from '../src/currency_rates/currency_rates.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { LedgerService } from '../src/ledger/ledger.service';
import { AwsCognitoService } from '../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from '../src/users/aws-cognito/__mock__/aws-cognito.service.mock';
import { GiftCardThirdPartyApiService } from '../src/gift_card_third_party_api/gift_card_third_party_api.service';
import { createToken } from './utils/tokenService';
import { admin } from './utils/preseededData';
const fs = require('fs');

jest.mock('../src/users/jwt-values.service');
jest.mock('../src/worker_user_invites/woker_module_config');
jest.mock(
  '../src/currency_rates/currency_rates_api/currency_rates_api.service',
);

describe('GoGift Third Prty Integrations Admin', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
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

  describe('GoGift Third Prty Integrations Admin - GoGift', () => {
    it.skip('Get All US gift card integrations - GoGift', async () => {
      const response = await request(app.getHttpServer())
        .get('/admin/gift-card-integrations/gogift-integrations/US')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);
      const rsp = response.body;
      console.log('rsp', JSON.stringify(rsp));
      /* 
      GENERATE SEED - UNCOMMENT PART OF ENDPOINT
      const names = rsp
        .filter((product) => product.sku && product.stepPriceGoGift !== 'fail')
        .map((product, i) => {
          const fullConstraintArray = [
            25, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 750,
            800, 900, 1000, 1500, 2500, 3000, 3500, 4000, 4500, 5000, 6000,
            7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000,
            17000, 18000, 19000, 20000, 25000, 30000,
          ];

          const constraintArray = fullConstraintArray.filter(
            (constraintNumber) => {
              if (
                constraintNumber < product.minPriceGoGift ||
                constraintNumber > product.maxPriceGoGift
              )
                return false;
              const stepCount =
                (constraintNumber - product.minPriceGoGift) /
                (product.stepPriceGoGift * 1.0);
              if (!Number.isInteger(stepCount)) return false;
              return true;
            },
          );
          console.log('product', product);

          return `
- id: ${uuidv4()}
  priority: ${i * 10}
  countryId: 4b5f74e9-37fc-4f1d-b2fc-ddca7269d19d
  website: WEBSITE_PLACEHOLDER
  image: IMAGE_PLACEHOLDER
  title: ${product.titleGoGift} 
  description: ${product.descGoGift} 
  currency: INR
  constraintType: LIST
  constraintJson: [ ${constraintArray.join(', ')} ]
  gogiftId: '${product.id}'`;
        });
      fs.writeFileSync('./seed_integrations.yml', names.join('\n'));
      */
    }, 30000);
    it.skip('Check gogift intergrations US', async () => {
      const response = await request(app.getHttpServer())
        .post('/admin/gift-card-integrations/check-gogift-integrations/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .send({
          countryId: '90f80d8c-40dc-4c43-b385-6f6fcf8e848c',
        })
        .expect(201);
      const rsp = response.body;
      console.log('rsp', JSON.stringify(rsp));
    }, 30000);
  });
});
