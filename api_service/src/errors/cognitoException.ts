import { BadRequestException } from '@nestjs/common';

export class CognitoException extends BadRequestException {
  static defaultMessage = '';

  constructor(message?: string) {
    super(message || CognitoException.defaultMessage);
  }
}
