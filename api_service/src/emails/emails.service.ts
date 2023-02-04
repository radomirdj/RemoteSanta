import { Injectable, INestApplication, OnModuleInit } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailsService {
  constructor(private mailService: MailerService) {}

  sendEmail(templateName: string, to: string, data: any) {
    return this.mailService.sendMail({
      to,
      from: process.env.EMAIL_FROM,
      subject: 'Hi there',
      template: `./${templateName}/html`,
      context: data,
    });
  }
}
