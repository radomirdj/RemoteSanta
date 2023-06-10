import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  IntegrationConsraintTypeEnum,
  GiftCardIntegration,
  Country,
} from '@prisma/client';

import { AppModule } from '../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';
import { GiftCardIntegrationsModule } from '../src/gift_card_integrations/gift_card_integrations.module';
import { GiftCardIntegrationsService } from '../src/gift_card_integrations/gift_card_integrations.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { AwsCognitoService } from '../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from '../src/users/aws-cognito/__mock__/aws-cognito.service.mock';
import { CurrencyRatesService } from '../src/currency_rates/currency_rates.service';

import {
  giftCardIntegration1,
  user1,
  userSrb,
  giftCardIntegrationSrb,
} from './utils/preseededData';
import { createToken } from './utils/tokenService';

jest.mock('../src/users/jwt-values.service');
jest.mock(
  '../src/currency_rates/currency_rates_api/currency_rates_api.service',
);
export const expectGiftCardIntegrationRsp = (responseBody, expectedValue) => {
  expect(responseBody.priority).toEqual(expectedValue.priority);
  expect(responseBody.website).toEqual(expectedValue.website);
  expect(responseBody.image).toEqual(expectedValue.image);
  expect(responseBody.title).toEqual(expectedValue.title);
  expect(responseBody.description).toEqual(expectedValue.description);
  expect(responseBody.constraintType).toEqual(expectedValue.constraintType);
  expect(responseBody.constraintJson).toEqual(expectedValue.constraintJson);
  if (expectedValue.pointsToCurrencyConversionRate)
    expect(responseBody.pointsToCurrencyConversionRate).toEqual(
      expectedValue.pointsToCurrencyConversionRate,
    );
};

const validateCountryMinMaxIntegrations = (
  giftCardIntegrationsService: GiftCardIntegrationsService,
  integrationList: GiftCardIntegration[],
  country: Country,
  amount: number,
  currencyAmount: number,
  errorMessage: string,
) => {
  const promiseList = integrationList.map(async (integration) => {
    try {
      await giftCardIntegrationsService.validateIntegrationRequest(
        integration.id,
        amount,
        currencyAmount,
        country,
      );
    } catch (err) {
      expect(integration.id).toEqual(errorMessage);
    }
  });
  return Promise.all(promiseList);
};
const validateListIntegrations = (
  integrationList: GiftCardIntegration[],
  errorMessage: string,
) => {
  integrationList.forEach((giftCardIntegration: GiftCardIntegration) => {
    const constraintList = JSON.parse(
      JSON.stringify(giftCardIntegration.constraintJson),
    );
    constraintList.forEach((constraintListElement, index) => {
      expect(typeof constraintListElement).toEqual('number');
      expect(constraintListElement).toBeGreaterThan(0);
      if (index > 0)
        expect(constraintListElement).toBeGreaterThan(
          constraintList[index - 1],
        );
    });
  });
};

describe('/gift-card-integrations', () => {
  let app: INestApplication;
  let giftCardIntegrationsService: GiftCardIntegrationsService;
  let prisma: PrismaService;
  let currencyRatesService: CurrencyRatesService;

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
    giftCardIntegrationsService = app.get(GiftCardIntegrationsService);
    prisma = app.get(PrismaService);
    currencyRatesService = app.get(CurrencyRatesService);
    await app.init();
  });

  describe('/:id (GET)', () => {
    it('/:id (GET) - get gift card integration US points -> USD Gift Card', async () => {
      const response = await request(app.getHttpServer())
        .get(`/gift-card-integrations/${giftCardIntegration1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user1.email,
              sub: user1.cognitoSub,
            }),
        )
        .expect(200);

      const id = response.body.id;
      expect(id).toEqual(giftCardIntegration1.id);

      expectGiftCardIntegrationRsp(response.body, {
        ...giftCardIntegration1,
        pointsToCurrencyConversionRate: 0.01,
      });
    });

    it('/:id (GET) - get gift card integration US points -> RSD Gift Card', async () => {
      const response = await request(app.getHttpServer())
        .get(`/gift-card-integrations/${giftCardIntegrationSrb.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user1.email,
              sub: user1.cognitoSub,
            }),
        )
        .expect(200);

      const id = response.body.id;
      expect(id).toEqual(giftCardIntegrationSrb.id);

      expectGiftCardIntegrationRsp(response.body, {
        ...giftCardIntegrationSrb,
        pointsToCurrencyConversionRate: 1.0787111148,
      });
    });

    it('/:id (GET) - get gift card integration - wrong id', async () => {
      await request(app.getHttpServer())
        .get(`/gift-card-integrations/${user1.id}`)
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user1.email,
              sub: user1.cognitoSub,
            }),
        )
        .expect(404);
    });
  });

  describe('/ (GET)', () => {
    it('/ (GET) - get gift card integration list - Srb user get US list', async () => {
      const response = await request(app.getHttpServer())
        .get(
          '/gift-card-integrations/?country=90f80d8c-40dc-4c43-b385-6f6fcf8e848c',
        )
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: userSrb.email,
              sub: userSrb.cognitoSub,
            }),
        )
        .expect(200);
      expect(response.body.length).toEqual(71);
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

    it('/ (GET) - get gift card integration list - US user get Serbia list', async () => {
      const response = await request(app.getHttpServer())
        .get(
          '/gift-card-integrations/?country=76a2e7f6-e202-4c99-95a6-08fb361b112d',
        )
        .set(
          'Authorization',
          'bearer ' +
            createToken({
              email: user1.email,
              sub: user1.cognitoSub,
            }),
        )
        .expect(200);
      expect(response.body.length).toEqual(20);
      const giftCardIntegrationRsp = response.body.find(
        (giftDateRsp) => giftDateRsp.id === giftCardIntegrationSrb.id,
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
        giftCardIntegrationRsp,
        giftCardIntegrationSrb,
      );
    });
  });

  describe('GiftCardIntegrationsService - CHECK SEED', () => {
    it('All Preseeded GiftCardIntegrations should accept 5000 points', async () => {
      const usCountry = await prisma.country.findUnique({
        where: { id: '90f80d8c-40dc-4c43-b385-6f6fcf8e848c' },
      });
      const integrationList = await prisma.giftCardIntegration.findMany({
        where: { countryId: '90f80d8c-40dc-4c43-b385-6f6fcf8e848c' },
      });

      await validateCountryMinMaxIntegrations(
        giftCardIntegrationsService,
        integrationList,
        usCountry,
        5000,
        50,
        'Integration should accept 5000 points, check seed.',
      );
    });

    it('All Preseeded GiftCardIntegrations should accept 1000 points - Serbia', async () => {
      const srbCountry = await prisma.country.findUnique({
        where: { id: '76a2e7f6-e202-4c99-95a6-08fb361b112d' },
      });

      const integrationList = await prisma.giftCardIntegration.findMany({
        where: { countryId: '76a2e7f6-e202-4c99-95a6-08fb361b112d' },
      });

      await validateCountryMinMaxIntegrations(
        giftCardIntegrationsService,
        integrationList,
        srbCountry,
        1000,
        1000,
        'Integration Srb should accept 1000 points, check seed.',
      );
    });

    it('All Preseeded GiftCardIntegrations should accept 2000 points - India', async () => {
      const indiaCountry = await prisma.country.findUnique({
        where: { id: '4b5f74e9-37fc-4f1d-b2fc-ddca7269d19d' },
      });

      const integrationList = await prisma.giftCardIntegration.findMany({
        where: { countryId: '4b5f74e9-37fc-4f1d-b2fc-ddca7269d19d' },
      });
      const integrationMinMaxConstraintList = integrationList.filter(
        (integration: GiftCardIntegration) =>
          integration.constraintType === IntegrationConsraintTypeEnum.MIN_MAX,
      );

      const integrationListConstraintList = integrationList.filter(
        (integration: GiftCardIntegration) =>
          integration.constraintType === IntegrationConsraintTypeEnum.LIST,
      );
      expect(integrationList.length).toEqual(
        integrationMinMaxConstraintList.length +
          integrationListConstraintList.length,
      );

      await validateCountryMinMaxIntegrations(
        giftCardIntegrationsService,
        integrationMinMaxConstraintList,
        indiaCountry,
        2000,
        2000,
        'Integration India should accept 2000 points, check seed.',
      );
      validateListIntegrations(
        integrationListConstraintList,
        'Integration India - List integration is not in good format',
      );
    });

    it('All Preseeded GiftCardIntegrations should accept 6000 points - Mexico - ONLY USD gift card integrations', async () => {
      const usCountry = await prisma.country.findUnique({
        where: { id: '90f80d8c-40dc-4c43-b385-6f6fcf8e848c' }, // US points
      });

      const integrationList = await prisma.giftCardIntegration.findMany({
        where: {
          countryId: '0268e718-8f26-4d29-8955-6fa96784bfb4',
          currency: 'USD',
        },
      });
      const integrationMinMaxConstraintList = integrationList.filter(
        (integration: GiftCardIntegration) =>
          integration.constraintType === IntegrationConsraintTypeEnum.MIN_MAX,
      );

      const integrationListConstraintList = integrationList.filter(
        (integration: GiftCardIntegration) =>
          integration.constraintType === IntegrationConsraintTypeEnum.LIST,
      );
      expect(integrationList.length).toEqual(
        integrationMinMaxConstraintList.length +
          integrationListConstraintList.length,
      );

      await validateCountryMinMaxIntegrations(
        giftCardIntegrationsService,
        integrationMinMaxConstraintList,
        usCountry,
        6000,
        60,
        'Integration Mexico should accept 60 points, check seed.',
      );
      validateListIntegrations(
        integrationListConstraintList,
        'Integration Mexico - List integration is not in good format',
      );
    });

    it('All Preseeded GiftCardIntegrations currency should exist incurrency exchange service', async () => {
      const rates = await currencyRatesService.getUsdRates();
      const integrationList = await prisma.giftCardIntegration.findMany({});
      integrationList.forEach((integration) => {
        if (!rates.hasOwnProperty(integration.currency)) {
          expect('').toEqual(
            `Currency ${integration.currency} doesn't exist in  API currency exchange`,
          );
        }
      });
    });
  });
});
