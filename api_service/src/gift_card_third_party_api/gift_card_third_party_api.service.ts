import { Injectable } from '@nestjs/common';
import { GogiftApiService } from './gogift_api/gogift_api.service';

@Injectable()
export class GiftCardThirdPartyApiService {
  constructor(private gogiftApiService: GogiftApiService) {}

  getToken() {
    return this.gogiftApiService.getToken();
  }

  getGiftCardIntegrationsExample() {
    return this.gogiftApiService.getGiftCardIntegrationsExample();
  }

  async fulfillGiftCard(
    productId: string,
    recipientEmail: string,
    recipientName: string,
    currency: string,
    giftcardValue: number,
    countryCode: string,
  ) {
    const token = await this.gogiftApiService.getToken();
    const createdBasket = await this.gogiftApiService.createBasket(
      token.access_token,
    );
    const sku = await this.gogiftApiService.getProductSku(
      productId,
      token.access_token,
      currency,
    );
    if (!sku) {
      console.log(
        '-------------------------GOGIFT API ERROR START--------------------------------------',
      );
      console.log('recipientEmail: ', recipientEmail);
      console.log('productId: ', productId);
      console.log('currency: ', currency);
      console.log(
        '-------------------------GOGIFT API ERROR END----------------------------------------',
      );

      throw new Error('GOGIFT API ERROR - NO SKU');
    }

    const filledBasket = await this.gogiftApiService.fillBasket(
      token.access_token,
      createdBasket.id,
      productId,
      sku,
      recipientEmail,
      recipientName,
      currency,
      giftcardValue,
    );
    await this.gogiftApiService.finalizeBasket(
      token.access_token,
      createdBasket.id,
      countryCode,
    );
    return filledBasket;
  }
}
