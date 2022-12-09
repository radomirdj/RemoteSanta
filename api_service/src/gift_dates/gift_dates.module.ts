import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GiftDatesController } from './gift_dates.controller';
import { GiftDatesService } from './gift_dates.service';

@Module({
  imports: [PrismaModule],
  controllers: [GiftDatesController],
  providers: [GiftDatesService],
})
export class GiftDatesModule {}
