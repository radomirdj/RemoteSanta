import { UnauthorizedException } from '@nestjs/common';

export class LoginCredentialsWrongException extends UnauthorizedException {
  static defaultMessage = 'Login Credentials Not Valid';

  constructor(message?: string) {
    super(message || LoginCredentialsWrongException.defaultMessage);
  }
}
