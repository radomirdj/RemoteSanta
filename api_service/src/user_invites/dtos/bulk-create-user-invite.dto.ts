import {
  IsEmail,
  IsString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ArrayMinSize,
  IsArray,
  ArrayMaxSize,
} from 'class-validator';
import { UserInviteRoleEnum } from '@prisma/client';

export class BulkCreateUserInviteDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(1000)
  @IsEmail({}, { each: true })
  emailList: string[];
}
