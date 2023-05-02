import { IsArray, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { UserInviteSingleImportDto } from './user-invite-single-import.dto';

export class BulkCreateUserInviteJobDto {
  @Expose()
  id: string;

  @Expose()
  orgId: string;

  @ValidateNested({ each: true })
  @IsArray()
  @Expose()
  @Type(() => UserInviteSingleImportDto)
  userInviteSingleImportList: UserInviteSingleImportDto[];
}
