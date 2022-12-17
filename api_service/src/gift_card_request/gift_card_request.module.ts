import { Module } from '@nestjs/common';
import { GiftCardRequestController } from './gift_card_request.controller';
import { GiftCardRequestService } from './gift_card_request.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GiftCardRequestController],
  providers: [GiftCardRequestService],
})
export class GiftCardRequestModule {}
