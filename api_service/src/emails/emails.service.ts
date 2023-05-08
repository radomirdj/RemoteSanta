import { Injectable, INestApplication, OnModuleInit } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SqsService } from '@ssut/nestjs-sqs';
import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
import * as Email from 'email-templates';
import { join } from 'path';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import addSQSFifoParams from '../utils/addSQSFifoParams';

@Injectable()
export class EmailsService {
  private readonly email;
  constructor(
    private mailService: MailerService,
    private readonly sqsService: SqsService,
  ) {
    this.email = new Email({
      views: {
        root: join(__dirname, 'templates'),
      },
    });
  }

  async sendEmailProcess(
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

  @SqsMessageHandler('email-send', false)
  async handleSendEmailMessage(message: AWS.SQS.Message) {
    const userInviteMessage: any = JSON.parse(message.Body) as SQSEmailMessage;
    await this.sendEmailProcess(
      userInviteMessage.templateName,
      userInviteMessage.to,
      userInviteMessage.data,
      userInviteMessage.attachment,
    );
  }

  @SqsMessageHandler('email-send-failed', false)
  async handleSendEmailFailedMessage(message: AWS.SQS.Message) {
    const userInviteMessage: any = JSON.parse(message.Body) as SQSEmailMessage;
    console.log(
      'EmailsService -> handleSendEmailFailedMessage -> userInviteMessage',
      userInviteMessage,
    );
  }

  async sendEmail(
    templateName: string,
    to: string | string[],
    data: any,
    attachment: { filename: string; buffer } = null,
  ) {
    const userInviteMessage = addSQSFifoParams({
      id: uuidv4(),
      body: {
        templateName,
        to,
        data,
        attachment,
      } as SQSEmailMessage,
    });
    const messageList = [userInviteMessage];
    await this.sqsService.send('email-send', messageList);
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

  // Doesn't add to queue, send directly
  async sendGiftCardFullfiledEmail(
    to: string,
    firstName: string,
    lastName: string,
    giftCardIntegrationTitle: string,
    attachment: { filename: string; buffer },
  ) {
    return this.sendEmailProcess(
      'gift-card-request-fulfilled',
      to,
      {
        firstName,
        lastName,
        giftCardIntegrationTitle,
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
  ) {
    return this.sendEmail('send-points', to, {
      message,
      orgName,
      firstName,
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
