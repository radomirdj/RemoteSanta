import { AuthUser } from "../../entitites/AuthUser";
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
  LOGOUT
} from "./actionTypes";

export interface AuthState {
  pending: boolean;
  authUser: AuthUser;
  error: string | null;
}

export interface SignUpFailurePayload {
  error: string;
}

export interface SignUpRequestPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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

export interface SignUpRequest {
  type: typeof SIGN_UP_REQUEST;
  payload: SignUpRequestPayload
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
  payload: LoginRequestPayload
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
  | Logout;
