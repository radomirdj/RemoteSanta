import { IsString, Max, IsNotEmpty, Min, IsInt } from 'class-validator';

export class CreateGiftCardRequestDto {
  @IsString()
  @IsNotEmpty()
  giftCardIntegrationId: string;

  @IsInt()
  @Min(1)
  @Max(1000000)
  amount: number;
}
