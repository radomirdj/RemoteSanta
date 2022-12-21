import { AppState } from "../rootReducer";

export const getPendingSelector = (state: AppState) => state.auth.pending;

export const getErrorSelector = (state: AppState) => state.auth.error;

export const getAuthUserSelector = (state: AppState) => state.auth.authUser;

export const getEmailToResetPasswordSelector = (state: AppState) => state.auth.emailToResetPassword;

export const getAuthUserTokenSelector = (state: AppState) =>
  state.auth.authUser.accessToken;
