import { Injectable } from '@nestjs/common';
import { Issuer } from 'openid-client';
import axios from 'axios';
import consts from '../../utils/consts';

const GOGIFT_AUTH_URL = process.env.GOGIFT_AUTH_URL;
const GOGIFT_URL = process.env.GOGIFT_URL;
const GOGIFT_CLIENT_ID = process.env.GOGIFT_CLIENT_ID;
const GOGIFT_CLIENT_SECRET = process.env.GOGIFT_CLIENT_SECRET;
const GOGIFT_DEPARTMENT_ID = process.env.GOGIFT_DEPARTMENT_ID;

@Injectable()
export class GogiftApiService {
  async getToken() {
    const GRANT_TYPE = 'client_credentials';

    const issuer = await Issuer.discover(GOGIFT_AUTH_URL);
    // issuer.defaultHttpOptions = { timeout: 3500 }; - It was in GoGift documentation, but not supported now

    const client = new issuer.Client({
      client_id: GOGIFT_CLIENT_ID,
      client_secret: GOGIFT_CLIENT_SECRET,
    });

    return client.grant({
      grant_type: GRANT_TYPE,
    });
  }

  // TODO - what if more than a page - max 50 per page + Country
  async getGiftCardIntegrationsExample(countryCode: string) {
    const tokenFull = await this.getToken();
    const rsp = await axios.post(
      `${GOGIFT_URL}/products/filter`,
      {
        salesChannel: '109',
        redeemableInCoutries: countryCode,
        paging: {
          perPage: 200,
          page: 1,
        },
      },
      {
        headers: { Authorization: `Bearer ${tokenFull.access_token}` },
      },
    );
    return rsp.data.products;
  }

  async getGiftCardIntegrationById(id: string, token: string) {
    const { data } = await axios.get(`${GOGIFT_URL}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async createBasket(token: string) {
    const { data } = await axios.post(
      `${GOGIFT_URL}/baskets`,
      { salesChannelId: '109' },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data;
  }

  async getProductSku(productId: string, token: string, currency: string) {
    const product = await this.getGiftCardIntegrationById(productId, token);
    const deliveryMethod = product.deliveryMethods.find(
      (deliveryMethodElement) =>
        deliveryMethodElement.deliveryMethod ===
        consts.gogiftConsts.deliveryMethods.EMAIL,
    );
    if (!deliveryMethod) return { sku: null, product };

    const inventoryEntry = deliveryMethod.inventory.inventoryEntries.find(
      (inventoryEntryElement) =>
        inventoryEntryElement.priceCurrency === currency,
    );
    if (!inventoryEntry) return { sku: null, product };

    return { sku: inventoryEntry.sku, product, inventoryEntry };
  }

  async fillBasket(
    token: string,
    basketId: string,
    productId: string,
    stockKeepingUnit: string,
    recipientEmail: string,
    recipientName: string,
    valueCurrency: string,
    giftcardValue: number,
  ) {
    const { data } = await axios.put(
      `${GOGIFT_URL}/baskets`,
      {
        id: basketId,
        doClearProducts: true,
        buyer: {
          accountId: GOGIFT_DEPARTMENT_ID,
          accountType: 'B2BDepartment',
          name: 'Remote Santa',
          address: {
            countryCode: 'US',
            city: 'Baltimore',
            postCode: '21212',
            line1: '308 Thornhill Road',
            line2: '',
            attention: '',
          },
          email: 'admin@remotesanta.io',
          phone: '+14436877690',
        },
        addProducts: [
          {
            // deliveryDate
            deliveryMethod: 'Email',
            recipientEmail,
            recipientName,
            stockKeepingUnit,
            productId,
            quantity: 1,
            // currency value has to be ISO 4217 https://www.iso.org/iso-4217-currency-codes.html
            valueCurrency,
            giftcardValue,
          },
        ],
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    // Sth. fails with data to pay and doesn't match - could be some tax etc.
    if (data.totalPaymentAmountWithTax !== giftcardValue) {
      console.log(
        '-------------------------GOGIFT API ERROR START - value mismatch--------------------------------------',
      );
      console.log('recipientEmail: ', recipientEmail);
      console.log('productId: ', productId);
      console.log('currency: ', valueCurrency);
      console.log('giftcardValue: ', giftcardValue);
      console.log(
        'data.totalPaymentAmountWithTax: ',
        data.totalPaymentAmountWithTax,
      );

      console.log(
        '-------------------------GOGIFT API ERROR END - value mismatch----------------------------------------',
      );

      throw new Error('GOGIFT API ERROR - value mismatch');
    }
    return data;
  }

  async finalizeBasket(token: string, basketId: string, countryCode: string) {
    const { data } = await axios.post(
      `${GOGIFT_URL}/baskets/finalize`,
      {
        basketId,
        paymentMethod: 'InvoiceByFinance',
        countryCode,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data;
  }
}
