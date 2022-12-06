import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from './users.service';
import JwtValuesService from './jwt-values.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super(JwtValuesService.getJWTConstructorValues());
  }

  async validate(payload: any) {
    if (!payload.sub) {
      return null;
    }
    return this.usersService.findBySub(payload.sub);
  }
}
