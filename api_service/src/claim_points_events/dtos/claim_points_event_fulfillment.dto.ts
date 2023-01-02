import { Expose, Transform } from 'class-transformer';

export class ClaimPointsEventFulfillmentDto {
  @Expose()
  id: string;

  @Expose()
  amount: number;

  @Expose()
  userId: string;

  @Expose()
  createdAt: Date;
}
