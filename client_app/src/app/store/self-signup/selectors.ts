import { AppState } from "../rootReducer";

export const getPendingSelector = (state: AppState) => state.selfSignup.pending;

export const getErrorSelector = (state: AppState) => state.selfSignup.error;

export const getCompletementStepsSelector = (state: AppState) =>
  state.selfSignup.completementSteps;

export const getOpenModalStepSelector = (state: AppState) =>
  state.selfSignup.openModalStep;
