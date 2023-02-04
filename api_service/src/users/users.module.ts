import { Module, MiddlewareConsumer } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailsModule } from '../emails/emails.module';
import { AwsCognitoService } from './aws-cognito/aws-cognito.service';
import { JwtStrategy } from './jwt.strategy';
import { LedgerModule } from '../ledger/ledger.module';

@Module({
  imports: [
    PrismaModule,
    LedgerModule,
    EmailsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, AwsCognitoService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {}
}
