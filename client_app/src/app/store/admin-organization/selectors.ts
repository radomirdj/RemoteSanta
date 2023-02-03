import { AppState } from "../rootReducer";

export const getPendingSelector = (state: AppState) =>
  state.adminOrganization.pending;

export const getAdminOrganizationListSelector = (state: AppState) =>
  state.adminOrganization.adminOrganizationList;

export const getAdminUserListSelector = (state: AppState) =>
  state.adminOrganization.adminUserList;

export const getAdminInviteListSelector = (state: AppState) =>
  state.adminOrganization.adminInviteList;

export const getAdminOrganizationSelector = (state: AppState) =>
  state.adminOrganization.adminOrganization;

export const getAdminUserSelector = (state: AppState) =>
  state.adminOrganization.adminUser;

export const getErrorSelector = (state: AppState) =>
  state.adminOrganization.error;
