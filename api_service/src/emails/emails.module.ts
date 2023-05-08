import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import * as AWS from 'aws-sdk';

import { EmailsService } from './emails.service';
import { SqsModule } from '@ssut/nestjs-sqs';
import WokerModuleConfig from './woker_module_config';

if (process.env.AWS_SECRET_KEY && process.env.AWS_ACCESS_KEY)
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.AWS_SES_SMTP_HOST,
        auth: {
          user: process.env.AWS_SES_SMTP_USERNAME,
          pass: process.env.AWS_SES_SMTP_PASSWORD,
        },
      },
      defaults: {
        from: process.env.EMAIL_FROM,
      },
    }),

    SqsModule.register({
      consumers: WokerModuleConfig.getSqsConsumerList(process),
      producers: [
        {
          name: 'email-send',
          queueUrl: process.env.AWS_SQS_QUEUE_URL_SEND_EMAIL,
          region: process.env.AWS_REGION,
        },
      ],
    }),
  ],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
