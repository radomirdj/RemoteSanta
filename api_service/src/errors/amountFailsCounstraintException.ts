import { BadRequestException } from '@nestjs/common';

export class AmountFailsCounstraintException extends BadRequestException {
  static defaultMessage = 'Amount fails gift card integration constraaint.';

  constructor(message?: string) {
    super(message || AmountFailsCounstraintException.defaultMessage);
  }
}
