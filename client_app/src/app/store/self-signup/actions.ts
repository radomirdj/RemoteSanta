import {
  SELF_SIGN_UP_REQUEST,
  SELF_SIGN_UP_SUCCESS,
  SELF_SIGN_UP_FAILURE,
} from "./actionTypes";
import {
  SelfSignUpRequest,
  SelfSignUpSuccess,
  SelfSignUpFailure,
  SelfSignUpFailurePayload,
  SelfSignUpRequestPayload,
} from "./types";

export const selfSignUpRequest = (
  payload: SelfSignUpRequestPayload,
  navigate: Function
): SelfSignUpRequest => ({
  type: SELF_SIGN_UP_REQUEST,
  payload,
  navigate,
});

export const selfSignUpSuccess = (): SelfSignUpSuccess => ({
  type: SELF_SIGN_UP_SUCCESS,
});

export const selfSignUpFailure = (
  payload: SelfSignUpFailurePayload
): SelfSignUpFailure => ({
  type: SELF_SIGN_UP_FAILURE,
  payload,
});
