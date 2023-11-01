import { Module } from '@nestjs/common';
import { AdminGiftCardIntegrationsController } from './admin_gift_card_integrations.controller';
import { AdminGiftCardIntegrationsService } from './admin_gift_card_integrations.service';
import { GiftCardIntegrationsModule } from '../gift_card_integrations/gift_card_integrations.module';
import { GiftCardThirdPartyApiModule } from '../gift_card_third_party_api/gift_card_third_party_api.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    GiftCardIntegrationsModule,
    GiftCardThirdPartyApiModule,
  ],
  controllers: [AdminGiftCardIntegrationsController],
  providers: [AdminGiftCardIntegrationsService],
})
export class AdminGiftCardIntegrationsModule {}
