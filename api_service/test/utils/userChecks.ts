export const expectUserRsp = (responseBody, expectedValue) => {
  expect(responseBody.email).toEqual(expectedValue.email);
  expect(responseBody.firstName).toEqual(expectedValue.firstName);
  expect(responseBody.lastName).toEqual(expectedValue.lastName);
  expect(responseBody.gender).toEqual(expectedValue.gender);
  expect(responseBody.userRole).toEqual(expectedValue.userRole);
  expect(responseBody.birthDate).toEqual(expectedValue.birthDate.toISOString());
  if (expectedValue.orgName) {
    expect(responseBody.org.name).toEqual(expectedValue.orgName);
  }
};

export const expectUserInDB = async (expectedValue, prisma) => {
  const userList = await prisma.user.findMany({
    where: { email: expectedValue.email },
  });

  expect(userList.length).toEqual(1);
  const user = userList[0];

  expect(user.email).toEqual(expectedValue.email);
  expect(user.countryId).toEqual(expectedValue.countryId);
  expect(user.firstName).toEqual(expectedValue.firstName);
  expect(user.lastName).toEqual(expectedValue.lastName);
  expect(user.cognitoSub).toEqual(`sub_${expectedValue.email}`);
  expect(user.gender).toEqual(expectedValue.gender);
  expect(user.userRole).toEqual(expectedValue.userRole);
  expect(user.birthDate).toEqual(expectedValue.birthDate);
};
