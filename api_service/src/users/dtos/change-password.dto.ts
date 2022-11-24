import { IsEmail, IsString } from 'class-validator';

export class ChangePasswordUserDto {
  @IsEmail()
  email: string;

  @IsString()
  currentPassword: string;

  @IsString()
  newPassword: string;
}
