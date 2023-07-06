import {
  Injectable,
  NotFoundException,
  MethodNotAllowedException,
} from '@nestjs/common';
import * as randomstring from 'randomstring';
import { PrismaService } from '../prisma/prisma.service';
import {
  User,
  GiftCardRequest,
  GiftCardRequestStatusEnum,
} from '@prisma/client';
import { DeclineGiftCardRequestDto } from './dtos/decline_giift_card_request.dto';
import { LedgerService } from '../ledger/ledger.service';
import { EmailsService } from '../emails/emails.service';
import { userDefaultJoin } from '../users/users.service';
import { InjectS3, S3 } from 'nestjs-s3';
import { GiftCardRequestDto } from 'src/gift_card_request/dtos/gift_card_request.dto';

@Injectable()
export class AdminGiftCardRequestsService {
  constructor(
    private prisma: PrismaService,
    private ledgerService: LedgerService,
    private emailsService: EmailsService,
    @InjectS3() private readonly s3: S3,
  ) {}

  async fulfillRequest(
    id: string,
    admin: User,
    file: Express.Multer.File,
  ): Promise<GiftCardRequest> {
    const giftCardRequest = await this.prisma.giftCardRequest.findUnique({
      where: { id },
      include: {
        user: true,
        giftCardIntegration: {
          include: {
            country: true,
          },
        },
      },
    });
    if (!giftCardRequest)
      throw new NotFoundException('GiftCardRequest Not Found');

    if (giftCardRequest.status !== GiftCardRequestStatusEnum.PENDING) {
      throw new MethodNotAllowedException(
        'GiftCardRequest is not in PENDING state.',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const fileExt = file.originalname.split('.').pop();

      const fileName = `gift-card-${randomstring.generate(7)}.${fileExt}`;
      await this.s3
        .putObject({
          Body: file.buffer,
          Bucket: process.env.AWS_S3_BUCKET_GIFT_CARDS,
          Key: fileName,
        })
        .promise();

      const [rsp1, rsp2, giftCardRequestRsp] = await Promise.all([
        tx.giftCard.create({
          data: {
            fileName,
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
      await this.emailsService.sendGiftCardFullfiledEmail(
        giftCardRequest.user.email,
        giftCardRequest.user.firstName,
        giftCardRequest.user.lastName,
        giftCardRequest.giftCardIntegration.title,
        giftCardRequest.giftCardIntegration.country.countryCode,
        {
          filename: fileName,
          buffer: file.buffer,
        },
      );
      return giftCardRequestRsp;
    });
  }
  async declineRequest(
    id: string,
    data: DeclineGiftCardRequestDto,
  ): Promise<GiftCardRequest> {
    const giftCardRequest = await this.prisma.giftCardRequest.findUnique({
      where: { id },
      include: {
        user: true,
        giftCardIntegration: true,
      },
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
          giftCardRequest.user,
        ),
        tx.giftCardRequest.update({
          where: { id },
          data: {
            status: GiftCardRequestStatusEnum.DECLINED,
            adminComment: data.adminComment,
          },
        }),
      ]);
      await this.emailsService.sendGiftCardDeclinedEmail(
        giftCardRequest.user.email,
        giftCardRequest.user.firstName,
        giftCardRequest.user.lastName,
        giftCardRequest.giftCardIntegration.title,
        data.adminComment,
      );
      return giftCardRequestRsp;
    });
  }

  async getOne(id: string) {
    const giftCardRequest = await this.prisma.giftCardRequest.findUnique({
      where: { id },
      include: {
        giftCardIntegration: true,
        user: {
          include: userDefaultJoin,
        },
      },
    });
    if (!giftCardRequest)
      throw new NotFoundException('GiftCardRequest Not Found');
    const userBalance = await this.ledgerService.getUserBalance(
      giftCardRequest.user.id,
    );

    return {
      ...giftCardRequest,
      user: {
        ...giftCardRequest.user,
        userBalance,
      },
    };
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
