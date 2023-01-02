import { Expose, Transform } from 'class-transformer';
import { IntegrationConsraintTypeEnum } from '@prisma/client';

export class UserBalanceDto {
  @Expose()
  pointsActive: number;

  @Expose()
  pointsReserved: number;
}
