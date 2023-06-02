import { Injectable } from '@nestjs/common';
import { CurrencyRatesApiService } from './currency_rates_api/currency_rates_api.service';
import { Country } from '@prisma/client';

@Injectable()
export class CurrencyRatesService {
  constructor(
    // private prisma: PrismaService,
    private currencyRatesApiService: CurrencyRatesApiService,
  ) {}

  async getUsdRates() {
    const rsp = await this.currencyRatesApiService.getUsdRates();
    return rsp.rates;
  }

  getConversionRateFromMap(rates, currencyString: string) {
    const rateString = rates[currencyString];
    if (!rateString)
      throw new Error(`Currency ${currencyString} doesn't exist`);
    return parseFloat(rateString);
  }

  async getAverageConversionRate(
    currencyFrom: string,
    currencyTo: string,
  ): Promise<number> {
    const rates = await this.getUsdRates();
    return (
      this.getConversionRateFromMap(rates, currencyTo) /
      this.getConversionRateFromMap(rates, currencyFrom)
    );
  }

  async getPointsToCurrencyConversionRate(
    pointsCountry: Country,
    currencyTo: string,
  ): Promise<number> {
    if (pointsCountry.currencyString === currencyTo) {
      return 1.0 / pointsCountry.conversionRateToPoints;
    }

    const avgCurrencyConversionRate = await this.getAverageConversionRate(
      pointsCountry.currencyString,
      currencyTo,
    );
    return (
      (avgCurrencyConversionRate * 0.99) / pointsCountry.conversionRateToPoints
    );
  }
}
