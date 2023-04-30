import { AuthGuard } from '@nestjs/passport';
import { Controller, UseGuards, Get, Post, Body, Param } from '@nestjs/common';
import { UserInvitesService } from './user_invites.service';
import { UserManagerGuard } from '../guards/user_manager.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { UserInviteDto } from './dtos/user-invite.dto';
import { CreateUserInviteDto } from './dtos/create-user-invite.dto';
import { BulkCreateUserInviteDto } from './dtos/bulk-create-user-invite.dto';

@Controller('user-invites')
@UseGuards(AuthGuard('jwt'), UserManagerGuard)
export class UserInvitesController {
  constructor(private userInvitesService: UserInvitesService) {}
  @Get('')
  @Serialize(UserInviteDto)
  async getUserInvites(@CurrentUser() user: User) {
    return this.userInvitesService.getOrgInviteList(user.orgId);
  }

  @Post('')
  @Serialize(UserInviteDto)
  async createUserInvites(
    @CurrentUser() user: User,
    @Body() createUserInviteDto: CreateUserInviteDto,
  ) {
    return this.userInvitesService.createUserInvite(
      user.id,
      `${user.firstName} ${user.lastName}`,
      user.orgId,
      createUserInviteDto.email,
      createUserInviteDto.userRole,
    );
  }

  @Post('/bulk-create')
  async bulkCreateUserInvites(
    @CurrentUser() user: User,
    @Body() bulkCreateUserInviteDto: BulkCreateUserInviteDto,
  ) {
    return this.userInvitesService.bulkCreateUserInvites(
      user,
      user.orgId,
      bulkCreateUserInviteDto.emailList,
    );
  }

  @Post('/:id/cancel')
  @Serialize(UserInviteDto)
  async cancelUserInvite(@CurrentUser() user: User, @Param('id') id: string) {
    return this.userInvitesService.cancelUserInvite(id, user.orgId, false);
  }
}
