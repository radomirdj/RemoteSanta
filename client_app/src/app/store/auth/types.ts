import { AuthUser } from "../../entitites/AuthUser";
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
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

export type AuthActions =
  | SignUpRequest
  | SignUpSuccess
  | SignUpFailure
  | LoginRequest
  | LoginSuccess
  | LoginFailure;
