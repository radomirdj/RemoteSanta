import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from "./actionTypes";

export interface SignUpState {
  pending: boolean;
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

export type SignUpActions =
  | SignUpRequest
  | SignUpSuccess
  | SignUpFailure;
