import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminGiftCardRequestsController } from './admin_gift_card_requests.controller';
import { AdminGiftCardRequestsService } from './admin_gift_card_requests.service';

@Module({
  imports: [PrismaModule],
  controllers: [AdminGiftCardRequestsController],
  providers: [AdminGiftCardRequestsService],
})
export class AdminGiftCardRequestsModule {}
