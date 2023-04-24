export const expectUserRsp = (responseBody, expectedValue) => {
  expect(responseBody.email).toEqual(expectedValue.email);
  expect(responseBody.firstName).toEqual(expectedValue.firstName);
  expect(responseBody.lastName).toEqual(expectedValue.lastName);
  if (expectedValue.gender)
    expect(responseBody.gender).toEqual(expectedValue.gender);
  else expect(responseBody.gender).toBeNull();
  expect(responseBody.userRole).toEqual(expectedValue.userRole);
  if (expectedValue.birthDate)
    expect(responseBody.birthDate).toEqual(
      expectedValue.birthDate.toISOString(),
    );
  else expect(responseBody.birthDate).toBeNull();
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
  expect(user.firstName).toEqual(expectedValue.firstName);
  expect(user.lastName).toEqual(expectedValue.lastName);
  expect(user.cognitoSub).toEqual(`sub_${expectedValue.email}`);
  if (expectedValue.gender) expect(user.gender).toEqual(expectedValue.gender);
  else expect(user.gender).toBeNull();
  expect(user.userRole).toEqual(expectedValue.userRole);
  if (expectedValue.birthDate)
    expect(user.birthDate).toEqual(expectedValue.birthDate);
  else expect(user.birthDate).toBeNull();
};
