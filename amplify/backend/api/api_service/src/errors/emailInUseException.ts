import { BadRequestException } from '@nestjs/common';

export class EmailInUseException extends BadRequestException {
  static defaultMessage = 'Email in use';

  constructor(message?: string) {
    super(message || EmailInUseException.defaultMessage);
  }
}
