import {
  IsString,
  Max,
  IsNotEmpty,
  Min,
  IsInt,
  IsNumber,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateGiftCardRequestDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  sendToUserId?: string;

  @IsString()
  @IsNotEmpty()
  giftCardIntegrationId: string;

  @IsInt()
  @Min(1)
  @Max(1000000)
  amount: number;

  @IsNumber()
  @Min(0.1)
  @Max(1000000)
  giftCardIntegrationCurrencyAmount: number;
}
