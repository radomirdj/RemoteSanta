import { Expose, Transform, Type } from 'class-transformer';
import { GiftCardRequestStatusEnum } from '@prisma/client';
import { ValidateNested } from 'class-validator';

import { GiftCardIntegrationDto } from '../../gift_card_integrations/dtos/gift_card_integration.dto';
import { UserDto } from '../../users/dtos/user.dto';
export class GiftCardRequestDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  giftCardIntegrationId: string;

  @ValidateNested()
  @Expose()
  @Type(() => GiftCardIntegrationDto)
  giftCardIntegration: GiftCardIntegrationDto;

  @ValidateNested()
  @Expose()
  @Type(() => UserDto)
  user?: UserDto;

  @Expose()
  amount: string;

  @Expose()
  adminComment?: string;

  @Expose()
  createdAt: Date;

  @Expose()
  status: GiftCardRequestStatusEnum;
}
