import { AppState } from "../rootReducer";

export const getPendingSelector = (state: AppState) =>
  state.adminOrganization.pending;

export const getAdminOrganizationListSelector = (state: AppState) =>
  state.adminOrganization.adminOrganizationList;

export const getAdminUserListSelector = (state: AppState) =>
  state.adminOrganization.adminUserList;

export const getAdminOrganizationSelector = (state: AppState) =>
  state.adminOrganization.adminOrganization;

export const getErrorSelector = (state: AppState) =>
  state.adminOrganization.error;
