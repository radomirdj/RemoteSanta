import {
  IsInt,
  Min,
  Max,
  IsDateString,
  IsOptional,
  IsString,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { GenderEnum } from '.prisma/client';

export class SetPersonalDetailsCompletementStepDto {
  @IsDateString()
  @IsOptional()
  birthDate?: Date;

  @IsString()
  @IsEnum(GenderEnum)
  @IsNotEmpty()
  gender: GenderEnum;
}
