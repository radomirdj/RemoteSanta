import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { consumers } from 'stream';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Module } from 'nestjs-s3';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { GiftDatesModule } from './gift_dates/gift_dates.module';
import { GiftCardIntegrationsModule } from './gift_card_integrations/gift_card_integrations.module';
import { GiftCardRequestModule } from './gift_card_request/gift_card_request.module';
import { AdminGiftCardRequestsModule } from './admin_gift_card_requests/admin_gift_card_requests.module';
import { ClaimPointsEventsModule } from './claim_points_events/claim_points_events.module';
import { AdminOrgsModule } from './admin_orgs/admin_orgs.module';
import { LedgerModule } from './ledger/ledger.module';
import { AdminUsersModule } from './admin_users/admin_users.module';
import { OrgsModule } from './orgs/orgs.module';
import { UserInvitesModule } from './user_invites/user_invites.module';
import { AdminUserInvitesModule } from './admin_user_invites/admin_user_invites.module';
import { EmailsModule } from './emails/emails.module';
import { AuthModule } from './auth/auth.module';
import { CompletementStepsModule } from './completement_steps/completement_steps.module';
import { SqsUserInvitesModule } from './sqs_user_invites/sqs_user_invites.module';
import { WorkerUserInvitesModule } from './worker_user_invites/worker_user_invites.module';
import { CurrencyRatesModule } from './currency_rates/currency_rates.module';
import { GiftCardThirdPartyApiModule } from './gift_card_third_party_api/gift_card_third_party_api.module';
import { PaymentsModule } from './payments/payments.module';
import { AdminGiftCardIntegrationsModule } from './admin_gift_card_integrations/admin_gift_card_integrations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    S3Module.forRootAsync({
      useFactory: () => ({
        config: {
          accessKeyId: process.env.AWS_S3_ACCESS_KEY || '',
          secretAccessKey: process.env.AWS_S3_SECRET_KEY || '',
          endpoint: process.env.AWS_S3_ENDPOINT,
          s3ForcePathStyle: true,
          signatureVersion: 'v4',
        },
      }),
    }),
    UsersModule,
    ReportsModule,
    PrismaModule,
    GiftDatesModule,
    GiftCardIntegrationsModule,
    GiftCardRequestModule,
    AdminGiftCardRequestsModule,
    ClaimPointsEventsModule,
    AdminOrgsModule,
    LedgerModule,
    AdminUsersModule,
    OrgsModule,
    UserInvitesModule,
    AdminUserInvitesModule,
    EmailsModule,
    AuthModule,
    CompletementStepsModule,
    SqsUserInvitesModule,
    WorkerUserInvitesModule,
    CurrencyRatesModule,
    GiftCardThirdPartyApiModule,
    PaymentsModule,
    AdminGiftCardIntegrationsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        // We don't allow additional properties!!!
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {}
}
