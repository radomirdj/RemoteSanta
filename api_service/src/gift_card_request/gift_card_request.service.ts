import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';
import { PrismaService } from '../prisma/prisma.service';
import { LedgerService } from '../ledger/ledger.service';
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
    private ledgerService: LedgerService,
    @InjectS3() private readonly s3: S3,
  ) {}

  async create(giftCardRequestDto: CreateGiftCardRequestDto, user: User) {
    const { giftCardIntegrationId, ...data } = giftCardRequestDto;
    await Promise.all([
      this.giftCardIntegrationsService.validateIntegrationRequest(
        giftCardIntegrationId,
        data.amount,
      ),
      this.ledgerService.validateUserActiveBalance(user.id, data.amount),
    ]);

    return this.prisma.$transaction(async (tx) => {
      const giftCardRequest = await tx.giftCardRequest.create({
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

      await this.ledgerService.createGiftCardRequestCreatedTransaction(
        tx,
        user.id,
        data.amount,
        giftCardRequest.id,
      );
      return giftCardRequest;
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

  // getGiftCardSignedUrl(filename: string): string {
  //   return this.s3.getSignedUrl('getObject', {
  //     Bucket: process.env.AWS_S3_BUCKET_GIFT_CARDS,
  //     Key: filename,
  //   });
  // }

  getGiftCardFileStream(filename: string) {
    return this.s3
      .getObject({
        Bucket: process.env.AWS_S3_BUCKET_GIFT_CARDS,
        Key: filename,
      })
      .createReadStream();
  }

  async getGiftCardRequestFileName(id: string, userId: string) {
    await this.getOneByUser(id, userId);
    const giftCard = await this.prisma.giftCard.findUnique({
      where: { giftCardRequestId: id },
    });
    if (!giftCard) throw new NotFoundException('GiftCard Not Found');
    return giftCard.fileName;
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
