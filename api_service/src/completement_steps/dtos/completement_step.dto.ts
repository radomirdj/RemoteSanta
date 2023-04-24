import { Expose } from 'class-transformer';

export class CompletementStepDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  completed: boolean;
}
