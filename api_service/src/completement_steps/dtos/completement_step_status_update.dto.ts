import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CompletementStepStatusUpdateDto {
  @IsBoolean()
  completed: boolean;

  @IsOptional()
  @IsString()
  additionalParams;
}
