import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { LedgerModule } from '../ledger/ledger.module';
import { AdminOrgsController } from './admin_orgs.controller';
import { AdminOrgsService } from './admin_orgs.service';
import { UsersModule } from '../users/users.module';
import { EmailsModule } from '../emails/emails.module';
@Module({
  imports: [PrismaModule, LedgerModule, UsersModule, EmailsModule],
  controllers: [AdminOrgsController],
  providers: [AdminOrgsService],
  exports: [AdminOrgsService],
})
export class AdminOrgsModule {}
