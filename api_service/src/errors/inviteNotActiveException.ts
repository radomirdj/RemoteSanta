import { BadRequestException } from '@nestjs/common';

export class InviteNotActiveException extends BadRequestException {
  static defaultMessage = 'User invite is not active.';

  constructor(message?: string) {
    super(message || InviteNotActiveException.defaultMessage);
  }
}
