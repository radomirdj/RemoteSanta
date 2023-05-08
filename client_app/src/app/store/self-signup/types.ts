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
}

export interface PostCompletementStepsSuccess {
  type: typeof POST_COMPLETEMENT_STEPS_SUCCESS;
}

export interface PostCompletementStepsFailure {
  type: typeof POST_COMPLETEMENT_STEPS_FAILURE;
  payload: PostCompletementStepsFailurePayload;
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
  | PostCompletementStepsFailure;
