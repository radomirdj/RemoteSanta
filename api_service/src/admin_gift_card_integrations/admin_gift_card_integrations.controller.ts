import {
  UseGuards,
  Controller,
  Get,
  Param,
  ConsoleLogger,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin.guard';
import { PrismaService } from '../prisma/prisma.service';
import { GiftCardIntegrationsService } from '../gift_card_integrations/gift_card_integrations.service';
import { GiftCardThirdPartyApiService } from '../gift_card_third_party_api/gift_card_third_party_api.service';
import consts from '../utils/consts';
import { CheckGogiftIntegrationsDto } from './dtos/check_gogift_integrations.dto';
import { GiftCardIntegration } from '.prisma/client';

@Controller('admin/gift-card-integrations')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminGiftCardIntegrationsController {
  constructor(
    private giftCardIntegrationsService: GiftCardIntegrationsService,
    private giftCardThirdPartyApiService: GiftCardThirdPartyApiService,
    private prisma: PrismaService,
  ) {}
  @Get('/gogift-integrations/:countryCode')
  async getGiftCardRequest(@Param('countryCode') countryCode: string) {
    const gogiftIntegrationList =
      await this.giftCardThirdPartyApiService.getGiftCardIntegrationsExample(
        countryCode,
      );

    const gogiftIntegrationEmailList = gogiftIntegrationList.filter(
      (gogiftIntegration) =>
        gogiftIntegration.availableDeliveryMethods.includes(
          consts.gogiftConsts.deliveryMethods.EMAIL,
        ),
    );
    console.log(
      gogiftIntegrationList.length,
      gogiftIntegrationEmailList.length,
    );
    return gogiftIntegrationEmailList.map((gogiftIntegration) => ({
      id: gogiftIntegration.id,
      title: gogiftIntegration.title['en'],
      shortDescription: gogiftIntegration.shortDescription['en'],
    }));
  }

  @Post('/check-gogift-integrations/')
  async checkGogiftIntegrations(@Body() body: CheckGogiftIntegrationsDto) {
    const giftCardIntegrationList =
      await this.giftCardIntegrationsService.getAll(body.countryId);

    const validatePriceValues = (min, max, step, priceCounstrainJson) => {
      if (min === 'fail' || max === 'fail' || step === 'fail') return 'fail';
      for (let priceValue of priceCounstrainJson) {
        if (priceValue < min || priceValue > max) return 'fail';
        const stepCount = (priceValue - min) / (step * 1.0);
        if (!Number.isInteger(stepCount)) return 'fail';
      }
      return 'success';
    };

    let promiseList = [];
    for (let i = 0; i < giftCardIntegrationList.length; i++) {
      const giftCardIntegration = giftCardIntegrationList[i];
      const prepareElement = async (giftCardIntegration) => {
        const { sku, product, inventoryEntry } =
          await this.giftCardThirdPartyApiService.getProductSku(
            giftCardIntegration.gogiftId,
            giftCardIntegration.currency,
          );
        const currencyLower = giftCardIntegration.currency.toLowerCase();

        const minPrice = inventoryEntry.salesPriceMinNoTax
          ? inventoryEntry.salesPriceMinNoTax[currencyLower]
          : 'fail';

        const stepPrice = inventoryEntry.salesPriceStepNoTax
          ? inventoryEntry.salesPriceStepNoTax[currencyLower]
          : 'fail';

        const maxPrice = inventoryEntry.salesPriceMaxNoTax
          ? inventoryEntry.salesPriceMaxNoTax[currencyLower]
          : 'fail';

        return {
          id: giftCardIntegration.id,
          sku,
          title: giftCardIntegration.title,
          titleGoGift: product.title['en'],
          descGoGift: product.shortDescription['en'],
          priceConstraintType: giftCardIntegration.constraintType,
          priceConstraintJson: giftCardIntegration.constraintJson,
          priceValidationStatus: validatePriceValues(
            minPrice,
            maxPrice,
            stepPrice,
            giftCardIntegration.constraintJson,
          ),
          minPriceGoGift: minPrice,
          stepPriceGoGift: stepPrice,
          maxPriceGoGift: maxPrice,
        };
      };
      promiseList.push(prepareElement(giftCardIntegration));
    }

    return Promise.all(promiseList);
  }
}
