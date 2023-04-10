import {
  IsEmail,
  IsString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { UserInviteRoleEnum } from '@prisma/client';

export class CreateUserInviteDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsEnum(UserInviteRoleEnum)
  @IsOptional()
  userRole?: UserInviteRoleEnum;
}
