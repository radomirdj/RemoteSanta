import { Expose, Transform } from 'class-transformer';
import { IntegrationConsraintTypeEnum } from '@prisma/client';

export class GiftDateDto {
  @Expose()
  id: number;

  @Expose()
  website: string;

  @Expose()
  image: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  constraintType: IntegrationConsraintTypeEnum;

  @Expose()
  priority: number;

  @Expose()
  constraintJson: string;
}
