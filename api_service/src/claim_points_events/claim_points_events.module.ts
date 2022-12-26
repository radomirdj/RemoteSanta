import { Module } from '@nestjs/common';
import { ClaimPointsEventsController } from './claim_points_events.controller';
import { ClaimPointsEventsService } from './claim_points_events.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClaimPointsEventsController],
  providers: [ClaimPointsEventsService],
})
export class ClaimPointsEventsModule {}
