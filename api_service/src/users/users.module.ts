import { Module, MiddlewareConsumer } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailsModule } from '../emails/emails.module';
import { AwsCognitoService } from './aws-cognito/aws-cognito.service';
import { JwtStrategy } from './jwt.strategy';
import { LedgerModule } from '../ledger/ledger.module';

@Module({
  imports: [PrismaModule, EmailsModule],
  providers: [UsersService, AwsCognitoService, JwtStrategy],
  exports: [UsersService, AwsCognitoService, JwtStrategy],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {}
}
