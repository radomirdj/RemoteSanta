import { Injectable, NotFoundException } from '@nestjs/common';
import * as randomstring from 'randomstring';
import { PrismaService } from '../prisma/prisma.service';
import { UserInviteDto } from './dtos/user-invite.dto';
import { UserInvite, UserInviteStatusEnum, User, Org } from '@prisma/client';
import { EmailInUseException } from '../errors/emailInUseException';
import { EmailInActiveInviteException } from '../errors/emailInActiveInviteException';
import { UsersService, orgDefaultJoin } from '../users/users.service';
import { InviteNotActiveException } from '../errors/inviteNotActiveException';
import { EmailsService } from '../emails/emails.service';
import { AdminOrgsService } from '../admin_orgs/admin_orgs.service';
import { UserInviteRoleEnum } from '@prisma/client';

@Injectable()
export class UserInvitesService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private emailsService: EmailsService,
    private adminOrgsService: AdminOrgsService,
  ) {}

  getOrgInviteList(orgId: string): Promise<UserInviteDto[]> {
    return this.prisma.userInvite.findMany({
      include: {
        createdBy: true,
        org: {
          include: orgDefaultJoin,
        },
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

  async findActiveByEmail(email: string): Promise<UserInvite | null> {
    const userInviteList = await this.prisma.userInvite.findMany({
      where: { email, status: UserInviteStatusEnum.ACTIVE },
    });
    if (!userInviteList.length) return null;
    return userInviteList[0];
  }

  async createUserInvite(
    user: User,
    orgId: string,
    email: string,
    userRole: UserInviteRoleEnum,
  ): Promise<UserInvite> {
    const [existingInvite, existingUser, org] = await Promise.all([
      this.findActiveByEmail(email),
      this.usersService.findByEmail(email),
      this.adminOrgsService.getById(orgId),
    ]);

    if (existingInvite) {
      throw new EmailInActiveInviteException();
    }
    if (existingUser) {
      throw new EmailInUseException();
    }

    const code = randomstring.generate(15);
    await this.emailsService.sendInviteEmail(
      email,
      code,
      org.name,
      `${user.firstName} ${user.lastName}`,
    );

    return this.prisma.userInvite.create({
      data: {
        email,
        status: UserInviteStatusEnum.ACTIVE,
        userRole,
        code,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
        org: {
          connect: {
            id: org.id,
          },
        },
      },
    });
  }

  async cancelUserInvite(
    id: string,
    orgId: string | null,
    isAdmin: boolean | null,
  ) {
    const userInvite = await this.prisma.userInvite.findUnique({
      where: { id },
    });
    if (!userInvite || (!isAdmin && userInvite.orgId !== orgId))
      throw new NotFoundException('UserInvite not found');

    if (userInvite.status !== UserInviteStatusEnum.ACTIVE) {
      throw new InviteNotActiveException();
    }

    return this.prisma.userInvite.update({
      where: { id },
      data: {
        status: UserInviteStatusEnum.CANCELED,
      },
    });
  }
}
