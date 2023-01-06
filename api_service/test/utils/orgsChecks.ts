export const expectOrgRsp = (responseBody, expectedValue) => {
  expect(responseBody.name).toEqual(expectedValue.name);
  expect(responseBody.pointsPerMonth).toEqual(expectedValue.pointsPerMonth);
  expect(responseBody.employeeNumber).toEqual(expectedValue.employeeNumber);
  expect(responseBody.totalPointsPerMonth).toEqual(
    expectedValue.employeeNumber * expectedValue.pointsPerMonth,
  );
  expect(responseBody.balance).toEqual(expectedValue.balance);
};
