import { IsInt, Min, Max } from 'class-validator';

export class SetSignupBonusCompletementStepDto {
  @IsInt()
  @Min(1)
  @Max(1000000)
  signupPoints: number;
}
