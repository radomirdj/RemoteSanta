import {
  FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST,
  FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST_SUCCESS,
  FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST_FAILURE,
} from "./actionTypes";
import {
  FetchAdminOrganizationTransactionList,
  FetchAdminOrganizationTransactionListSuccessPayload,
  FetchAdminOrganizationTransactionListSuccess,
  FetchAdminOrganizationTransactionListFailurePayload,
  FetchAdminOrganizationTransactionListFailure,
  FetchAdminOrganizationTransactionListPayload,
} from "./types";

export const fetchAdminOrganizationTransactionList = (
  payload: FetchAdminOrganizationTransactionListPayload
): FetchAdminOrganizationTransactionList => ({
  type: FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST,
  payload,
});

export const fetchAdminOrganizationTransactionListSuccess = (
  payload: FetchAdminOrganizationTransactionListSuccessPayload
): FetchAdminOrganizationTransactionListSuccess => ({
  type: FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST_SUCCESS,
  payload,
});

export const fetchAdminOrganizationTransactionListFailure = (
  payload: FetchAdminOrganizationTransactionListFailurePayload
): FetchAdminOrganizationTransactionListFailure => ({
  type: FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST_FAILURE,
  payload,
});
