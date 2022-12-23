import { Expose, Type } from 'class-transformer';
import { GenderEnum, UserRoleEnum } from '@prisma/client';
import { OrgDto } from './org.dto';
import { ValidateNested } from 'class-validator';
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  accessToken: string;

  @Expose()
  birthDate: Date;

  @Expose()
  gender: GenderEnum;

  @Expose()
  userRole: UserRoleEnum;

  @ValidateNested()
  @Expose()
  @Type(() => OrgDto)
  org: OrgDto;
}
