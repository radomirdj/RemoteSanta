export const expectGiftCardRequestRsp = (responseBody, expectedValue) => {
  expect(responseBody.userId).toEqual(expectedValue.userId);
  expect(responseBody.giftCardIntegrationId).toEqual(
    expectedValue.giftCardIntegrationId,
  );
  expect(responseBody.amount).toEqual(expectedValue.amount);
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
  expect(giftCardRequest.userId).toEqual(expectedValue.userId);
  expect(giftCardRequest.giftCardIntegrationId).toEqual(
    expectedValue.giftCardIntegrationId,
  );
  expect(giftCardRequest.amount).toEqual(expectedValue.amount);
  expect(giftCardRequest.status).toEqual(expectedValue.status);
};
