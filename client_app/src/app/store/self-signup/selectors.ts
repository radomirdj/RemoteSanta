import { AppState } from "../rootReducer";

export const getPendingSelector = (state: AppState) => state.selfSignup.pending;

export const getErrorSelector = (state: AppState) => state.selfSignup.error;
