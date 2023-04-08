import { Injectable, NotFoundException } from '@nestjs/common';
import {
  GiftCardIntegration,
  IntegrationConsraintTypeEnum,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AmountFailsCounstraintException } from '../errors/amountFailsCounstraintException';

interface MinMaxConstraintInterface {
  MIN: number;
  MAX: number;
}

@Injectable()
export class GiftCardIntegrationsService {
  constructor(private prisma: PrismaService) {}

  async validateIntegrationRequest(
    giftCardIntegrationId: string,
    amount: number,
    countryId: string,
  ) {
    const integration = await this.getOne(giftCardIntegrationId, countryId);

    switch (integration.constraintType) {
      case IntegrationConsraintTypeEnum.MIN_MAX:
        const minMaxConstraint =
          integration.constraintJson as unknown as MinMaxConstraintInterface;

        if (amount < minMaxConstraint.MIN || amount > minMaxConstraint.MAX) {
          throw new AmountFailsCounstraintException();
        }
        return;

      default:
        throw new AmountFailsCounstraintException();
    }
  }

  async getOne(id: string, countryId: string): Promise<GiftCardIntegration> {
    const integrationDto = await this.prisma.giftCardIntegration.findUnique({
      where: { id },
    });
    if (!integrationDto || integrationDto.countryId !== countryId)
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
