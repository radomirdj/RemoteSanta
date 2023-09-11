import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { UsersModule } from '../src/users/users.module';
import { CurrencyRatesModule } from '../src/currency_rates/currency_rates.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AwsCognitoService } from '../src/users/aws-cognito/aws-cognito.service';
import { AwsCognitoServiceMock } from '../src/users/aws-cognito/__mock__/aws-cognito.service.mock';

jest.mock('../src/users/jwt-values.service');
jest.mock('../src/worker_user_invites/woker_module_config');
jest.mock(
  '../src/currency_rates/currency_rates_api/currency_rates_api.service',
);
import * as countryService from 'country-list-js';
import { v4 as uuidv4 } from 'uuid';
import * as YAML from 'yaml';
import * as fs from 'fs';
import * as countryFlagEmoji from 'country-flag-emoji';

describe('Country Scripts', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, UsersModule, CurrencyRatesModule],
    })
      .overrideProvider(AwsCognitoService)
      .useValue(AwsCognitoServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
  });

  it.skip('Generate Countries', async () => {
    let countryNames = countryService.names();
    const countryList = countryNames.map((countryName) => {
      const countryDetails = countryService.findByName(countryName);
      return {
        id: uuidv4(),
        countryName: countryDetails.name,
        countryCode: countryDetails.code['iso3'],
        currencyString: countryDetails.currency['code'],
        conversionRateToPoints:
          10 ** parseInt(countryDetails.currency['decimal']),
      };
    });
    console.log('countryList', countryList);
    const YAMLcountries = YAML.stringify(countryList);
    console.log('YAMLcountries', YAMLcountries);
    fs.writeFileSync('./countries.yaml', YAMLcountries);
  });

  it.skip('Generate FE Countries', async () => {
    const countryDBList = await prisma.country.findMany({
      orderBy: [{ countryName: 'asc' }],
    });
    const countryList = countryDBList.map((countryDB) => {
      const country = countryService.findByIso3(countryDB.countryCode);
      console.log('country', country);
      if (country) {
        const flagEmpji = countryFlagEmoji.get(country.code['iso2']);
        console.log('flagEmpji', flagEmpji);
        return {
          ...countryDB,
          flagEmoji: flagEmpji.emoji,
          flagEmojiUnicode: flagEmpji.unicode,
        };
      }
      return countryDB;
    });
    console.log('countryList', countryList);
    fs.writeFileSync(
      './countriesFE.json',
      JSON.stringify(countryList, null, 2),
      'utf-8',
    );
  });
});
