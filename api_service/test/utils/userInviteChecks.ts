export const expectUserInviteRsp = (responseBody, expectedValue) => {
  expect(responseBody.email).toEqual(expectedValue.email);
  expect(responseBody.status).toEqual(expectedValue.status);
  if (expectedValue.orgName) {
    expect(responseBody.org.name).toEqual(expectedValue.orgName);
  }
};

export const expectUserInviteDB = async (prisma, id, expectedValue) => {
  const userInvite = await prisma.userInvite.findUnique({
    where: { id },
  });
  expect(userInvite.email).toEqual(expectedValue.email);
  expect(userInvite.status).toEqual(expectedValue.status);
  expect(userInvite.createdById).toEqual(expectedValue.createdById);
  expect(userInvite.orgId).toEqual(expectedValue.orgId);
};
