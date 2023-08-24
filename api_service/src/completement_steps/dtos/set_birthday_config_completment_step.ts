import { IsInt, Min, Max, IsString } from 'class-validator';

export class SetBirthdayConfigCompletementStepDto {
  @IsString()
  preferredMeetingPlatform: string;

  @IsString()
  preferredTimeDetails: string;

  @IsInt()
  @Min(0)
  @Max(1000000)
  bugetInPoints: number;
}
