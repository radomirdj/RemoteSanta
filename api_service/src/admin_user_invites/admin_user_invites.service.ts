import { Injectable } from '@nestjs/common';
import { UserInvitesService } from '../user_invites/user_invites.service';
import { UserInviteDto } from 'src/user_invites/dtos/user-invite.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AdminOrgsService } from '../admin_orgs/admin_orgs.service';

@Injectable()
export class AdminUserInvitesService {
  constructor(
    private prisma: PrismaService,
    private adminOrgsService: AdminOrgsService,
    private usersInvitesService: UserInvitesService,
  ) {}

  async getUserInviteListByOrg(orgId: string): Promise<UserInviteDto[]> {
    const [org, rsp] = await Promise.all([
      this.adminOrgsService.getById(orgId),
      this.usersInvitesService.getOrgInviteList(orgId),
    ]);
    return rsp;
  }
}
