import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';

@Injectable()
export class WorkerUserInvitesServiceMock {
  async handleUserInviteMessage(message: AWS.SQS.Message) {
    console.log(
      'WorkerUserInvitesMockService -> handleUserInviteMessage -> message',
      message,
    );
  }

  async handleUserInviteFailedMessage(message: AWS.SQS.Message) {
    console.log(
      'WorkerUserInvitesMockService -> handleUserInviteFailedMessage -> message',
      message,
    );
  }

  async handleMessage(message: AWS.SQS.Message) {
    console.log(
      'WorkerUserInvitesMockService -> handleMessage -> message',
      message,
    );
  }
  async handleDeadMessage(message: AWS.SQS.Message) {
    console.log(
      'WorkerUserInvitesMockService -> handleDeadMessage -> message',
      message,
    );
  }
}
