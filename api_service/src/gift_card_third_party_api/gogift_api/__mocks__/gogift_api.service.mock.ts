function getToken() {
  return '';
}

function getGiftCardIntegrationsExample() {
  return '';
}

function getGiftCardIntegrationById(id: string, token: string) {
  return '';
}

function createBasket(token: string) {
  return '';
}

function getProductSku(productId: string, token: string, currency: string) {
  return { sku: '---', product: '' };
}

function fillBasket(
  token: string,
  basketId: string,
  productId: string,
  stockKeepingUnit: string,
  recipientEmail: string,
  recipientName: string,
  valueCurrency: string,
  giftcardValue: number,
) {
  return '';
}

function finalizeBasket(token: string, basketId: string, countryCode: string) {
  return '';
}

export const GogiftApiServiceMock = {
  getGiftCardIntegrationsExample,
  getToken,
  getGiftCardIntegrationById,
  createBasket,
  getProductSku,
  fillBasket,
  finalizeBasket,
};
