import { Expose } from 'class-transformer';

export class OrgDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  pointsPerMonth: number;

  @Expose()
  signupPoints: number;
}
