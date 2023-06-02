import { Expose, Transform } from 'class-transformer';
import { IntegrationConsraintTypeEnum } from '@prisma/client';

export class GiftCardIntegrationDto {
  @Expose()
  id: string;

  @Expose()
  website: string;

  @Expose()
  image: string;

  @Expose()
  title: string;

  @Expose()
  currency: string;

  @Expose()
  pointsToCurrencyConversionRate?: number;

  @Expose()
  description: string;

  @Expose()
  constraintType: IntegrationConsraintTypeEnum;

  @Expose()
  priority: number;

  @Expose()
  constraintJson: string;
}
