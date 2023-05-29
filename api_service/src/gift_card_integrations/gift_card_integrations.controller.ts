import { Controller, Param, Get, UseGuards, Query } from '@nestjs/common';
import { GiftCardIntegrationsService } from './gift_card_integrations.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { GiftCardIntegrationDto } from './dtos/gift_card_integration.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../users/dtos/user.dto';

@Serialize(GiftCardIntegrationDto)
@UseGuards(AuthGuard('jwt'))
@Controller('gift-card-integrations')
export class GiftCardIntegrationsController {
  constructor(
    private giftCardIntegrationsService: GiftCardIntegrationsService,
  ) {}

  @Get('/:id')
  async getGiftCardIntegration(
    @Param('id') id: string,
    @CurrentUser() user: UserDto,
  ) {
    return this.giftCardIntegrationsService.getOne(id, user.org.country.id);
  }

  @Get('/')
  async getGiftCardIntegrationList(@Query() query) {
    return this.giftCardIntegrationsService.getAll(query.country);
  }
}
