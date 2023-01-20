import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserInviteDto } from '../user_invites/dtos/user-invite.dto';
import { AdminUserInvitesService } from './admin_user_invites.service';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminUserInvitesController {
  constructor(private adminUserInvitesService: AdminUserInvitesService) {}

  @Serialize(UserInviteDto)
  @Get('/orgs/:id/user-invites/')
  async getOrgUserInvutes(@Param('id') id: string) {
    return this.adminUserInvitesService.getUserInviteListByOrg(id);
  }
}
