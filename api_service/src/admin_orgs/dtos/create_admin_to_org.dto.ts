import { IsString, Max, IsNotEmpty, Min, IsInt, IsUUID } from 'class-validator';

export class CreateAdminToOrgDto {
  @IsInt()
  @Min(1)
  @Max(1000000)
  amount: number;
}
