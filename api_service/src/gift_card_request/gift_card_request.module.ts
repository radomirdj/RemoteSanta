import { Module } from '@nestjs/common';
import { GiftCardRequestController } from './gift_card_request.controller';
import { GiftCardRequestService } from './gift_card_request.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LedgerModule } from '../ledger/ledger.module';
import { GiftCardIntegrationsModule } from '../gift_card_integrations/gift_card_integrations.module';

@Module({
  imports: [PrismaModule, GiftCardIntegrationsModule, LedgerModule],
  controllers: [GiftCardRequestController],
  providers: [GiftCardRequestService],
})
export class GiftCardRequestModule {}
