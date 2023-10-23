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

jest.mock('../src/users/jwt-values.service');
jest.mock('../src/worker_user_invites/woker_module_config');
jest.mock(
  '../src/currency_rates/currency_rates_api/currency_rates_api.service',
);

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
    it.skip('Get All US gift card integrations - GoGift', async () => {
      const rsp =
        await giftCardThirdPartyApiService.getGiftCardIntegrationsExample();
      console.log('rsp', rsp);
    });
  });

  describe('Fulfill Gift Card', () => {
    it.skip('Fulfill Gift Card Germany gift card integrations - GoGift', async () => {
      const productId = '578930576070434816';
      const recepientEmail = 'radomir.m.djokovic@gmail.com';
      const recepientName = 'Pera';
      const valueCurrency = 'EUR';

      const fulfilledBasket =
        await giftCardThirdPartyApiService.fulfillGiftCard(
          productId,
          recepientEmail,
          recepientName,
          valueCurrency,
          50,
          'DE',
        );
      console.log('fulfilledBasket', fulfilledBasket);
    });
  });
});
