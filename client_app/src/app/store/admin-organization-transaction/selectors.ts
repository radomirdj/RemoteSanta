import { AppState } from "../rootReducer";

export const getPendingSelector = (state: AppState) =>
  state.adminOrganizationTransaction.pending;

export const getAdminOrganizationTransactionListSelector = (state: AppState) =>
  state.adminOrganizationTransaction.adminOrganizationTransactionList;

export const getErrorSelector = (state: AppState) =>
  state.adminOrganizationTransaction.error;
