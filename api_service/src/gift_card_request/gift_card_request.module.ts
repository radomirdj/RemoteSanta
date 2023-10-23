import { Module } from '@nestjs/common';
import { GiftCardRequestController } from './gift_card_request.controller';
import { GiftCardRequestService } from './gift_card_request.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LedgerModule } from '../ledger/ledger.module';
import { GiftCardIntegrationsModule } from '../gift_card_integrations/gift_card_integrations.module';
import { GiftCardThirdPartyApiModule } from '../gift_card_third_party_api/gift_card_third_party_api.module';
import { EmailsModule } from '../emails/emails.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PrismaModule,
    GiftCardIntegrationsModule,
    GiftCardThirdPartyApiModule,
    LedgerModule,
    EmailsModule,
    UsersModule,
  ],
  controllers: [GiftCardRequestController],
  providers: [GiftCardRequestService],
})
export class GiftCardRequestModule {}
