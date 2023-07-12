import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';
import { PrismaService } from '../prisma/prisma.service';
import { LedgerService } from '../ledger/ledger.service';
import { GiftCardIntegrationsService } from '../gift_card_integrations/gift_card_integrations.service';
import { CreateGiftCardRequestDto } from './dtos/create_gift_card_request.dto';
import { EmailsService } from '../emails/emails.service';
import consts from '../utils/consts';

import {
  User,
  GiftCardRequest,
  GiftCardRequestStatusEnum,
} from '@prisma/client';
import { UserDto } from '../users/dtos/user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class GiftCardRequestService {
  constructor(
    private prisma: PrismaService,
    private giftCardIntegrationsService: GiftCardIntegrationsService,
    private ledgerService: LedgerService,
    private emailsService: EmailsService,
    private usersService: UsersService,

    @InjectS3() private readonly s3: S3,
  ) {}

  async create(giftCardRequestDto: CreateGiftCardRequestDto, user: UserDto) {
    const { giftCardIntegrationId, sendToUserId, ...data } = giftCardRequestDto;
    let sendToUser;
    if (sendToUserId) {
      sendToUser = this.usersService.findById(sendToUserId);
      if (!sendToUser) throw new NotFoundException('User Not Found');
    }
    const ownerId = sendToUserId || user.id;

    const [integration, __, org] = await Promise.all([
      this.giftCardIntegrationsService.validateIntegrationRequest(
        giftCardIntegrationId,
        data.amount,
        giftCardRequestDto.giftCardIntegrationCurrencyAmount,
        user.org.country,
      ),
      this.ledgerService.validateUserActiveBalance(user.id, data.amount),
      this.prisma.org.findUnique({
        where: { id: user.org.id },
      }),
    ]);

    const giftCardRequest = await this.prisma.$transaction(async (tx) => {
      const giftCardRequest = await tx.giftCardRequest.create({
        data: {
          ...data,
          giftCardIntegrationCurrencyAmount:
            giftCardRequestDto.giftCardIntegrationCurrencyAmount,
          status: GiftCardRequestStatusEnum.PENDING,
          giftCardIntegration: {
            connect: {
              id: giftCardIntegrationId,
            },
          },
          owner: {
            connect: {
              id: ownerId,
            },
          },
          createdBy: {
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

    // Send Emails
    const createdInfoEmailPromise =
      this.emailsService.giftCardRequestCreatedEmail(
        consts.adminRecepients,
        `${user.firstName} ${user.lastName}`,
        org.name,
      );

    if (sendToUserId) {
      await Promise.all([
        createdInfoEmailPromise,
        this.emailsService.giftCardRequestSentConfirmationSenderEmail(
          [user.email],
          user.firstName,
          sendToUser.firstName,
          giftCardRequestDto.giftCardIntegrationCurrencyAmount,
          integration.currency,
          integration.title,
          giftCardRequest.id,
        ),
        this.emailsService.giftCardRequestSentConfirmationRecepientEmail(
          [sendToUser.email],
          `${user.firstName} ${user.lastName}`,
          sendToUser.firstName,
          user.email,
          giftCardRequestDto.giftCardIntegrationCurrencyAmount,
          integration.currency,
          integration.title,
          giftCardRequest.id,
        ),
      ]);
    } else {
      await Promise.all([
        createdInfoEmailPromise,
        this.emailsService.giftCardRequestCreatedConfirmationEmail(
          [user.email],
          user.firstName,
          giftCardRequestDto.giftCardIntegrationCurrencyAmount,
          integration.currency,
          integration.title,
          giftCardRequest.id,
        ),
      ]);
    }

    return giftCardRequest;
  }

  async getOneByUser(id: string, userId: string): Promise<GiftCardRequest> {
    const giftCardRequest = await this.prisma.giftCardRequest.findUnique({
      where: { id },
      include: {
        giftCardIntegration: true,
      },
    });
    if (
      !giftCardRequest ||
      (giftCardRequest.ownerId !== userId &&
        giftCardRequest.createdById !== userId)
    )
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
    const giftCardRequest = await this.getOneByUser(id, userId);
    if (giftCardRequest.ownerId !== userId)
      throw new NotFoundException('GiftCardRequest Not Found');

    const giftCard = await this.prisma.giftCard.findUnique({
      where: { giftCardRequestId: id },
    });
    if (!giftCard) throw new NotFoundException('GiftCard Not Found');
    return giftCard.fileName;
  }

  getByUser(userId: string): Promise<GiftCardRequest[]> {
    return this.prisma.giftCardRequest.findMany({
      where: {
        OR: [{ createdById: userId }, { ownerId: userId }],
      },
      include: {
        giftCardIntegration: true,
        owner: true,
        createdBy: true,
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
