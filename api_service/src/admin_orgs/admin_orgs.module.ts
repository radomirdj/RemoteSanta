import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { LedgerModule } from '../ledger/ledger.module';
import { AdminOrgsController } from './admin_orgs.controller';
import { AdminOrgsService } from './admin_orgs.service';
import { UsersModule } from '../users/users.module';
import { UserInvitesModule } from '../user_invites/user_invites.module';

@Module({
  imports: [PrismaModule, LedgerModule, UsersModule, UserInvitesModule],
  controllers: [AdminOrgsController],
  providers: [AdminOrgsService],
  exports: [AdminOrgsService],
})
export class AdminOrgsModule {}
