import { Injectable, INestApplication, OnModuleInit } from '@nestjs/common';
import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
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

  async sendEmail(
    templateName: string,
    to: string | string[],
    data: any,
    attachment: { filename: string; buffer } = null,
  ) {
    let parsedData = await this.email.renderAll(templateName, data);

    const emailParams = {
      bcc: to,
      from: process.env.EMAIL_FROM,
      subject: parsedData.subject,
      text: parsedData.text,
      html: parsedData.html,
      context: data,
    } as ISendMailOptions;

    if (attachment) {
      emailParams.attachments = [
        {
          filename: attachment.filename,
          content: attachment.buffer,
        },
      ];
    }
    return this.mailService.sendMail(emailParams);
  }

  sendClaimPointsEmail(to: string[], claimPointsEventDescription: string) {
    return this.sendEmail('claim-points', to, {
      claimPointsEventDescription,
    });
  }

  async sendGiftCardDeclinedEmail(
    to: string,
    firstName: string,
    lastName: string,
    giftCardIntegrationTitle: string,
    adminComment: string,
  ) {
    return this.sendEmail('gift-card-request-declined', to, {
      firstName,
      lastName,
      giftCardIntegrationTitle,
      adminComment: adminComment,
    });
  }

  async sendGiftCardFullfiledEmail(
    to: string,
    firstName: string,
    lastName: string,
    giftCardIntegrationTitle: string,
    giftCardIntegrationCountryCode: string,
    attachment: { filename: string; buffer },
  ) {
    return this.sendEmail(
      'gift-card-request-fulfilled',
      to,
      {
        firstName,
        lastName,
        giftCardIntegrationTitle: `${giftCardIntegrationTitle}(${giftCardIntegrationCountryCode})`,
        fname: attachment.filename,
      },
      attachment,
    );
  }

  async sendInviteEmail(
    to: string,
    code: string,
    orgName: string,
    senderName: string,
  ) {
    const registrationUrl = `${process.env.FE_BASE_URL}signup?code=${code}`;

    return this.sendEmail('invite', to, {
      orgName,
      senderName,
      registrationUrl,
    });
  }

  async sendPointsEmail(
    to: string,
    message: string,
    orgName: string,
    firstName: string,
    amount: number,
  ) {
    return this.sendEmail('send-points', to, {
      message,
      orgName,
      firstName,
      loginUrl: `${process.env.FE_BASE_URL}login`,
      amount,
    });
  }

  async sendP2PPointsEmail(
    to: string,
    message: string,
    fromName: string,
    firstName: string,
    amount: number,
  ) {
    return this.sendEmail('send-p2p-points', to, {
      message,
      fromName,
      firstName,
      loginUrl: `${process.env.FE_BASE_URL}login`,
      amount,
    });
  }

  async sendAdminToOrgPointsEmail(
    to: string[],
    amount: number,
    orgName: string,
  ) {
    // const date = new Date().toJSON().slice(0, 10);

    return this.sendEmail('admin-to-org-pints', to, {
      amount,
      orgName,
      // date,
    });
  }

  async giftCardRequestCreatedEmail(
    to: string[],
    name: string,
    orgName: string,
  ) {
    return this.sendEmail('gift-card-request-created', to, {
      orgName,
      name,
    });
  }
}
