import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GiftCardIntegrationsController } from './gift_card_integrations.controller';
import { GiftCardIntegrationsService } from './gift_card_integrations.service';
import { CurrencyRatesModule } from '../currency_rates/currency_rates.module';

@Module({
  imports: [PrismaModule, CurrencyRatesModule],
  controllers: [GiftCardIntegrationsController],
  providers: [GiftCardIntegrationsService],
  exports: [GiftCardIntegrationsService],
})
export class GiftCardIntegrationsModule {}
