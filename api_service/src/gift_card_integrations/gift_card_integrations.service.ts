import { Injectable, NotFoundException } from '@nestjs/common';
import {
  GiftCardIntegration,
  IntegrationConsraintTypeEnum,
  Country,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AmountFailsCounstraintException } from '../errors/amountFailsCounstraintException';
import { CurrencyRatesService } from '../currency_rates/currency_rates.service';

interface MinMaxConstraintInterface {
  MIN: number;
  MAX: number;
}

@Injectable()
export class GiftCardIntegrationsService {
  constructor(
    private prisma: PrismaService,
    private currencyRatesService: CurrencyRatesService,
  ) {}

  async validateIntegrationRequest(
    giftCardIntegrationId: string,
    amount: number,
    giftCardIntegrationCurrencyAmount: number,
    pointsCountry: Country,
  ) {
    const integration = await this.getOne(giftCardIntegrationId);
    const pointsToCurrencyConversionRate =
      await this.currencyRatesService.getPointsToCurrencyConversionRate(
        pointsCountry,
        integration.currency,
      );

    const recalculatedGiftCardIntegrationCurrencyAmount =
      amount * pointsToCurrencyConversionRate;

    if (
      recalculatedGiftCardIntegrationCurrencyAmount + 0.000001 <
        giftCardIntegrationCurrencyAmount ||
      giftCardIntegrationCurrencyAmount + 2 <
        recalculatedGiftCardIntegrationCurrencyAmount
    ) {
      throw new AmountFailsCounstraintException();
    }

    switch (integration.constraintType) {
      case IntegrationConsraintTypeEnum.MIN_MAX:
        const minMaxConstraint =
          integration.constraintJson as unknown as MinMaxConstraintInterface;

        if (
          giftCardIntegrationCurrencyAmount < minMaxConstraint.MIN ||
          giftCardIntegrationCurrencyAmount > minMaxConstraint.MAX
        ) {
          throw new AmountFailsCounstraintException();
        }
        return integration;

      case IntegrationConsraintTypeEnum.LIST:
        const listConstraint =
          integration.constraintJson as unknown as number[];
        const foundElement = listConstraint.find(
          (listConstraintElement) =>
            Math.abs(
              giftCardIntegrationCurrencyAmount - listConstraintElement,
            ) < Number.EPSILON,
        );

        if (!foundElement) throw new AmountFailsCounstraintException();
        return integration;

      default:
        throw new AmountFailsCounstraintException();
    }
  }

  async getOne(id: string): Promise<GiftCardIntegration> {
    const integrationDto = await this.prisma.giftCardIntegration.findUnique({
      where: { id },
    });
    if (!integrationDto)
      throw new NotFoundException('GiftCardIntegration Not Found');
    return integrationDto;
  }

  async getAll(countryId: string): Promise<GiftCardIntegration[]> {
    return this.prisma.giftCardIntegration.findMany({
      where: { countryId },
      orderBy: [
        {
          priority: 'asc',
        },
      ],
    });
  }
}
