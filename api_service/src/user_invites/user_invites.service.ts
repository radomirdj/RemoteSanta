import { Injectable, NotFoundException } from '@nestjs/common';
import {
  UserInviteRoleEnum,
  UserInviteSingleImport,
  UserInviteSingleImportStatusEnum,
} from '@prisma/client';

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
import { SqsUserInvitesService } from '../sqs_user_invites/sqs_user_invites.service';
import { BulkCreateUserInviteJobDto } from './dtos/bulk-create-user-invite-job.dto';
import { UserInviteSingleImportDto } from './dtos/user-invite-single-import.dto';
import { BulkCreateUserInviteJobProgressDto } from './dtos/bulk-create-user-invite-job-progress.dto';

@Injectable()
export class UserInvitesService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private emailsService: EmailsService,
    private adminOrgsService: AdminOrgsService,
    private readonly sqsUserInvitesService: SqsUserInvitesService,
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
    userId: string,
    userFullName: string,
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
      userFullName,
    );

    return this.prisma.userInvite.create({
      data: {
        email,
        status: UserInviteStatusEnum.ACTIVE,
        userRole,
        code,
        createdBy: {
          connect: {
            id: userId,
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

  async bulkCreateUserInvites(user: User, orgId: string, emailList: string[]) {
    const uniqueEmailList = [...new Set(emailList)];
    const [org, userInviteImportJob] = await Promise.all([
      this.adminOrgsService.getById(orgId),
      this.prisma.userInviteImportJob.create({
        data: {
          createdBy: {
            connect: {
              id: user.id,
            },
          },
          org: {
            connect: {
              id: orgId,
            },
          },
        },
      }),
    ]);
    const userInviteSingleImportData = uniqueEmailList.map((email) => ({
      email,
      userInviteImportJobId: userInviteImportJob.id,
    }));

    await this.prisma.userInviteSingleImport.createMany({
      data: userInviteSingleImportData,
    });
    const userInviteSingleImportList =
      await this.prisma.userInviteSingleImport.findMany({
        where: {
          userInviteImportJobId: userInviteImportJob.id,
        },
      });
    await this.sqsUserInvitesService.inviteByEmailList(
      userInviteSingleImportList,
      org,
      user,
    );
    return userInviteImportJob;
  }

  async getBulkCreateUserInvitesJob(
    id: string,
    orgId: string | null,
    isAdmin: boolean | null,
  ): Promise<BulkCreateUserInviteJobDto> {
    const userInviteImportJob =
      await this.prisma.userInviteImportJob.findUnique({
        where: {
          id,
        },
        include: {
          UserInviteSingleImport: true,
        },
      });

    if (
      !userInviteImportJob ||
      (!isAdmin && userInviteImportJob.orgId !== orgId)
    )
      throw new NotFoundException('BulkCreateUserInvitesJob not found');
    const { UserInviteSingleImport } = userInviteImportJob;
    const singleImportList: UserInviteSingleImportDto[] =
      UserInviteSingleImport.map(
        (userInviteSingleImport) =>
          ({
            id: userInviteSingleImport.id,
            status: userInviteSingleImport.status,
            failureReason: userInviteSingleImport.failureReason,
            email: userInviteSingleImport.email,
          } as UserInviteSingleImportDto),
      );

    return {
      id,
      orgId: userInviteImportJob.orgId,
      userInviteSingleImportList: singleImportList,
    };
  }

  async getBulkCreateJobProgress(
    id: string,
    orgId: string | null,
    isAdmin: boolean | null,
  ): Promise<BulkCreateUserInviteJobProgressDto> {
    const [userInviteImportJob, userInviteSingleImportStatusList] =
      await Promise.all([
        this.prisma.userInviteImportJob.findUnique({
          where: {
            id,
          },
        }),

        await this.prisma.userInviteSingleImport.groupBy({
          by: ['status'],
          where: {
            userInviteImportJobId: id,
          },
          _count: {
            id: true,
          },
        }),
      ]);

    let statusMap = new Map<string, number>();
    userInviteSingleImportStatusList.forEach((userInviteSingleImportStatus) => {
      statusMap.set(
        userInviteSingleImportStatus.status,
        userInviteSingleImportStatus._count.id,
      );
    });

    if (
      !userInviteImportJob ||
      (!isAdmin && userInviteImportJob.orgId !== orgId)
    )
      throw new NotFoundException('BulkCreateUserInvitesJob not found');

    return {
      id,
      pendingCount:
        statusMap.get(UserInviteSingleImportStatusEnum.PENDING) || 0,
      successCount:
        statusMap.get(UserInviteSingleImportStatusEnum.SUCCESS) || 0,
      failCount: statusMap.get(UserInviteSingleImportStatusEnum.FAIL) || 0,
    };
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
