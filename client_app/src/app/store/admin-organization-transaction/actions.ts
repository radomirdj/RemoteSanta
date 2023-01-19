import {
  FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST,
  FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST_SUCCESS,
  FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST_FAILURE,
  POST_ADMIN_TO_ORG_TRANSACTION,
  POST_ADMIN_TO_ORG_TRANSACTION_SUCCESS,
  POST_ADMIN_TO_ORG_TRANSACTION_FAILURE,
} from "./actionTypes";
import {
  FetchAdminOrganizationTransactionList,
  FetchAdminOrganizationTransactionListSuccessPayload,
  FetchAdminOrganizationTransactionListSuccess,
  FetchAdminOrganizationTransactionListFailurePayload,
  FetchAdminOrganizationTransactionListFailure,
  FetchAdminOrganizationTransactionListPayload,
  PostAdminToOrgTransaction,
  PostAdminToOrgTransactionSuccess,
  PostAdminToOrgTransactionFailure,
  PostAdminToOrgTransactionPayload,
  PostAdminToOrgTransactionFailurePayload,
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

export const postAdminToOrgTransaction = (
  payload: PostAdminToOrgTransactionPayload,
  navigate: Function
): PostAdminToOrgTransaction => ({
  type: POST_ADMIN_TO_ORG_TRANSACTION,
  payload,
  navigate,
});

export const postAdminToOrgTransactionSuccess =
  (): PostAdminToOrgTransactionSuccess => ({
    type: POST_ADMIN_TO_ORG_TRANSACTION_SUCCESS,
  });

export const postAdminToOrgTransactionFailure = (
  payload: PostAdminToOrgTransactionFailurePayload
): PostAdminToOrgTransactionFailure => ({
  type: POST_ADMIN_TO_ORG_TRANSACTION_FAILURE,
  payload,
});
