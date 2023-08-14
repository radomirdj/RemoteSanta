import { Module } from '@nestjs/common';
import { CurrencyRatesService } from './currency_rates.service';
import { CurrencyRatesApiService } from './currency_rates_api/currency_rates_api.service';

@Module({
  providers: [CurrencyRatesService, CurrencyRatesApiService],
  exports: [CurrencyRatesService],
})
export class CurrencyRatesModule {}
