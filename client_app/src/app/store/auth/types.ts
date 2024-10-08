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

export interface ICountry {
  id: string;
  currencyString: string;
  countryCode: string;
  countryName: string;
  conversionRateToPoints: number;
}

export interface IOrg {
  id: string;
  name: string;
  pointsPerMonth: number;
  signupPoints?: number;
  country?: ICountry;
}

export interface IUserBalance {
  pointsActive: number;
  pointsReserved: number;
}

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string | undefined;
  gender: string;
  accessToken: string;
  userRole: string;
  org?: IOrg;
  userBalance?: IUserBalance;
  countryId?: string;
}

export interface AuthState {
  pending: boolean;
  authUser: AuthUser;
  error: string | null;
  emailToResetPassword: string | null;
}

export interface SignUpFailurePayload {
  error: string;
}

export interface SignUpRequestPayload {
  firstName: string;
  lastName: string;
  code: string;
  password: string;
  birthDate?: Date;
  gender: string;
  countryId: string;
}

export interface LoginFailurePayload {
  error: string;
}

export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface LoginSuccessPayload {
  authUser: AuthUser;
}

export interface GetSelfSuccessPayload {
  authUser: AuthUser;
}

export interface GetSelfFailurePayload {
  error: string;
}

export interface ForgotPasswordRequestPayload {
  email: string;
}

export interface ForgotPasswordFailurePayload {
  error: string;
}

export interface ChangePasswordRequestPayload {
  email: string;
  confirmationCode: string;
  newPassword: string;
}

export interface ChangePasswordFailurePayload {
  error: string;
}

export interface SignUpRequest {
  type: typeof SIGN_UP_REQUEST;
  payload: SignUpRequestPayload;
  navigate: Function;
}

export type SignUpSuccess = {
  type: typeof SIGN_UP_SUCCESS;
};

export type SignUpFailure = {
  type: typeof SIGN_UP_FAILURE;
  payload: SignUpFailurePayload;
};

export interface LoginRequest {
  type: typeof LOGIN_REQUEST;
  payload: LoginRequestPayload;
}

export type LoginSuccess = {
  type: typeof LOGIN_SUCCESS;
  payload: LoginSuccessPayload;
};

export type LoginFailure = {
  type: typeof LOGIN_FAILURE;
  payload: LoginFailurePayload;
};

export interface GetSelfRequest {
  type: typeof GET_SELF_REQUEST;
  navigate: Function;
}

export type GetSelfSuccess = {
  type: typeof GET_SELF_SUCCESS;
  payload: GetSelfSuccessPayload;
};

export type GetSelfFailure = {
  type: typeof GET_SELF_FAILURE;
  payload: GetSelfFailurePayload;
};

export type Logout = {
  type: typeof LOGOUT;
  navigate: Function;
};

export interface ForgotPasswordRequest {
  type: typeof FORGOT_PASSWORD_REQUEST;
  payload: ForgotPasswordRequestPayload;
  navigate: Function;
}

export type ForgotPasswordSuccess = {
  type: typeof FORGOT_PASSWORD_SUCCESS;
};

export type ForgotPasswordFailure = {
  type: typeof FORGOT_PASSWORD_FAILURE;
  payload: ForgotPasswordFailurePayload;
};

export interface ChangePasswordRequest {
  type: typeof CHANGE_PASSWORD_REQUEST;
  payload: ChangePasswordRequestPayload;
  navigate: Function;
}

export type ChangePasswordSuccess = {
  type: typeof CHANGE_PASSWORD_SUCCESS;
};

export type ChangePasswordFailure = {
  type: typeof CHANGE_PASSWORD_FAILURE;
  payload: ChangePasswordFailurePayload;
};

export type ClearError = {
  type: typeof CLEAR_ERROR;
};

export type AuthActions =
  | SignUpRequest
  | SignUpSuccess
  | SignUpFailure
  | LoginRequest
  | LoginSuccess
  | LoginFailure
  | GetSelfRequest
  | GetSelfSuccess
  | GetSelfFailure
  | ForgotPasswordRequest
  | ForgotPasswordSuccess
  | ForgotPasswordFailure
  | ChangePasswordRequest
  | ChangePasswordSuccess
  | ChangePasswordFailure
  | Logout
  | ClearError;
