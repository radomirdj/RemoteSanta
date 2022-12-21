import { IsString, IsNotEmpty } from 'class-validator';

export class DeclineGiftCardRequestDto {
  @IsString()
  @IsNotEmpty()
  adminComment: string;
}
