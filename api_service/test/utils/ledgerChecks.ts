export const checkOneAddedLedger = async (
  prisma,
  testStartTime,
  expectedValue,
) => {
  const addedLadger = await prisma.ledger.findMany({
    where: {
      createdAt: {
        gte: testStartTime,
      },
    },
  });

  expect(addedLadger.length).toEqual(1);
  const addedLadgerEntity = addedLadger[0];
  expect(addedLadgerEntity.fromId).toEqual(expectedValue.fromId);
  expect(addedLadgerEntity.toId).toEqual(expectedValue.toId);
  expect(addedLadgerEntity.amount).toEqual(expectedValue.amount);
  expect(addedLadgerEntity.type).toEqual(expectedValue.type);
};

export const checkZeroAddedLedger = async (prisma, testStartTime) => {
  const addedLadger = await prisma.ledger.findMany({
    where: {
      createdAt: {
        gte: testStartTime,
      },
    },
  });

  expect(addedLadger.length).toEqual(0);
};

export const checkBalance = async (ledgerService, userId, expectedValue) => {
  const userBalance = await ledgerService.getUserBalance(userId);
  expect(userBalance.pointsActive).toEqual(expectedValue.pointsActive);
  expect(userBalance.pointsReserved).toEqual(expectedValue.pointsReserved);
};
