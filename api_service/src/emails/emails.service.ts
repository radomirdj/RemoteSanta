import { Injectable, INestApplication, OnModuleInit } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as Email from 'email-templates';
import { join } from 'path';

@Injectable()
export class EmailsService {
  private readonly email;
  constructor(private mailService: MailerService) {
    this.email = new Email({
      views: {
        root: join(__dirname, 'templates'),
      },
    });
  }

  async sendEmail(templateName: string, to: string, data: any) {
    let parsedData = await this.email.renderAll(templateName, data);

    return this.mailService.sendMail({
      to,
      from: process.env.EMAIL_FROM,
      subject: parsedData.subject,
      text: parsedData.text,
      html: parsedData.html,
      context: data,
    });
  }

  async sendInviteEmail(
    to: string,
    code: string,
    companyName: string,
    senderName: string,
  ) {
    const registrationUrl = `${process.env.FE_BASE_URL}signup?code=${code}`;

    return this.sendEmail('invite', to, {
      companyName,
      senderName,
      registrationUrl,
    });
  }
}
