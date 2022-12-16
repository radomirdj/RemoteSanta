import {
  IsString,
  IsEmail,
  IsDateString,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { GenderEnum } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  birthDate: Date;

  @IsString()
  @IsEnum(GenderEnum)
  @IsNotEmpty()
  gender: GenderEnum;
}
