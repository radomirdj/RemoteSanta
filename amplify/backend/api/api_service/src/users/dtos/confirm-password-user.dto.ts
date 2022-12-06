import { IsEmail, IsString, Matches } from 'class-validator';

export class ConfirmPasswordUserDto {
  @IsEmail()
  email: string;

  @IsString()
  confirmationCode: string;

  @IsString()
  newPassword: string;
}
