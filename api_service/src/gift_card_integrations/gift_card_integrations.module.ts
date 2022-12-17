import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GiftCardIntegrationsController } from './gift_card_integrations.controller';
import { GiftCardIntegrationsService } from './gift_card_integrations.service';

@Module({
  imports: [PrismaModule],
  controllers: [GiftCardIntegrationsController],
  providers: [GiftCardIntegrationsService],
  exports: [GiftCardIntegrationsService],
})
export class GiftCardIntegrationsModule {}
