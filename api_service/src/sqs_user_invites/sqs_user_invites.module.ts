import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';

import { SqsUserInvitesService } from './sqs_user_invites.service';

if (process.env.AWS_SECRET_KEY && process.env.AWS_ACCESS_KEY)
  AWS.config.update({
    // region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

@Module({
  providers: [SqsUserInvitesService],
  imports: [
    SqsModule.register({
      consumers: [],
      producers: [
        {
          name: 'first-queue',
          queueUrl: 'http://sqs:9324/queue/first-queue',
          region: process.env.AWS_REGION,
        },
        {
          name: process.env.AWS_SQS_QUEUE_NAME_USER_INVITE_IMPORT,
          queueUrl: process.env.AWS_SQS_QUEUE_URL_USER_INVITE_IMPORT,
          region: process.env.AWS_REGION,
        },
      ],
    }),
  ],
  exports: [SqsUserInvitesService],
})
export class SqsUserInvitesModule {}
