import { Controller, Param, Get } from '@nestjs/common';
import { GiftCardIntegrationsService } from './gift_card_integrations.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { GiftCardIntegrationDto } from './dtos/gift_card_integration.dto';

@Serialize(GiftCardIntegrationDto)
@Controller('gift-card-integrations')
export class GiftCardIntegrationsController {
  constructor(
    private giftCardIntegrationsService: GiftCardIntegrationsService,
  ) {}

  @Get('/:id')
  async getGiftCardIntegration(@Param('id') id: string) {
    return this.giftCardIntegrationsService.getOne(id);
  }

  @Get('/')
  async getGiftCardIntegrationList() {
    return this.giftCardIntegrationsService.getAll();
  }
}
