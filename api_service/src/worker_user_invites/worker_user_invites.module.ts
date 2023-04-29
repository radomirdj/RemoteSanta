import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { WorkerUserInvitesService } from './worker_user_invites.service';
import WokerModuleConfig from './woker_module_config';
if (process.env.AWS_SECRET_KEY && process.env.AWS_ACCESS_KEY)
  AWS.config.update({
    // region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

@Module({
  imports: [
    SqsModule.register({
      consumers: WokerModuleConfig.getSqsConsumerList(process),
      producers: [],
    }),
  ],
  providers: [WorkerUserInvitesService],
})
export class WorkerUserInvitesModule {}
