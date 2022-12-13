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
  Logout
} from "./types";

export const signUpRequest = (payload: SignUpRequestPayload): SignUpRequest => ({
  type: SIGN_UP_REQUEST,
  payload
});

export const signUpSuccess = (
): SignUpSuccess => ({
  type: SIGN_UP_SUCCESS
});

export const signUpFailure = (
  payload: SignUpFailurePayload
): SignUpFailure => ({
  type: SIGN_UP_FAILURE,
  payload
});

export const loginRequest = (payload: LoginRequestPayload): LoginRequest => ({
  type: LOGIN_REQUEST,
  payload
});

export const loginSuccess = (payload: LoginSuccessPayload): LoginSuccess => ({
  type: LOGIN_SUCCESS,
  payload
});

export const loginFailure = (
  payload: LoginFailurePayload
): LoginFailure => ({
  type: LOGIN_FAILURE,
  payload
});

export const getSelfRequest = (): GetSelfRequest => ({
  type: GET_SELF_REQUEST,
});

export const getSelfSuccess = (payload: GetSelfSuccessPayload): GetSelfSuccess => ({
  type: GET_SELF_SUCCESS,
  payload
});

export const getSelfFailure = (
  payload: GetSelfFailurePayload
): GetSelfFailure => ({
  type: GET_SELF_FAILURE,
  payload
});

export const logout = (): Logout => ({
  type: LOGOUT,
});
