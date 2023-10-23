import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';
import * as getCountryISO2 from 'country-iso-3-to-2';
import { PrismaService } from '../prisma/prisma.service';
import { LedgerService } from '../ledger/ledger.service';
import { GiftCardIntegrationsService } from '../gift_card_integrations/gift_card_integrations.service';
import { GiftCardThirdPartyApiService } from '../gift_card_third_party_api/gift_card_third_party_api.service';
import { CreateGiftCardRequestDto } from './dtos/create_gift_card_request.dto';
import { EmailsService } from '../emails/emails.service';
import consts from '../utils/consts';
import {
  User,
  GiftCardRequest,
  GiftCardRequestStatusEnum,
  GiftCardIntegration,
} from '@prisma/client';
import { UserDto } from '../users/dtos/user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class GiftCardRequestService {
  constructor(
    private prisma: PrismaService,
    private giftCardIntegrationsService: GiftCardIntegrationsService,
    private giftCardThirdPartyApiService: GiftCardThirdPartyApiService,
    private ledgerService: LedgerService,
    private emailsService: EmailsService,
    private usersService: UsersService,

    @InjectS3() private readonly s3: S3,
  ) {}

  async create(giftCardRequestDto: CreateGiftCardRequestDto, user: UserDto) {
    const {
      giftCardIntegrationId,
      sendToUserId,
      message = '',
      ...data
    } = giftCardRequestDto;
    let sendToUser;
    if (sendToUserId) {
      sendToUser = await this.usersService.findById(sendToUserId);
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

    let ownerEmail = user.email;
    let ownerName = user.firstName;
    if (sendToUserId) {
      ownerEmail = sendToUser.email;
      ownerName = sendToUser.firstName;
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
          message,
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
          message,
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

    if (integration.gogiftId) {
      await this.automaticFullfillGiftCardRequest(
        giftCardRequest,
        ownerName,
        ownerEmail,
        integration,
      );
    }
    return this.prisma.giftCardRequest.findUnique({
      where: { id: giftCardRequest.id },
    });
  }

  async automaticFullfillGiftCardRequest(
    giftCardRequest,
    ownerName: string,
    ownerEmail: string,
    integration: GiftCardIntegration,
  ) {
    const country = await this.prisma.country.findUnique({
      where: { id: integration.countryId },
    });
    try {
      console.log(
        '-------------------------GOGIFT AUTHOMATIC FULFILL GIFTCARD START--------------------------------------',
      );
      console.log('giftCardRequest: ', giftCardRequest.id);
      console.log('recipientEmail: ', ownerEmail);
      console.log('integration: ', integration.id);
      console.log('currency: ', integration.currency);
      console.log(
        'countryCode: ',
        country.countryCode,
        getCountryISO2(country.countryCode),
      );

      await this.giftCardThirdPartyApiService.fulfillGiftCard(
        integration.gogiftId,
        ownerEmail,
        ownerName,
        integration.currency,
        giftCardRequest.giftCardIntegrationCurrencyAmount,
        getCountryISO2(country.countryCode),
      );
      await this.prisma.$transaction(async (tx) => {
        await Promise.all([
          this.ledgerService.createGiftCardRequestCompletedTransaction(
            tx,
            giftCardRequest.createdById,
            giftCardRequest.amount,
            giftCardRequest.id,
          ),
          tx.giftCardRequest.update({
            where: { id: giftCardRequest.id },
            data: { status: GiftCardRequestStatusEnum.COMPLETED },
          }),
        ]);
      });

      console.log(
        '-------------------------GOGIFT AUTHOMATIC FULFILL GIFTCARD END----------------------------------------',
      );
    } catch (err) {
      console.log(
        err,
        '\n-------------------------GOGIFT AUTHOMATIC FULFILL GIFTCARD ERROR----------------------------------------',
      );
    }
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
