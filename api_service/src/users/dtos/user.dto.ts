import { Expose, Type } from 'class-transformer';
import { GenderEnum, UserRoleEnum } from '@prisma/client';
import { OrgDto } from './org.dto';
import { UserBalanceDto } from '../../ledger/dtos/user_balance.dto';
import { ValidateNested } from 'class-validator';
export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  countryId: string;

  @Expose()
  deleted: boolean;

  @Expose()
  accessToken?: string;

  @Expose()
  birthDate?: Date;

  @Expose()
  gender: GenderEnum;

  @Expose()
  userRole: UserRoleEnum;

  @ValidateNested()
  @Expose()
  @Type(() => UserBalanceDto)
  userBalance?: UserBalanceDto;

  @ValidateNested()
  @Expose()
  @Type(() => OrgDto)
  org: OrgDto;
}
