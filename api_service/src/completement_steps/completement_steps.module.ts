import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CompletementStepsController } from './completement_steps.controller';
import { CompletementStepsService } from './completement_steps.service';

@Module({
  imports: [PrismaModule],
  controllers: [CompletementStepsController],
  providers: [CompletementStepsService],
  exports: [CompletementStepsService],
})
export class CompletementStepsModule {}
