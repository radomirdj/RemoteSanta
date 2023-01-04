import { BadRequestException } from '@nestjs/common';

export class NotEnoughBalanceException extends BadRequestException {
  static defaultMessage = "There's not enough balance to perform this action.";

  constructor(message?: string) {
    super(message || NotEnoughBalanceException.defaultMessage);
  }
}
