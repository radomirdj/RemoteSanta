import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkerUserInvitesService {
  async processUserInviteMessage(sqsUserInviteMessage: SQSUserInviteMessage) {
    console.log(
      'WorkerUserInvitesService -> processUserInviteMessage -> sqsUserInviteMessage',
      sqsUserInviteMessage,
    );
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
