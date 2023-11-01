import { IsString, IsUUID } from 'class-validator';

export class CheckGogiftIntegrationsDto {
  @IsString()
  @IsUUID()
  countryId: string;
}
