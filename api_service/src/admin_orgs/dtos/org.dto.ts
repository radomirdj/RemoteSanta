import { Expose, Transform } from 'class-transformer';
import { IntegrationConsraintTypeEnum } from '@prisma/client';

export class OrgDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  employeeNumber?: number;

  @Expose()
  totalPointsPerMonth?: number;

  @Expose()
  pointsPerMonth: number;
}
