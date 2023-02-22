import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_SELF_REQUEST,
  GET_SELF_SUCCESS,
  GET_SELF_FAILURE,
  LOGOUT,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  CLEAR_ERROR,
} from "./actionTypes";
import {
  SignUpRequest,
  SignUpSuccess,
  SignUpFailure,
  SignUpFailurePayload,
  SignUpRequestPayload,
  LoginRequestPayload,
  LoginRequest,
  LoginSuccess,
  LoginFailurePayload,
  LoginFailure,
  LoginSuccessPayload,
  GetSelfRequest,
  GetSelfSuccessPayload,
  GetSelfSuccess,
  GetSelfFailurePayload,
  GetSelfFailure,
  Logout,
  ForgotPasswordRequestPayload,
  ForgotPasswordRequest,
  ForgotPasswordSuccess,
  ForgotPasswordFailurePayload,
  ForgotPasswordFailure,
  ChangePasswordRequestPayload,
  ChangePasswordRequest,
  ChangePasswordSuccess,
  ChangePasswordFailurePayload,
  ChangePasswordFailure,
  ClearError,
} from "./types";

export const signUpRequest = (
  payload: SignUpRequestPayload,
  navigate: Function
): SignUpRequest => ({
  type: SIGN_UP_REQUEST,
  payload,
  navigate,
});

export const signUpSuccess = (): SignUpSuccess => ({
  type: SIGN_UP_SUCCESS,
});

export const signUpFailure = (
  payload: SignUpFailurePayload
): SignUpFailure => ({
  type: SIGN_UP_FAILURE,
  payload,
});

export const loginRequest = (payload: LoginRequestPayload): LoginRequest => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload: LoginSuccessPayload): LoginSuccess => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload: LoginFailurePayload): LoginFailure => ({
  type: LOGIN_FAILURE,
  payload,
});

export const getSelfRequest = (navigate: Function): GetSelfRequest => ({
  type: GET_SELF_REQUEST,
  navigate,
});

export const getSelfSuccess = (
  payload: GetSelfSuccessPayload
): GetSelfSuccess => ({
  type: GET_SELF_SUCCESS,
  payload,
});

export const getSelfFailure = (
  payload: GetSelfFailurePayload
): GetSelfFailure => ({
  type: GET_SELF_FAILURE,
  payload,
});

export const logout = (navigate: Function): Logout => ({
  type: LOGOUT,
  navigate,
});

export const forgotPasswordRequest = (
  payload: ForgotPasswordRequestPayload,
  navigate: Function
): ForgotPasswordRequest => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload,
  navigate,
});

export const forgotPasswordSuccess = (): ForgotPasswordSuccess => ({
  type: FORGOT_PASSWORD_SUCCESS,
});

export const forgotPasswordFailure = (
  payload: ForgotPasswordFailurePayload
): ForgotPasswordFailure => ({
  type: FORGOT_PASSWORD_FAILURE,
  payload,
});

export const changePasswordRequest = (
  payload: ChangePasswordRequestPayload,
  navigate: Function
): ChangePasswordRequest => ({
  type: CHANGE_PASSWORD_REQUEST,
  payload,
  navigate,
});

export const changePasswordSuccess = (): ChangePasswordSuccess => ({
  type: CHANGE_PASSWORD_SUCCESS,
});

export const changePasswordFailure = (
  payload: ChangePasswordFailurePayload
): ChangePasswordFailure => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload,
});

export const clearError = (): ClearError => ({
  type: CLEAR_ERROR,
});
