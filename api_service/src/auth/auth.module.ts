import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailsModule } from '../emails/emails.module';
import { LedgerModule } from '../ledger/ledger.module';
import { UsersModule } from '../users/users.module';
import { AdminUsersModule } from '../admin_users/admin_users.module';
import { AdminOrgsModule } from '../admin_orgs/admin_orgs.module';
import { CompletementStepsModule } from '../completement_steps/completement_steps.module';

@Module({
  imports: [
    PrismaModule,
    LedgerModule,
    EmailsModule,
    UsersModule,
    AdminUsersModule,
    AdminOrgsModule,
    CompletementStepsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UsersController],
  providers: [AuthService],
})
export class AuthModule {}
