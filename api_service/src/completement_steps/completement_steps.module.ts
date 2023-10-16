import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailsModule } from '../emails/emails.module';
import { PaymentsModule } from '../payments/payments.module';

import { CompletementStepsController } from './completement_steps.controller';
import { CompletementStepsService } from './completement_steps.service';

@Module({
  imports: [PrismaModule, EmailsModule, PaymentsModule],
  controllers: [CompletementStepsController],
  providers: [CompletementStepsService],
  exports: [CompletementStepsService],
})
export class CompletementStepsModule {}
