import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminOrgsModule } from '../admin_orgs/admin_orgs.module';

@Module({
  imports: [PrismaModule, AdminOrgsModule],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
