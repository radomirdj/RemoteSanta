import { Expose, Type } from 'class-transformer';
import { UserInviteStatusEnum } from '@prisma/client';
import { UserBasicDto } from '../../users/dtos/user_basic.dto';
import { OrgDto } from '../../admin_orgs/dtos/org.dto';
import { UserInviteRoleEnum } from '@prisma/client';
import { ValidateNested } from 'class-validator';

export class UserInviteDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  status: UserInviteStatusEnum;

  @Expose()
  userRole: UserInviteRoleEnum;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @ValidateNested()
  @Expose()
  @Type(() => UserBasicDto)
  createdBy: UserBasicDto;

  @ValidateNested()
  @Expose()
  @Type(() => OrgDto)
  org: OrgDto;
}
