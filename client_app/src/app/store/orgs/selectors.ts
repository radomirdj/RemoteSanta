import { AppState } from "../rootReducer";

export const getPendingSelector = (state: AppState) =>
  state.organization.pending;

export const getOrganizationSelector = (state: AppState) =>
  state.organization.organization;

export const getOrganizationTransactionListSelector = (state: AppState) =>
  state.organization.orgTransactionList;

export const getOrganizationUserListSelector = (state: AppState) =>
  state.organization.orgUserList;

export const getErrorSelector = (state: AppState) => state.organization.error;

export const getOrganizationUserSelector = (state: AppState) =>
  state.organization.orgUser;

export const getOpenDialogSendPointsSelector = (state: AppState) =>
  state.organization.openDialog;
