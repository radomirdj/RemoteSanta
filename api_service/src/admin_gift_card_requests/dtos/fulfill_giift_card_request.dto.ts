import { IsString, IsNotEmpty } from 'class-validator';

export class FulfillGiftCardRequestDto {
  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}
