import { Controller, Get, Param, UseGuards, Post, Body } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserInviteDto } from '../user_invites/dtos/user-invite.dto';
import { AdminUserInvitesService } from './admin_user_invites.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { CreateUserInviteDto } from '../user_invites/dtos/create-user-invite.dto';
import { UserInvitesService } from '../user_invites/user_invites.service';
import { BulkCreateUserInviteJobDto } from '../user_invites/dtos/bulk-create-user-invite-job.dto';
import { BulkCreateUserInviteJobProgressDto } from '../user_invites/dtos/bulk-create-user-invite-job-progress.dto';
import { BulkCreateUserInviteDto } from '../user_invites/dtos/bulk-create-user-invite.dto';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminUserInvitesController {
  constructor(
    private adminUserInvitesService: AdminUserInvitesService,
    private userInvitesService: UserInvitesService,
  ) {}

  @Serialize(UserInviteDto)
  @Get('/orgs/:id/user-invites/')
  async getOrgUserInvutes(@Param('id') id: string) {
    return this.adminUserInvitesService.getUserInviteListByOrg(id);
  }

  @Post('/orgs/:id/user-invites/')
  async createUserInvites(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() createUserInviteDto: CreateUserInviteDto,
  ) {
    return this.userInvitesService.createUserInvite(
      user.id,
      `${user.firstName} ${user.lastName}`,
      id,
      createUserInviteDto.email,
      createUserInviteDto.userRole,
    );
  }

  @Post('/user-invites/:id/cancel')
  async cancelUserInvite(@Param('id') id: string) {
    return this.userInvitesService.cancelUserInvite(id, null, true);
  }

  @Post('/orgs/:id/user-invites/bulk-create-jobs/')
  async bulkCreateUserInvitesJob(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() bulkCreateUserInviteDto: BulkCreateUserInviteDto,
  ) {
    return this.userInvitesService.bulkCreateUserInvites(
      user,
      id,
      bulkCreateUserInviteDto.emailList,
    );
  }

  @Get('/user-invites/bulk-create-jobs/:id')
  @Serialize(BulkCreateUserInviteJobDto)
  async getBulkCreateUserInvitesJob(
    @Param('id') id: string,
  ): Promise<BulkCreateUserInviteJobDto> {
    return this.userInvitesService.getBulkCreateUserInvitesJob(id, null, true);
  }

  @Get('/user-invites/bulk-create-jobs/:id/progress')
  @Serialize(BulkCreateUserInviteJobProgressDto)
  async getBulkCreateJobProgress(
    @Param('id') id: string,
  ): Promise<BulkCreateUserInviteJobProgressDto> {
    return this.userInvitesService.getBulkCreateJobProgress(id, null, true);
  }
}
