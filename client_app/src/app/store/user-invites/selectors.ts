import { AppState } from "../rootReducer";

export const getPendingSelector = (state: AppState) => state.userInvite.pending;

export const getUserInviteListSelector = (state: AppState) =>
  state.userInvite.userInviteList;

export const getOpenModalSelector = (state: AppState) =>
  state.userInvite.openModal;

export const getOpenDialogSelector = (state: AppState) =>
  state.userInvite.openDialog;

export const getErrorSelector = (state: AppState) => state.userInvite.error;
