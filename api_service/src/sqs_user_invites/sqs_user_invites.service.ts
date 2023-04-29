import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { Org, UserInviteSingleImport, User } from '@prisma/client';

@Injectable()
export class SqsUserInvitesService {
  constructor(private readonly sqsService: SqsService) {}

  async inviteByEmailList(
    userInviteSingleImportList: UserInviteSingleImport[],
    org: Org,
    inviteSender: User,
  ) {
    const messageList = userInviteSingleImportList.map(
      (userInviteSingleImport: UserInviteSingleImport) => ({
        id: userInviteSingleImport.id,
        body: {
          email: userInviteSingleImport.email,
          userInviteSingleImportId: userInviteSingleImport.id,
          orgId: org.id,
          inviteSenderId: inviteSender.id,
          inviteSenderName: `${inviteSender.firstName} ${inviteSender.lastName}`,
        } as SQSUserInviteMessage,
      }),
    );
    await this.sqsService.send(
      process.env.AWS_SQS_QUEUE_NAME_USER_INVITE_IMPORT,
      messageList,
    );
  }

  async inviteByEmailList2(emailList: string[]) {
    const messageList = emailList.map((email) => ({
      id: email,
      body: { test: email },
    }));
    try {
      await this.sqsService.send('first-queue', messageList);
    } catch (error) {
      console.log('error in producing image!', error);
    }
  }
}
