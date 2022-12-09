import { IsBoolean } from 'class-validator';

export class ChangeStatusGiftDateDto {
  @IsBoolean()
  enabled: boolean;
}
