import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SqsService } from '@ssut/nestjs-sqs';
import { Org, UserInviteSingleImport, User } from '@prisma/client';
import addSQSFifoParams from '../utils/addSQSFifoParams';
@Injectable()
export class SqsUserInvitesService {
  constructor(private readonly sqsService: SqsService) {}

  async inviteByEmailList(
    userInviteSingleImportList: UserInviteSingleImport[],
    org: Org,
    inviteSender: User,
  ) {
    const messageList = userInviteSingleImportList.map(
      (userInviteSingleImport: UserInviteSingleImport) =>
        addSQSFifoParams(
          {
            id: userInviteSingleImport.id,
            body: {
              email: userInviteSingleImport.email,
              userInviteSingleImportId: userInviteSingleImport.id,
              orgId: org.id,
              inviteSenderId: inviteSender.id,
              inviteSenderName: `${inviteSender.firstName} ${inviteSender.lastName}`,
            } as SQSUserInviteMessage,
          },
          userInviteSingleImport.id,
        ),
    );
    await this.sqsService.send('user-invite-bulk-create', messageList);
  }

  async inviteByEmailList2(emailList: string[]) {
    const messageList = emailList.map((email) =>
      addSQSFifoParams({
        id: uuidv4(),
        body: { test: email },
      }),
    );
    try {
      await this.sqsService.send('first-queue', messageList);
    } catch (error) {
      console.log('error in producing image!', error);
    }
  }
}
