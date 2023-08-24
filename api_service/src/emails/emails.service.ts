import { Injectable, INestApplication, OnModuleInit } from '@nestjs/common';
import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
import * as Email from 'email-templates';
import * as randomstring from 'randomstring';
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
    replyTo: string = null,
  ) {
    let parsedData = await this.email.renderAll(templateName, data);

    const emailParams = {
      bcc: to,
      from: process.env.EMAIL_FROM,
      subject: parsedData.subject,
      text: parsedData.text,
      html: parsedData.html,
      context: data,
      replyTo: replyTo || 'info@remotesanta.io',
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

  sendClaimPointsMonthEmail(
    to: string[],
    orgName: string,
    month: string,
    sentenceOfMonth: string,
    pointsAmount: number,
  ) {
    return this.sendEmail('claim-points-month', to, {
      orgName,
      month,
      sentenceOfMonth,
      pointsAmount,
      loginUrl: `${process.env.FE_BASE_URL}login`,
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

  async sendGiftCardDeclinedRecepientEmail(
    to: string,
    firstNameRecipient: string,
    firstNameSender: string,
    giftCardIntegrationTitle: string,
    adminComment: string,
  ) {
    return this.sendEmail('gift-card-request-declined-recepient', to, {
      firstNameRecipient,
      firstNameSender,
      giftCardIntegrationTitle,
      adminComment: adminComment,
    });
  }

  async sendGiftCardDeclinedSenderEmail(
    to: string,
    firstNameRecipient: string,
    firstNameSender: string,
    giftCardIntegrationTitle: string,
    adminComment: string,
  ) {
    return this.sendEmail('gift-card-request-declined-sender', to, {
      firstNameRecipient,
      firstNameSender,
      giftCardIntegrationTitle,
      adminComment: adminComment,
    });
  }

  async sendGiftCardFullfiledEmail(
    to: string,
    firstName: string,
    giftCardIntegrationTitle: string,
    giftCardIntegrationCountryCode: string,
    amount: number,
    currency: string,
    giftCardRequestId,
    attachment: { filename: string; buffer },
  ) {
    return this.sendEmail(
      'gift-card-request-fulfilled',
      to,
      {
        firstName,
        storeName: giftCardIntegrationTitle,
        storeCountryCode: giftCardIntegrationCountryCode,
        amount,
        currency,
        orderNumber: giftCardRequestId.slice(-8),
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
      randomIdentifier: randomstring.generate(7),
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
      randomIdentifier: randomstring.generate(7),
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

  async giftCardRequestCreatedConfirmationEmail(
    to: string[],
    firstName: string,
    amount: number,
    currency: string,
    storeName: string,
    giftCardRequestId: string,
  ) {
    return this.sendEmail('gift-card-request-created-confirmation', to, {
      firstName,
      amount,
      currency,
      storeName,
      orderNumber: giftCardRequestId.slice(-8),
    });
  }

  async giftCardRequestSentConfirmationSenderEmail(
    to: string[],
    firstNameSender: string,
    firstNameRecipient: string,
    amount: number,
    currency: string,
    storeName: string,
    giftCardRequestId: string,
    personalizedMessage: string,
  ) {
    return this.sendEmail('gift-card-request-sent-confirmation-sender', to, {
      firstNameSender,
      firstNameRecipient,
      amount,
      currency,
      storeName,
      orderNumber: giftCardRequestId.slice(-8),
      personalizedMessage,
    });
  }

  async giftCardRequestSentConfirmationRecepientEmail(
    to: string[],
    firstNameSender: string,
    firstNameRecipient: string,
    senderEmail: string,
    amount: number,
    currency: string,
    storeName: string,
    giftCardRequestId: string,
    personalizedMessage: string,
  ) {
    return this.sendEmail(
      'gift-card-request-sent-confirmation-recepient',
      to,
      {
        firstNameSender,
        firstNameRecipient,
        amount,
        currency,
        storeName,
        orderNumber: giftCardRequestId.slice(-8),
        personalizedMessage,
      },
      null,
      senderEmail,
    );
  }

  async purchasePointsRequestToAdminEmail(
    to: string[],
    userId: string,
    firstName: string,
    lastName: string,
    orgName: string,
    orgId: string,
    amount: number,
  ) {
    return this.sendEmail('purchase_points_request_to_admin', to, {
      userId,
      firstName,
      lastName,
      orgName,
      orgId,
      amount,
      randomIdentifier: randomstring.generate(7),
    });
  }

  async birthdayConfigCompletementStepToAdminEmail(
    to: string[],
    userId: string,
    firstName: string,
    lastName: string,
    orgName: string,
    orgId: string,
    preferredMeetingPlatform: string,
    preferredTimeDetails: string,
    bugetInPoints: number,
  ) {
    return this.sendEmail('birthday_config_completement_step_to_admin', to, {
      userId,
      firstName,
      lastName,
      orgName,
      orgId,
      preferredMeetingPlatform,
      preferredTimeDetails,
      bugetInPoints,
      randomIdentifier: randomstring.generate(7),
    });
  }
}
