import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserInviteDto } from './dtos/user-invite.dto';

@Injectable()
export class UserInvitesService {
  constructor(private prisma: PrismaService) {}

  getOrgInviteList(orgId: string): Promise<UserInviteDto[]> {
    return this.prisma.userInvite.findMany({
      include: {
        createdBy: true,
        org: true,
      },
      where: {
        orgId,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
  }
}
