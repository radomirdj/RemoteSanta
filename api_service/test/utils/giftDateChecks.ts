export const expectGiftDateRsp = (responseBody, expectedValue) => {
  expect(responseBody.type).toEqual(expectedValue.type);
  expect(responseBody.recurrenceType).toEqual(expectedValue.recurrenceType);
  expect(responseBody.title).toEqual(expectedValue.title);
  expect(responseBody.firstAccuranceDate).toEqual(
    expectedValue.firstAccuranceDate.toISOString(),
  );
  expect(responseBody.enabled).toEqual(expectedValue.enabled);
};

export const expectGiftDateInDB = async (id, expectedValue, prisma) => {
  const giftDate = await prisma.giftDate.findUnique({
    where: { id },
  });

  expect(giftDate).toBeTruthy();
  expect(giftDate.type).toEqual(expectedValue.type);
  expect(giftDate.recurrenceType).toEqual(expectedValue.recurrenceType);
  expect(giftDate.title).toEqual(expectedValue.title);
  expect(giftDate.firstAccuranceDate).toEqual(expectedValue.firstAccuranceDate);
  expect(giftDate.enabled).toEqual(expectedValue.enabled);
  expect(giftDate.userId).toEqual(expectedValue.userId);
};
