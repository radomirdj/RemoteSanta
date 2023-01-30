import { Injectable, NotFoundException } from '@nestjs/common';
import * as randomstring from 'randomstring';
import { PrismaService } from '../prisma/prisma.service';
import { UserInviteDto } from './dtos/user-invite.dto';
import { UserInvite, UserInviteStatusEnum } from '@prisma/client';
import { EmailInUseException } from '../errors/emailInUseException';
import { EmailInActiveInviteException } from '../errors/emailInActiveInviteException';
import { UsersService } from '../users/users.service';
import { InviteNotActiveException } from '../errors/inviteNotActiveException';

@Injectable()
export class UserInvitesService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

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

  async findActiveByEmail(email: string): Promise<UserInvite | null> {
    const userInviteList = await this.prisma.userInvite.findMany({
      where: { email, status: UserInviteStatusEnum.ACTIVE },
    });
    if (!userInviteList.length) return null;
    return userInviteList[0];
  }

  async createUserInvite(
    userId: string,
    orgId: string,
    email: string,
  ): Promise<UserInvite> {
    const [existingInvite, existingUser] = await Promise.all([
      this.findActiveByEmail(email),
      this.usersService.findByEmail(email),
    ]);

    if (existingInvite) {
      throw new EmailInActiveInviteException();
    }
    if (existingUser) {
      throw new EmailInUseException();
    }

    const code = randomstring.generate(7);

    return this.prisma.userInvite.create({
      data: {
        email,
        status: UserInviteStatusEnum.ACTIVE,
        code,
        createdBy: {
          connect: {
            id: userId,
          },
        },
        org: {
          connect: {
            id: orgId,
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
