import { Expose, Transform } from 'class-transformer';
import { GiftDateTypeEnum, GiftDateRecurrenceTypeEnum } from '@prisma/client';

export class GiftDateDto {
  @Expose()
  id: string;

  @Expose()
  type: GiftDateTypeEnum;

  @Expose()
  recurrenceType: GiftDateRecurrenceTypeEnum;

  @Expose()
  title: string;

  @Expose()
  enabled: boolean;

  @Expose()
  firstAccuranceDate: Date;

  @Expose()
  userId: string;
}
