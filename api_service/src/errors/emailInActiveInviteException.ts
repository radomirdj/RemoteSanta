import { BadRequestException } from '@nestjs/common';

export class EmailInActiveInviteException extends BadRequestException {
  static defaultMessage = 'Invite with email exists, please resend or cancel.';

  constructor(message?: string) {
    super(message || EmailInActiveInviteException.defaultMessage);
  }
}
