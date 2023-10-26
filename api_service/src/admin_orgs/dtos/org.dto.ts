import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CountryDto } from '../../users/dtos/country.dto';

export class OrgDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  isTestOrg?: boolean;

  @Expose()
  balance?: number;

  @Expose()
  employeeNumber?: number;

  @Expose()
  totalPointsPerMonth?: number;

  @Expose()
  pointsPerMonth: number;

  @Expose()
  signupPoints: number;

  @ValidateNested()
  @Expose()
  @Type(() => CountryDto)
  country: CountryDto;
}
