import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminOrgsModule } from '../admin_orgs/admin_orgs.module';
import { UserInvitesModule } from '../user_invites/user_invites.module';
import { AdminUserInvitesController } from './admin_user_invites.controller';
import { AdminUserInvitesService } from './admin_user_invites.service';

@Module({
  imports: [PrismaModule, AdminOrgsModule, UserInvitesModule],
  controllers: [AdminUserInvitesController],
  providers: [AdminUserInvitesService],
  exports: [],
})
export class AdminUserInvitesModule {}
