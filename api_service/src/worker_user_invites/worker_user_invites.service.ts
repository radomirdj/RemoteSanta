import { Injectable } from '@nestjs/common';
import {
  UserInviteRoleEnum,
  UserInviteSingleImportStatusEnum,
} from '@prisma/client';

import { UserInvitesService } from '../user_invites/user_invites.service';
import { PrismaService } from '../prisma/prisma.service';
import consts from '../utils/consts';
import { EmailInActiveInviteException } from '../errors/emailInActiveInviteException';
import { EmailInUseException } from '../errors/emailInUseException';

@Injectable()
export class WorkerUserInvitesService {
  constructor(
    private readonly userInvitesService: UserInvitesService,
    private readonly prisma: PrismaService,
  ) {}
  async processUserInviteMessage(sqsUserInviteMessage: SQSUserInviteMessage) {
    const {
      inviteSenderId,
      inviteSenderName,
      email,
      orgId,
      userInviteSingleImportId,
    } = sqsUserInviteMessage;
    let userInviteId = '';
    try {
      const userInvite = await this.userInvitesService.createUserInvite(
        inviteSenderId,
        inviteSenderName,
        orgId,
        email,
        UserInviteRoleEnum.BASIC_USER,
      );
      userInviteId = userInvite.id;
      await this.prisma.userInviteSingleImport.updateMany({
        where: {
          id: userInviteSingleImportId,
          status: UserInviteSingleImportStatusEnum.PENDING,
        },
        data: {
          status: UserInviteSingleImportStatusEnum.SUCCESS,
        },
      });
    } catch (error) {
      if (
        error instanceof EmailInActiveInviteException ||
        error instanceof EmailInUseException
      ) {
        await this.prisma.userInviteSingleImport.updateMany({
          where: {
            id: userInviteSingleImportId,
            status: UserInviteSingleImportStatusEnum.PENDING,
          },
          data: {
            status: UserInviteSingleImportStatusEnum.FAIL,
            failureReason: consts.userInviteImpotMessage.EMAIL_EXISTS_FAIL,
          },
        });
      } else {
        console.log('processUserInviteMessage: ', error);
        throw error;
      }
    }
    return userInviteId;
  }

  async processUserInviteFailedMessage(
    sqsUserInviteMessage: SQSUserInviteMessage,
  ) {
    console.log(
      'WorkerUserInvitesService -> processUserInviteFailedMessage -> sqsUserInviteMessage',
      sqsUserInviteMessage,
    );
  }
}
