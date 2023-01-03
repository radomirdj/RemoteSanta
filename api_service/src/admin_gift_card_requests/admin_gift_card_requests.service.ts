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
import { LedgerService } from '../ledger/ledger.service';

@Injectable()
export class AdminGiftCardRequestsService {
  constructor(
    private prisma: PrismaService,
    private ledgerService: LedgerService,
  ) {}

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

    return this.prisma.$transaction(async (tx) => {
      const [rsp1, rsp2, giftCardRequestRsp] = await Promise.all([
        tx.giftCard.create({
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
        }),
        this.ledgerService.createGiftCardRequestCompletedTransaction(
          tx,
          giftCardRequest.userId,
          giftCardRequest.amount,
          giftCardRequest.id,
        ),
        tx.giftCardRequest.update({
          where: { id },
          data: { status: GiftCardRequestStatusEnum.COMPLETED },
        }),
      ]);
      return giftCardRequestRsp;
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

    return this.prisma.$transaction(async (tx) => {
      const [rsp1, giftCardRequestRsp] = await Promise.all([
        this.ledgerService.createGiftCardRequestDeclinedTransaction(
          tx,
          giftCardRequest.userId,
          giftCardRequest.amount,
          giftCardRequest.id,
        ),
        tx.giftCardRequest.update({
          where: { id },
          data: {
            status: GiftCardRequestStatusEnum.DECLINED,
            adminComment: data.adminComment,
          },
        }),
      ]);
      return giftCardRequestRsp;
    });
  }

  async getOne(id: string): Promise<GiftCardRequest> {
    const giftCardRequest = await this.prisma.giftCardRequest.findUnique({
      where: { id },
      include: {
        giftCardIntegration: true,
      },
    });
    if (!giftCardRequest)
      throw new NotFoundException('GiftCardRequest Not Found');
    return giftCardRequest;
  }

  getPendingList(): Promise<GiftCardRequest[]> {
    return this.prisma.giftCardRequest.findMany({
      where: { status: GiftCardRequestStatusEnum.PENDING },
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
