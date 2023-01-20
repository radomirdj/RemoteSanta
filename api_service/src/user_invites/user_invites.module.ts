import { Module } from '@nestjs/common';
import { UserInvitesController } from './user_invites.controller';
import { UserInvitesService } from './user_invites.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [UserInvitesController],
  providers: [UserInvitesService],
  exports: [UserInvitesService],
})
export class UserInvitesModule {}
