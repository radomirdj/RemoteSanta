import { Expose, Transform } from 'class-transformer';
import { GiftDateTypeEnum, GiftDateRecurrenceTypeEnum } from '@prisma/client';

export class GiftDateDto {
  @Expose()
  id: number;

  @Expose()
  type: GiftDateTypeEnum;

  @Expose()
  recurrenceType: GiftDateRecurrenceTypeEnum;

  @Expose()
  title: string;

  @Expose()
  enabled: boolean;

  //   @Transform(({ obj }) => obj.user.id)
  //   @Expose()
  //   userId: number;
}
