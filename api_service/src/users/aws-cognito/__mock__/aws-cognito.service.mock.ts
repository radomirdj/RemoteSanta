export const AwsCognitoServiceMock = {
  registerUser: async (authRegisterUserDto) =>
    `sub_${authRegisterUserDto.email}`,
  authenticateUser: async (loginUserDto) => loginUserDto,
  changeUserPassword: async (changePasswordUserDto) => {},
  forgotUserPassword: async (forgotPasswordUserDto) => {},
  confirmUserPassword: async (confirmPasswordUserDto) => {},
};
