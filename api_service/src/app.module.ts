import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { consumers } from 'stream';
import { ConfigModule, ConfigService } from '@nestjs/config';

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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    ReportsModule,
    PrismaModule,
    GiftDatesModule,
    GiftCardIntegrationsModule,
    GiftCardRequestModule,
    AdminGiftCardRequestsModule,
    ClaimPointsEventsModule,
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
