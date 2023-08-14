import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CurrencyRatesApiService {
  async getUsdRates() {
    const rsp = await axios.get(
      `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${process.env.CURRENCYFREAKS_KEY}`,
    );
    return rsp.data;
  }
}
