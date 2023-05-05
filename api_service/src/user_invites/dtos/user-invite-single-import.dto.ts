import { Expose } from 'class-transformer';
import { UserInviteSingleImportStatusEnum } from '@prisma/client';

export class UserInviteSingleImportDto {
  @Expose()
  id: string;

  @Expose()
  status: UserInviteSingleImportStatusEnum;

  @Expose()
  failureReason?: string;

  @Expose()
  email: string;
}
