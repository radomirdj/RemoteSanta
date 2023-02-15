import { Expose, Type } from 'class-transformer';
import { ClaimPointsEventFulfillmentDto } from './claim_points_event_fulfillment.dto';
import { ValidateNested } from 'class-validator';
import { ClaimPointsEventTypeEnum } from '@prisma/client';

export class ClaimPointsEventDto {
  @Expose()
  id: string;

  @Expose()
  validTo: Date;

  @Expose()
  description: string;

  @Expose()
  title: string;

  @Expose()
  type: ClaimPointsEventTypeEnum;

  @Expose()
  amount?: number;

  @ValidateNested()
  @Expose()
  @Type(() => ClaimPointsEventFulfillmentDto)
  claimPointsEventFulfillment?: ClaimPointsEventFulfillmentDto;
}
