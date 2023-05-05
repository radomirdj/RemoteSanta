import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SqsUserInvitesService } from './sqs_user_invites/sqs_user_invites.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sqsUserInvitesService: SqsUserInvitesService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const emailArray = Array.from(
      { length: 20 },
      (_, index) => `email+${index}@email.com`,
    );
    await this.sqsUserInvitesService.inviteByEmailList2(emailArray);
    return this.appService.getHello();
  }
}
