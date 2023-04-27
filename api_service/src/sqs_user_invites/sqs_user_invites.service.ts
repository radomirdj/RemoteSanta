import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';

@Injectable()
export class SqsUserInvitesService {
  constructor(private readonly sqsService: SqsService) {}

  async inviteByEmailList(emailList: string[]) {
    console.log('SqsUserInvitesService -> inviteByEmailList -> emailList]]]]]');
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
