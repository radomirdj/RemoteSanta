import * as fs from 'fs';

const userJson = fs.readFileSync(
  `${__dirname}/cognito-users.mock.json`,
  'utf8',
);
const usersCognito = JSON.parse(userJson);

export const AwsCognitoServiceMock = {
  registerUser: async (authRegisterUserDto, email) => `sub_${email}`,
  authenticateUser: async (loginUserDto) => {
    const foundUser = usersCognito.find(
      (user) => user.email === loginUserDto.email,
    );
    if (!foundUser) throw new Error('Cognito - Not Found');
    if (foundUser.password !== loginUserDto.password)
      throw new Error('Cognito - Bad Password');
    return {
      accessToken: `access_${foundUser.email}`,
      sub: foundUser.sub,
    };
  },
  changeUserPassword: async (changePasswordUserDto) => {},
  forgotUserPassword: async (forgotPasswordUserDto) => {},
  confirmUserPassword: async (confirmPasswordUserDto) => {},
};
