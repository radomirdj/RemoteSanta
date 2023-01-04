import { Expose, Type } from 'class-transformer';
import { OrgTransactionTypeEnum } from '@prisma/client';
import { ClaimPointsEventDto } from '../../claim_points_events/dtos/claim_points_event.dto';
import { ValidateNested } from 'class-validator';

export class OrgTransactionDto {
  @Expose()
  id: string;

  @Expose()
  orgId: string;

  @Expose()
  type: OrgTransactionTypeEnum;

  @Expose()
  totalAmount: number;

  @Expose()
  createdAt: Date;

  @ValidateNested()
  @Expose()
  @Type(() => ClaimPointsEventDto)
  event?: ClaimPointsEventDto;
}
