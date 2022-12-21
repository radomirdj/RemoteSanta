import {
  Injectable,
  NotFoundException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  User,
  GiftCardRequest,
  GiftCardRequestStatusEnum,
} from '@prisma/client';
import { FulfillGiftCardRequestDto } from './dtos/fulfill_giift_card_request.dto';
import { DeclineGiftCardRequestDto } from './dtos/decline_giift_card_request.dto';

@Injectable()
export class AdminGiftCardRequestsService {
  constructor(private prisma: PrismaService) {}

  async fulfillRequest(
    id: string,
    data: FulfillGiftCardRequestDto,
    admin: User,
  ): Promise<GiftCardRequest> {
    const giftCardRequest = await this.prisma.giftCardRequest.findUnique({
      where: { id },
    });
    if (!giftCardRequest)
      throw new NotFoundException('GiftCardRequest Not Found');

    if (giftCardRequest.status !== GiftCardRequestStatusEnum.PENDING) {
      throw new MethodNotAllowedException(
        'GiftCardRequest is not in PENDING state.',
      );
    }

    await this.prisma.giftCard.create({
      data: {
        ...data,
        giftCardRequest: {
          connect: {
            id,
          },
        },
        createdBy: {
          connect: {
            id: admin.id,
          },
        },
      },
    });

    return this.prisma.giftCardRequest.update({
      where: { id },
      data: { status: GiftCardRequestStatusEnum.COMPLETED },
    });
  }
  async declineRequest(
    id: string,
    data: DeclineGiftCardRequestDto,
  ): Promise<GiftCardRequest> {
    const giftCardRequest = await this.prisma.giftCardRequest.findUnique({
      where: { id },
    });
    if (!giftCardRequest)
      throw new NotFoundException('GiftCardRequest Not Found');

    if (giftCardRequest.status !== GiftCardRequestStatusEnum.PENDING) {
      throw new MethodNotAllowedException(
        'GiftCardRequest is not in PENDING state.',
      );
    }

    return this.prisma.giftCardRequest.update({
      where: { id },
      data: {
        status: GiftCardRequestStatusEnum.DECLINED,
        adminComment: data.adminComment,
      },
    });
  }

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
