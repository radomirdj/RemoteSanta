import { AppState } from "../rootReducer";

export const getPendingSelector = (state: AppState) => state.adminOrganization.pending;

export const getAdminOrganizationListSelector = (state: AppState) => state.adminOrganization.adminOrganizationList;

export const getErrorSelector = (state: AppState) => state.adminOrganization.error;
