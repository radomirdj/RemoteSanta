import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CountryDto } from './country.dto';

export class OrgDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  pointsPerMonth: number;

  @Expose()
  signupPoints: number;

  @ValidateNested()
  @Expose()
  @Type(() => CountryDto)
  country: CountryDto;
}
