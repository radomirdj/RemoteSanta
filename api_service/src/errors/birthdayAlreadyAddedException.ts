import { BadRequestException } from '@nestjs/common';

export class BirthdayAlreadyAddedException extends BadRequestException {
  static defaultMessage =
    'Birthday alreade added. Please delete it and add right one.';

  constructor(message?: string) {
    super(message || BirthdayAlreadyAddedException.defaultMessage);
  }
}
