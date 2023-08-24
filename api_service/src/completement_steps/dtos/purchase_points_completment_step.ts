import { IsInt, Min, Max } from 'class-validator';

export class PurchasePointsCompletementStepDto {
  @IsInt()
  @Min(1)
  @Max(1000000)
  purchasePoints: number;
}
