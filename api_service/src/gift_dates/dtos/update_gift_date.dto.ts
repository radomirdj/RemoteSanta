import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateGiftDateDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
