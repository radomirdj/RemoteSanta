import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class OrgUserSignupDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;
}
