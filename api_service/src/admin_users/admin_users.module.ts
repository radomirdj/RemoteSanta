import { Module } from '@nestjs/common';
import { AdminUsersController } from './admin_users.controller';
import { AdminUsersService } from './admin_users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { LedgerModule } from '../ledger/ledger.module';
import { AdminOrgsModule } from '../admin_orgs/admin_orgs.module';
@Module({
  imports: [PrismaModule, UsersModule, LedgerModule, AdminOrgsModule],
  controllers: [AdminUsersController],
  providers: [AdminUsersService],
  exports: [AdminUsersService],
})
export class AdminUsersModule {}
