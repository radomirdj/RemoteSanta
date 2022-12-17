import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGiftCardRequestDto } from './dtos/create_gift_card_request.dto';
import {
  User,
  GiftCardRequest,
  GiftCardRequestStatusEnum,
} from '@prisma/client';

@Injectable()
export class GiftCardRequestService {
  constructor(private prisma: PrismaService) {}
  create(giftCardRequestDto: CreateGiftCardRequestDto, user: User) {
    const { giftCardIntegrationId, ...data } = giftCardRequestDto;
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
    });
    if (!giftCardRequest || giftCardRequest.userId !== userId)
      throw new NotFoundException('GiftCardRequest Not Found');
    return giftCardRequest;
  }

  getByUser(userId: string): Promise<GiftCardRequest[]> {
    return this.prisma.giftCardRequest.findMany({
      where: { userId },
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
