import {
  IsString,
  Max,
  IsNotEmpty,
  Min,
  IsInt,
  IsUUID,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class SendPointsToEmployeeDto {
  @IsInt()
  @Min(1)
  @Max(100000000)
  amount: number;

  @IsString()
  message: string;
}
