import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from "./actionTypes";
import {
  SignUpRequest,
  SignUpSuccess,
  SignUpFailure,
  SignUpFailurePayload,
  SignUpRequestPayload
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
