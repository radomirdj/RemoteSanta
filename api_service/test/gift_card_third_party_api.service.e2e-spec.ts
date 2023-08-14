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
import { GiftCardThirdPartyApiService } from '../src/gift_card_third_party_api/gift_card_third_party_api.service';

// jest.mock('../src/users/jwt-values.service');
// jest.mock(
//   '../src/currency_rates/currency_rates_api/currency_rates_api.service',
// );

describe('LedgerService', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let giftCardThirdPartyApiService: GiftCardThirdPartyApiService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, UsersModule, CurrencyRatesModule],
    })
      .overrideProvider(AwsCognitoService)
      .useValue(AwsCognitoServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    giftCardThirdPartyApiService = app.get(GiftCardThirdPartyApiService);
    await app.init();
  });

  describe('Get gift card integrations by country - GoGift', () => {
    it('Get All US gift card integrations - GoGift', async () => {
      await giftCardThirdPartyApiService.getToken();
    });
  });
});
