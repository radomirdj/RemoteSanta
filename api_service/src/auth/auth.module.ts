import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailsModule } from '../emails/emails.module';
import { LedgerModule } from '../ledger/ledger.module';
import { UsersModule } from '../users/users.module';
import { AdminOrgsModule } from '../admin_orgs/admin_orgs.module';
@Module({
  imports: [
    PrismaModule,
    LedgerModule,
    EmailsModule,
    UsersModule,
    AdminOrgsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UsersController],
  providers: [AuthService],
})
export class AuthModule {}
