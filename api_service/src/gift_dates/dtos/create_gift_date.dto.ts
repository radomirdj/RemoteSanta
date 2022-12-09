import {
  IsString,
  IsEnum,
  IsOptional,
  ValidateIf,
  IsNotEmpty,
} from 'class-validator';
import { GiftDateTypeEnum, GiftDateRecurrenceTypeEnum } from '@prisma/client';

export class CreateGiftDateDto {
  @IsString()
  @IsEnum(GiftDateTypeEnum)
  type: GiftDateTypeEnum;

  @ValidateIf((o) => o.type !== GiftDateTypeEnum.BIRTHDAY)
  @IsString()
  @IsEnum(GiftDateRecurrenceTypeEnum)
  @IsNotEmpty()
  recurrenceType: GiftDateRecurrenceTypeEnum;

  @ValidateIf((o) => o.type !== GiftDateTypeEnum.BIRTHDAY)
  @IsString()
  @IsNotEmpty()
  title: string;
}
