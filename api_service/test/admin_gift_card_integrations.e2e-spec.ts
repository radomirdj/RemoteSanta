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

  // const convertCurrencyValue = (currencyValue) => {
  //   if (currencyValue < 1) return 0.1;
  //   if (currencyValue > 74 && currencyValue < 75) return 300;
  //   if (currencyValue > 19 && currencyValue < 20) return 80;
  //   if (currencyValue > 12 && currencyValue < 13) return 50;
  //   if (currencyValue > 2 && currencyValue < 3) return 10;
  //   if (currencyValue > 124 && currencyValue < 125) return 500;
  //   return 10000;
  // };
  describe('GoGift Third Prty Integrations Admin - GoGift', () => {
    it.skip('Get All US gift card integrations - GoGift', async () => {
      const response = await request(app.getHttpServer())
        .get('/admin/gift-card-integrations/gogift-integrations/FI')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .expect(200);
      const rsp = response.body;
      console.log('rsp', JSON.stringify(rsp));

      // GENERATE SEED - UNCOMMENT PART OF ENDPOINT
      const names = rsp
        .filter(
          (product) =>
            product.sku &&
            product.stepPriceGoGift !== 'fail' &&
            !product.titleGoGift.includes('The Global Gift Card'),
        )
        .map((product, i) => {
          const fullConstraintArray = [
            5, 10, 15, 20, 25, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500,
            600, 700, 750, 800, 900, 1000, 1500, 2500, 3000, 3500, 4000, 4500,
            5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000,
            15000, 16000, 17000, 18000, 19000, 20000, 25000, 30000,
          ];
          // const fullConstraintArray = [
          //   5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85,
          //   90, 95, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 750,
          //   800, 900, 1000,
          // ];

          const minPriceGoGift = product.minPriceGoGift;
          const stepPriceGoGift = product.stepPriceGoGift;
          const maxPriceGoGift = product.maxPriceGoGift;

          const constraintArray = fullConstraintArray.filter(
            (constraintNumber) => {
              if (
                constraintNumber < minPriceGoGift ||
                constraintNumber > maxPriceGoGift
              )
                return false;
              const stepCount =
                (constraintNumber - minPriceGoGift) / (stepPriceGoGift * 1.0);
              if (!Number.isInteger(stepCount)) return false;
              return true;
            },
          );
          return `
- id: ${uuidv4()}
  priority: ${i * 10}
  countryId: 3f9b33e4-75a6-480f-9a98-ab6c0eb5f24f
  website: '---'
  image: 'https://brandimagescards.s3.us-east-2.amazonaws.com/placeholder2.png'
  title: ${product.titleGoGift} 
  description: ${product.descGoGift} 
  currency: EUR
  constraintType: LIST
  constraintJson: [ ${constraintArray.join(', ')} ]
  gogiftId: '${product.id}'`;
        });
      fs.writeFileSync('./seed_integrations.yml', names.join('\n'));
    }, 300000);
    it.skip('Check gogift intergrations US', async () => {
      const response = await request(app.getHttpServer())
        .post('/admin/gift-card-integrations/check-gogift-integrations/')
        .set(
          'Authorization',
          'bearer ' +
            createToken({ email: admin.email, sub: admin.cognitoSub }),
        )
        .send({
          countryId: '3f9b33e4-75a6-480f-9a98-ab6c0eb5f24f',
        })
        .expect(201);
      const rsp = response.body;
      console.log('rsp', JSON.stringify(rsp));
    }, 60000);
  });
});
