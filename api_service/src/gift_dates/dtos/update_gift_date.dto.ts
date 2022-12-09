import { IsString } from 'class-validator';

export class UpdateGiftDateDto {
  @IsString()
  title: string;
}
