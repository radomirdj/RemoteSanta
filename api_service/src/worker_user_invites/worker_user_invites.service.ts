import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';

@Injectable()
export class WorkerUserInvitesService {
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
