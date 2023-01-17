export const expectUserInviteRsp = (responseBody, expectedValue) => {
  expect(responseBody.email).toEqual(expectedValue.email);
  expect(responseBody.status).toEqual(expectedValue.status);
  if (expectedValue.orgName) {
    expect(responseBody.org.name).toEqual(expectedValue.orgName);
  }
};
