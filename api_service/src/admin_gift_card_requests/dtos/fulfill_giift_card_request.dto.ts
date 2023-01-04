import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class FulfillGiftCardRequestDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}
