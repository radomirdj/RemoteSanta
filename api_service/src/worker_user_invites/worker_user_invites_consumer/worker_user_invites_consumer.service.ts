import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { WorkerUserInvitesService } from '../worker_user_invites.service';

@Injectable()
export class WorkerUserInvitesConsumerService {
  constructor(private workerUserInvitesService: WorkerUserInvitesService) {}
  @SqsMessageHandler(process.env.AWS_SQS_QUEUE_NAME_USER_INVITE_IMPORT, false)
  async handleUserInviteMessage(message: AWS.SQS.Message) {
    const userInviteMessage: any = JSON.parse(
      message.Body,
    ) as SQSUserInviteMessage;
    await this.workerUserInvitesService.processUserInviteMessage(
      userInviteMessage,
    );
  }

  @SqsMessageHandler(
    process.env.AWS_SQS_QUEUE_NAME_USER_INVITE_IMPORT_FAILED,
    false,
  )
  async handleUserInviteFailedMessage(message: AWS.SQS.Message) {
    const userInviteMessage: any = JSON.parse(
      message.Body,
    ) as SQSUserInviteMessage;
    await this.workerUserInvitesService.processUserInviteFailedMessage(
      userInviteMessage,
    );
  }

  @SqsMessageHandler('first-queue', false)
  async handleMessage(message: AWS.SQS.Message) {
    const obj: any = JSON.parse(message.Body) as {
      message: string;
    };
    if (obj.test.includes('2')) {
      console.log('========WorkerUserInvitesService -> obj:any -> obj', obj);
      throw new Error('aaa');
    }
  }
  @SqsMessageHandler('dead-first-queue', false)
  async handleDeadMessage(message: AWS.SQS.Message) {
    const obj: any = JSON.parse(message.Body) as {
      message: string;
    };
    console.log('WorkerUserInvitesService -> obj:any -> obj', obj);
    throw new Error('aaa');
  }
}
