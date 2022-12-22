import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GiftCardIntegrationsService } from '../gift_card_integrations/gift_card_integrations.service';
import { CreateGiftCardRequestDto } from './dtos/create_gift_card_request.dto';
import {
  User,
  GiftCardRequest,
  GiftCardRequestStatusEnum,
} from '@prisma/client';

@Injectable()
export class GiftCardRequestService {
  constructor(
    private prisma: PrismaService,
    private giftCardIntegrationsService: GiftCardIntegrationsService,
  ) {}
  async create(giftCardRequestDto: CreateGiftCardRequestDto, user: User) {
    const { giftCardIntegrationId, ...data } = giftCardRequestDto;
    await this.giftCardIntegrationsService.validateIntegrationRequest(
      giftCardIntegrationId,
      data.amount,
    );
    return this.prisma.giftCardRequest.create({
      data: {
        ...data,
        status: GiftCardRequestStatusEnum.PENDING,
        giftCardIntegration: {
          connect: {
            id: giftCardIntegrationId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async getOneByUser(id: string, userId: string): Promise<GiftCardRequest> {
    const giftCardRequest = await this.prisma.giftCardRequest.findUnique({
      where: { id },
      include: {
        giftCardIntegration: true,
      },
    });
    if (!giftCardRequest || giftCardRequest.userId !== userId)
      throw new NotFoundException('GiftCardRequest Not Found');
    return giftCardRequest;
  }

  getByUser(userId: string): Promise<GiftCardRequest[]> {
    return this.prisma.giftCardRequest.findMany({
      where: { userId },
      include: {
        giftCardIntegration: true,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          updatedAt: 'desc',
        },
      ],
    });
  }
}
