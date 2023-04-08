import { Expose } from 'class-transformer';

export class CountryDto {
  @Expose()
  id: string;

  @Expose()
  currencyString: string;

  @Expose()
  countryCode: string;

  @Expose()
  countryName: string;

  @Expose()
  conversionRateToPoints: number;
}
