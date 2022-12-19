import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  User,
  GiftCardRequest,
  GiftCardRequestStatusEnum,
} from '@prisma/client';

@Injectable()
export class AdminGiftCardRequestsService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string): Promise<GiftCardRequest> {
    const giftCardRequest = await this.prisma.giftCardRequest.findUnique({
      where: { id },
    });
    if (!giftCardRequest)
      throw new NotFoundException('GiftCardRequest Not Found');
    return giftCardRequest;
  }

  getPendingList(): Promise<GiftCardRequest[]> {
    return this.prisma.giftCardRequest.findMany({
      where: { status: GiftCardRequestStatusEnum.PENDING },
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
