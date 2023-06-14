import {
  IsString,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { GenderEnum } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  code: string;

  @IsString()
  @IsUUID()
  countryId: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  @IsOptional()
  birthDate?: Date;

  @IsString()
  @IsEnum(GenderEnum)
  @IsNotEmpty()
  gender: GenderEnum;
}
