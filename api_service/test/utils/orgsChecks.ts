export const expectOrgRsp = (responseBody, expectedValue) => {
  expect(responseBody.name).toEqual(expectedValue.name);
  expect(responseBody.pointsPerMonth).toEqual(expectedValue.pointsPerMonth);
  expect(responseBody.signupPoints).toEqual(expectedValue.signupPoints);
  expect(responseBody.employeeNumber).toEqual(expectedValue.employeeNumber);
  expect(responseBody.totalPointsPerMonth).toEqual(
    expectedValue.employeeNumber * expectedValue.pointsPerMonth,
  );
  expect(responseBody.balance).toEqual(expectedValue.balance);
};

export const expectOrgInDB = async (expectedValue, prisma) => {
  const org = await prisma.org.findUnique({
    where: { id: expectedValue.id },
  });

  expect(org.email).toEqual(org.email);
  expect(org.pointsPerMonth).toEqual(org.pointsPerMonth);
  expect(org.signupPoints).toEqual(org.signupPoints);
};
