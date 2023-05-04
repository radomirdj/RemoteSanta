import { IsArray, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { UserInviteSingleImportDto } from './user-invite-single-import.dto';

export class BulkCreateUserInviteJobProgressDto {
  @Expose()
  id: string;

  @Expose()
  pendingCount: number;

  @Expose()
  successCount: number;

  @Expose()
  failCount: number;
}
