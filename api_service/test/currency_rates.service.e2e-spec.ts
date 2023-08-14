import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';
import { CurrencyRatesModule } from '../src/currency_rates/currency_rates.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { LedgerService } from '../src/ledger/ledger.service';
import { AwsCognitoService } from '../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from '../src/users/aws-cognito/__mock__/aws-cognito.service.mock';
import { CurrencyRatesService } from '../src/currency_rates/currency_rates.service';

jest.mock('../src/users/jwt-values.service');
jest.mock('../src/worker_user_invites/woker_module_config');
jest.mock(
  '../src/currency_rates/currency_rates_api/currency_rates_api.service',
);

describe('LedgerService', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let currencyRatesService: CurrencyRatesService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, UsersModule, CurrencyRatesModule],
    })
      .overrideProvider(AwsCognitoService)
      .useValue(AwsCognitoServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    currencyRatesService = app.get(CurrencyRatesService);
    await app.init();
  });

  describe('CurrencyRatesService get USD rates', () => {
    it('Get All USD Rates', async () => {
      const usdRates = await currencyRatesService.getUsdRates();
      const rsdRate = usdRates['RSD'];
      expect(rsdRate).toEqual('108.96071866666666');
    });
  });

  describe('CurrencyRatesService get average conversion rates', () => {
    it('Convert EUR to RSD', async () => {
      const avgRate = await currencyRatesService.getAverageConversionRate(
        'EUR',
        'RSD',
      );

      expect(avgRate).toBeCloseTo(117.25002171929579);
    });
    it('Convert RSD to EUR', async () => {
      const avgRate = await currencyRatesService.getAverageConversionRate(
        'RSD',
        'EUR',
      );
      expect(avgRate).toBeCloseTo(0.00852878306832271);
    });
    it('Convert USD to RSD', async () => {
      const avgRate = await currencyRatesService.getAverageConversionRate(
        'USD',
        'RSD',
      );
      expect(avgRate).toBeCloseTo(108.96071866666666);
    });
    it('Convert USD to RSD', async () => {
      const avgRate = await currencyRatesService.getAverageConversionRate(
        'USD',
        'RSD',
      );
      expect(avgRate).toBeCloseTo(108.96071866666666);
    });

    it('Error currency', async () => {
      try {
        await currencyRatesService.getAverageConversionRate('ABC', 'RSD');
        expect('').toEqual('Currency ABC should throw error');
      } catch (error) {
        expect(error.message).toEqual("Currency ABC doesn't exist");
      }
    });
  });

  describe('CurrencyRatesService get Points To Currency conversion rates', () => {
    it('Convert US points to RSD', async () => {
      const usCountry = await prisma.country.findUnique({
        where: { id: '90f80d8c-40dc-4c43-b385-6f6fcf8e848c' },
      });
      const rate = await currencyRatesService.getPointsToCurrencyConversionRate(
        usCountry,
        'RSD',
      );
      expect(rate).toBeCloseTo(1.0787111148);
    });
  });
});
