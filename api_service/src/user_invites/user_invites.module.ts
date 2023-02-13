import { Module } from '@nestjs/common';
import { UserInvitesController } from './user_invites.controller';
import { UserInvitesService } from './user_invites.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { EmailsModule } from '../emails/emails.module';
import { AdminOrgsModule } from '../admin_orgs/admin_orgs.module';

@Module({
  imports: [PrismaModule, UsersModule, EmailsModule, AdminOrgsModule],
  controllers: [UserInvitesController],
  providers: [UserInvitesService],
  exports: [UserInvitesService],
})
export class UserInvitesModule {}
