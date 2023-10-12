import { IsString, IsNotEmpty, IsEmail, IsUUID } from 'class-validator';

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
  @IsUUID()
  countryId: string;

  @IsString()
  @IsNotEmpty()
  orgName: string;

  @IsString()
  referralCode: string;
}
