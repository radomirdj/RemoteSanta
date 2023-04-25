import { IsBoolean } from 'class-validator';

export class CompletementStepStatusUpdateDto {
  @IsBoolean()
  completed: boolean;
}
