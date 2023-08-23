import { FETCH_ADMIN_GIFT_CARD_REQUEST } from "../admin-gift-card-requests/actionTypes";
import {
  SELF_SIGN_UP_REQUEST,
  SELF_SIGN_UP_SUCCESS,
  SELF_SIGN_UP_FAILURE,
  FETCH_COMPLETEMENT_STEPS_REQUEST,
  FETCH_COMPLETEMENT_STEPS_SUCCESS,
  FETCH_COMPLETEMENT_STEPS_FAILURE,
  POST_COMPLETEMENT_STEPS_REQUEST,
  POST_COMPLETEMENT_STEPS_SUCCESS,
  POST_COMPLETEMENT_STEPS_FAILURE,
  SET_OPEN_MODAL_STEP,
  SET_CLOSE_MODAL_STEP,
  POST_PERSONAL_DETAILS_REQUEST,
  POST_PERSONAL_DETAILS_SUCCESS,
  POST_PERSONAL_DETAILS_FAILURE,
  POST_SIGNUP_BONUS_REQUEST,
  POST_SIGNUP_BONUS_SUCCESS,
  POST_SIGNUP_BONUS_FAILURE,
} from "./actionTypes";
import {
  SelfSignUpRequest,
  SelfSignUpSuccess,
  SelfSignUpFailure,
  SelfSignUpFailurePayload,
  SelfSignUpRequestPayload,
  FetchCompletementSteps,
  FetchCompletementStepsSuccessPayload,
  FetchCompletementStepsSuccess,
  FetchCompletementStepsFailurePayload,
  FetchCompletementStepsFailure,
  PostCompletementSteps,
  PostCompletementStepsPayload,
  PostCompletementStepsSuccess,
  PostCompletementStepsFailurePayload,
  PostCompletementStepsFailure,
  SetOpenModalStep,
  SetCloseModalStep,
  SetOpenModalStepPayload,
  PostPersonalDetailsPayload,
  PostPersonalDetails,
  PostPersonalDetailsSuccess,
  PostPersonalDetailsFailurePayload,
  PostPersonalDetailsFailure,
  PostSignupBonusPayload,
  PostSignupBonus,
  PostSignupBonusSuccess,
  PostSignupBonusFailurePayload,
  PostSignupBonusFailure,
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

export const fetchCompletementSteps = (): FetchCompletementSteps => ({
  type: FETCH_COMPLETEMENT_STEPS_REQUEST,
});

export const fetchCompletementStepsSuccess = (
  payload: FetchCompletementStepsSuccessPayload
): FetchCompletementStepsSuccess => ({
  type: FETCH_COMPLETEMENT_STEPS_SUCCESS,
  payload,
});

export const fetchCompletementStepsFailure = (
  payload: FetchCompletementStepsFailurePayload
): FetchCompletementStepsFailure => ({
  type: FETCH_COMPLETEMENT_STEPS_FAILURE,
  payload,
});

export const postCompletementSteps = (
  payload: PostCompletementStepsPayload,
  navigate: Function
): PostCompletementSteps => ({
  type: POST_COMPLETEMENT_STEPS_REQUEST,
  payload,
  navigate,
});

export const postCompletementStepsSuccess =
  (): PostCompletementStepsSuccess => ({
    type: POST_COMPLETEMENT_STEPS_SUCCESS,
  });

export const postCompletementStepsFailure = (
  payload: PostCompletementStepsFailurePayload
): PostCompletementStepsFailure => ({
  type: POST_COMPLETEMENT_STEPS_FAILURE,
  payload,
});

export const setOpenModalStep = (
  payload: SetOpenModalStepPayload
): SetOpenModalStep => ({
  type: SET_OPEN_MODAL_STEP,
  payload,
});

export const setCloseModalStep = (): SetCloseModalStep => ({
  type: SET_CLOSE_MODAL_STEP,
});

export const postPersonalDetails = (
  payload: PostPersonalDetailsPayload
): PostPersonalDetails => ({
  type: POST_PERSONAL_DETAILS_REQUEST,
  payload,
});

export const postPersonalDetailsSuccess = (): PostPersonalDetailsSuccess => ({
  type: POST_PERSONAL_DETAILS_SUCCESS,
});

export const postPersonalDetailsFailure = (
  payload: PostPersonalDetailsFailurePayload
): PostPersonalDetailsFailure => ({
  type: POST_PERSONAL_DETAILS_FAILURE,
  payload,
});

export const postSignupBonus = (
  payload: PostSignupBonusPayload
): PostSignupBonus => ({
  type: POST_SIGNUP_BONUS_REQUEST,
  payload,
});

export const postSignupBonusSuccess = (): PostSignupBonusSuccess => ({
  type: POST_SIGNUP_BONUS_SUCCESS,
});

export const postSignupBonusFailure = (
  payload: PostSignupBonusFailurePayload
): PostSignupBonusFailure => ({
  type: POST_SIGNUP_BONUS_FAILURE,
  payload,
});
