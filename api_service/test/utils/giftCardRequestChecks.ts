export const expectGiftCardRequestRsp = (responseBody, expectedValue) => {
  expect(responseBody.createdById).toEqual(expectedValue.createdById);
  expect(responseBody.ownerId).toEqual(expectedValue.ownerId);
  expect(responseBody.giftCardIntegrationId).toEqual(
    expectedValue.giftCardIntegrationId,
  );
  expect(responseBody.amount).toEqual(expectedValue.amount);
  expect(responseBody.giftCardIntegrationCurrencyAmount).toEqual(
    expectedValue.giftCardIntegrationCurrencyAmount,
  );
  expect(responseBody.status).toEqual(expectedValue.status);
  expect(responseBody.createdAt).toBeDefined();
  if (expectedValue.integrationTitle) {
    expect(responseBody.giftCardIntegration.title).toEqual(
      expectedValue.integrationTitle,
    );
  }
};

export const expectGiftCardRequestInDB = async (id, expectedValue, prisma) => {
  const giftCardRequest = await prisma.giftCardRequest.findUnique({
    where: { id },
  });

  expect(giftCardRequest).toBeTruthy();
  expect(giftCardRequest.createdById).toEqual(expectedValue.createdById);
  expect(giftCardRequest.ownerId).toEqual(expectedValue.ownerId);
  expect(giftCardRequest.giftCardIntegrationId).toEqual(
    expectedValue.giftCardIntegrationId,
  );
  expect(giftCardRequest.amount).toEqual(expectedValue.amount);
  expect(giftCardRequest.giftCardIntegrationCurrencyAmount).toEqual(
    expectedValue.giftCardIntegrationCurrencyAmount,
  );
  expect(giftCardRequest.status).toEqual(expectedValue.status);
};
