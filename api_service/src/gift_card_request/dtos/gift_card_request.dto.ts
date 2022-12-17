import { Expose, Transform } from 'class-transformer';
import { GiftCardRequestStatusEnum } from '@prisma/client';

export class GiftCardRequestDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  giftCardIntegrationId: string;

  @Expose()
  amount: string;

  @Expose()
  status: GiftCardRequestStatusEnum;
}
