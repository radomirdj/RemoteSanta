import { Expose, Type } from 'class-transformer';
import { GenderEnum, UserRoleEnum } from '@prisma/client';
export class UserBasicDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  accessToken?: string;

  @Expose()
  birthDate?: Date;

  @Expose()
  gender?: GenderEnum;

  @Expose()
  userRole: UserRoleEnum;
}
