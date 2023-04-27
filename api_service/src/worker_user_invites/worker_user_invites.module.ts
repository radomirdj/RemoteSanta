import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { WorkerUserInvitesService } from './worker_user_invites.service';

if (process.env.AWS_SECRET_KEY && process.env.AWS_ACCESS_KEY)
  AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

@Module({
  imports: [
    SqsModule.register({
      consumers: [
        {
          name: 'first-queue',
          queueUrl: 'http://sqs:9324/queue/first-queue',
          region: process.env.AWS_REGION,
        },
        {
          name: 'dead-first-queue',
          queueUrl: 'http://sqs:9324/queue/dead-first-queue',
          region: process.env.AWS_REGION,
        },
      ],
      producers: [],
    }),
  ],
  providers: [WorkerUserInvitesService],
})
export class WorkerUserInvitesModule {}
