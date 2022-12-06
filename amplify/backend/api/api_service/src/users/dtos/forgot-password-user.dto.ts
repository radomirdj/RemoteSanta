import { IsEmail } from 'class-validator';

export class ForgotPasswordUserDto {
  @IsEmail()
  email: string;
}
