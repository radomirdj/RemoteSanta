import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailsService {
  constructor() {}

  sendClaimPointsEmail(to: string[], claimPointsEventDescription: string) {}

  async sendGiftCardDeclinedEmail(
    to: string,
    firstName: string,
    lastName: string,
    giftCardIntegrationTitle: string,
    adminComment: string,
  ) {}

  // Doesn't add to queue, send directly
  async sendGiftCardFullfiledEmail(
    to: string,
    firstName: string,
    lastName: string,
    giftCardIntegrationTitle: string,
    attachment: { filename: string; buffer },
  ) {}

  async sendInviteEmail(
    to: string,
    code: string,
    orgName: string,
    senderName: string,
  ) {}

  async sendPointsEmail(
    to: string,
    message: string,
    orgName: string,
    firstName: string,
  ) {}

  async sendAdminToOrgPointsEmail(
    to: string[],
    amount: number,
    orgName: string,
  ) {}

  async giftCardRequestCreatedEmail(
    to: string[],
    name: string,
    orgName: string,
  ) {}
}
