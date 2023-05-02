import {
  SELF_SIGN_UP_REQUEST,
  SELF_SIGN_UP_SUCCESS,
  SELF_SIGN_UP_FAILURE,
} from "./actionTypes";

export interface SelfSignupState {
  pending: boolean;
  error: string | null;
}

export interface SelfSignUpFailurePayload {
  error: string;
}

export interface SelfSignUpRequestPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  orgName: string;
}

export interface SelfSignUpRequest {
  type: typeof SELF_SIGN_UP_REQUEST;
  payload: SelfSignUpRequestPayload;
  navigate: Function;
}

export type SelfSignUpSuccess = {
  type: typeof SELF_SIGN_UP_SUCCESS;
};

export type SelfSignUpFailure = {
  type: typeof SELF_SIGN_UP_FAILURE;
  payload: SelfSignUpFailurePayload;
};

export type SelfSignupActions =
  | SelfSignUpRequest
  | SelfSignUpSuccess
  | SelfSignUpFailure;
