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
import { SetRequestTimeout } from '../interceptors/timeout.interceptor';

@Controller('admin/gift-card-integrations')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminGiftCardIntegrationsController {
  constructor(
    private giftCardIntegrationsService: GiftCardIntegrationsService,
    private giftCardThirdPartyApiService: GiftCardThirdPartyApiService,
    private prisma: PrismaService,
  ) {}
  @Get('/gogift-integrations/:countryCode')
  @SetRequestTimeout(300000)
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
    /*
    // MORE DETAILS IN RESPONSE NEEDED FOR SEED GENERATING!!!
    const CURRENCY = 'EUR';
    const currencyLower = 'eur';

    const promiseList = gogiftIntegrationEmailList.map(
      async (gogiftIntegration) => {
        try {
          const { sku, product, inventoryEntry } =
            await this.giftCardThirdPartyApiService.getProductSku(
              gogiftIntegration.id,
              CURRENCY,
            );
          const minPrice =
            inventoryEntry && inventoryEntry.salesPriceMinNoTax
              ? inventoryEntry.salesPriceMinNoTax[currencyLower]
              : 'fail';

          const stepPrice =
            inventoryEntry && inventoryEntry.salesPriceStepNoTax
              ? inventoryEntry.salesPriceStepNoTax[currencyLower]
              : 'fail';

          const maxPrice =
            inventoryEntry && inventoryEntry.salesPriceMaxNoTax
              ? inventoryEntry.salesPriceMaxNoTax[currencyLower]
              : 'fail';

          const rspEl = {
            id: product.id,
            sku,
            titleGoGift: product.title['en'],
            descGoGift: product.shortDescription['en'],
            minPriceGoGift: minPrice,
            stepPriceGoGift: stepPrice,
            maxPriceGoGift: maxPrice,
          };
          return rspEl;
        } catch (err) {
          console.log(
            'AdminGiftCardIntegrationsController -> getGiftCardRequest -> err',
            err,
          );
          return null;
        }
      },
    );
    const rspList = await Promise.all(promiseList);

    return rspList.filter((rsp) => rsp);
    */
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
        try {
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
        } catch (err) {
          console.log(
            'AdminGiftCardIntegrationsController -> prepareElement -> err',
            err,
          );
          return {
            id: giftCardIntegration.id,
            status: 'fail',
          };
        }
      };
      promiseList.push(prepareElement(giftCardIntegration));
    }

    return Promise.all(promiseList);
  }
}
