import { Controller, Param, Get, UseGuards, Query } from '@nestjs/common';
import { GiftCardIntegrationsService } from './gift_card_integrations.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { GiftCardIntegrationDto } from './dtos/gift_card_integration.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../users/dtos/user.dto';
import { CurrencyRatesService } from '../currency_rates/currency_rates.service';

@Serialize(GiftCardIntegrationDto)
@UseGuards(AuthGuard('jwt'))
@Controller('gift-card-integrations')
export class GiftCardIntegrationsController {
  constructor(
    private giftCardIntegrationsService: GiftCardIntegrationsService,
    private currencyRatesService: CurrencyRatesService,
  ) {}

  @Get('/:id')
  async getGiftCardIntegration(
    @Param('id') id: string,
    @CurrentUser() user: UserDto,
  ) {
    const integration = await this.giftCardIntegrationsService.getOne(id);
    const pointsToCurrencyConversionRate =
      await this.currencyRatesService.getPointsToCurrencyConversionRate(
        user.org.country,
        integration.currency,
      );
    return {
      ...integration,
      pointsToCurrencyConversionRate,
    };
  }

  @Get('/')
  async getGiftCardIntegrationList(@Query() query) {
    return this.giftCardIntegrationsService.getAll(query.country);
  }
}
