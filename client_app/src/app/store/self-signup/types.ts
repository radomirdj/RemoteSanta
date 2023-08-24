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
  POST_PURCHASE_POINTS_REQUEST,
  POST_PURCHASE_POINTS_SUCCESS,
  POST_PURCHASE_POINTS_FAILURE,
  POST_BIRTHDAYS_SETUP_REQUEST,
  POST_BIRTHDAYS_SETUP_SUCCESS,
  POST_BIRTHDAYS_SETUP_FAILURE,
} from "./actionTypes";

export interface ICompletementStep {
  id: string;
  name: string;
  completed: boolean;
}

export interface ICompletementStepStatus {
  completed: boolean;
}

export interface SelfSignupState {
  pending: boolean;
  error: string | null;
  openModalStep: string;
  completementSteps: ICompletementStep[];
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
  countryId: string;
}

export interface FetchCompletementStepsSuccessPayload {
  completementsSteps: ICompletementStep[];
}

export interface FetchCompletementStepsFailurePayload {
  error: string;
}

export interface PostCompletementStepsPayload {
  stepId: string | undefined;
  completementStepStatus: ICompletementStepStatus;
}

export interface PostCompletementStepsFailurePayload {
  error: string;
}

export interface SelfSignUpRequest {
  type: typeof SELF_SIGN_UP_REQUEST;
  payload: SelfSignUpRequestPayload;
  navigate: Function;
}

export interface SetOpenModalStepPayload {
  openModalStep: string;
}

export interface PostPersonalDetailsPayload {
  birthDate?: Date;
  gender: string;
}

export interface PostPersonalDetailsFailurePayload {
  error: string;
}

export interface PostSignupBonusPayload {
  signupPoints: number;
}

export interface PostSignupBonusFailurePayload {
  error: string;
}

export interface PostPurchasePointsPayload {
  purchasePoints: number;
}

export interface PostPurchasePointsFailurePayload {
  error: string;
}

export interface PostBirthdaysSetupPayload {
  preferredMeetingPlatform: string;
  preferredTimeDetails: string;
  bugetInPoints: number;
}

export interface PostBirthdaysSetupFailurePayload {
  error: string;
}

export type SelfSignUpSuccess = {
  type: typeof SELF_SIGN_UP_SUCCESS;
};

export type SelfSignUpFailure = {
  type: typeof SELF_SIGN_UP_FAILURE;
  payload: SelfSignUpFailurePayload;
};

export interface FetchCompletementSteps {
  type: typeof FETCH_COMPLETEMENT_STEPS_REQUEST;
}

export interface FetchCompletementStepsSuccess {
  type: typeof FETCH_COMPLETEMENT_STEPS_SUCCESS;
  payload: FetchCompletementStepsSuccessPayload;
}

export interface FetchCompletementStepsFailure {
  type: typeof FETCH_COMPLETEMENT_STEPS_FAILURE;
  payload: FetchCompletementStepsFailurePayload;
}

export interface PostCompletementSteps {
  type: typeof POST_COMPLETEMENT_STEPS_REQUEST;
  payload: PostCompletementStepsPayload;
  navigate: Function;
}

export interface PostCompletementStepsSuccess {
  type: typeof POST_COMPLETEMENT_STEPS_SUCCESS;
}

export interface PostCompletementStepsFailure {
  type: typeof POST_COMPLETEMENT_STEPS_FAILURE;
  payload: PostCompletementStepsFailurePayload;
}

export interface SetOpenModalStep {
  type: typeof SET_OPEN_MODAL_STEP;
  payload: SetOpenModalStepPayload;
}

export interface SetCloseModalStep {
  type: typeof SET_CLOSE_MODAL_STEP;
}

export interface PostPersonalDetails {
  type: typeof POST_PERSONAL_DETAILS_REQUEST;
  payload: PostPersonalDetailsPayload;
}

export interface PostPersonalDetailsSuccess {
  type: typeof POST_PERSONAL_DETAILS_SUCCESS;
}

export interface PostPersonalDetailsFailure {
  type: typeof POST_PERSONAL_DETAILS_FAILURE;
  payload: PostPersonalDetailsFailurePayload;
}

export interface PostSignupBonus {
  type: typeof POST_SIGNUP_BONUS_REQUEST;
  payload: PostSignupBonusPayload;
}

export interface PostSignupBonusSuccess {
  type: typeof POST_SIGNUP_BONUS_SUCCESS;
}

export interface PostSignupBonusFailure {
  type: typeof POST_SIGNUP_BONUS_FAILURE;
  payload: PostSignupBonusFailurePayload;
}

export interface PostPurchasePoints {
  type: typeof POST_PURCHASE_POINTS_REQUEST;
  payload: PostPurchasePointsPayload;
  navigate: Function;
}

export interface PostPurchasePointsSuccess {
  type: typeof POST_PURCHASE_POINTS_SUCCESS;
}

export interface PostPurchasePointsFailure {
  type: typeof POST_PURCHASE_POINTS_FAILURE;
  payload: PostPurchasePointsFailurePayload;
}

export interface PostBirthdaysSetup {
  type: typeof POST_BIRTHDAYS_SETUP_REQUEST;
  payload: PostBirthdaysSetupPayload;
}

export interface PostBirthdaysSetupSuccess {
  type: typeof POST_BIRTHDAYS_SETUP_SUCCESS;
}

export interface PostBirthdaysSetupFailure {
  type: typeof POST_BIRTHDAYS_SETUP_FAILURE;
  payload: PostBirthdaysSetupFailurePayload;
}

export type SelfSignupActions =
  | SelfSignUpRequest
  | SelfSignUpSuccess
  | SelfSignUpFailure
  | FetchCompletementSteps
  | FetchCompletementStepsSuccess
  | FetchCompletementStepsFailure
  | PostCompletementSteps
  | PostCompletementStepsSuccess
  | PostCompletementStepsFailure
  | SetOpenModalStep
  | SetCloseModalStep
  | PostPersonalDetails
  | PostPersonalDetailsSuccess
  | PostPersonalDetailsFailure
  | PostSignupBonus
  | PostSignupBonusSuccess
  | PostSignupBonusFailure
  | PostPurchasePoints
  | PostPurchasePointsSuccess
  | PostPurchasePointsFailure
  | PostBirthdaysSetup
  | PostBirthdaysSetupSuccess
  | PostBirthdaysSetupFailure;
