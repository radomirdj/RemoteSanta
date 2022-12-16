import { Expose } from 'class-transformer';
import { GenderEnum } from '@prisma/client';

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
}
