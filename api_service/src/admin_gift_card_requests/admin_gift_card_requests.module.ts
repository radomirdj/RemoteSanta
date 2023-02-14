import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { LedgerModule } from '../ledger/ledger.module';
import { AdminGiftCardRequestsController } from './admin_gift_card_requests.controller';
import { AdminGiftCardRequestsService } from './admin_gift_card_requests.service';
import { EmailsModule } from '../emails/emails.module';
@Module({
  imports: [PrismaModule, LedgerModule, EmailsModule],
  controllers: [AdminGiftCardRequestsController],
  providers: [AdminGiftCardRequestsService],
})
export class AdminGiftCardRequestsModule {}
