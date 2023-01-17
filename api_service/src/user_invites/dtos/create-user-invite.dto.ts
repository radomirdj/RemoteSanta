import { IsEmail } from 'class-validator';

export class CreateUserInviteDto {
  @IsEmail()
  email: string;
}
