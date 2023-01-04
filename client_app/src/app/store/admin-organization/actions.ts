import {
  FETCH_ADMIN_ORGANIZATION_LIST,
  FETCH_ADMIN_ORGANIZATION_LIST_SUCCESS,
  FETCH_ADMIN_ORGANIZATION_LIST_FAILURE,
} from "./actionTypes";
import {
  FetchAdminOrganizationList,
  FetchAdminOrganizationListSuccessPayload,
  FetchAdminOrganizationListSuccess,
  FetchAdminOrganizationListFailurePayload,
  FetchAdminOrganizationListFailure,
} from "./types";

export const fetchAdminOrganizationList = (): FetchAdminOrganizationList => ({
  type: FETCH_ADMIN_ORGANIZATION_LIST
});

export const fetchAdminOrganizationListSuccess = (
  payload: FetchAdminOrganizationListSuccessPayload
): FetchAdminOrganizationListSuccess => ({
  type: FETCH_ADMIN_ORGANIZATION_LIST_SUCCESS,
  payload
});

export const fetchAdminOrganizationListFailure = (
  payload: FetchAdminOrganizationListFailurePayload
): FetchAdminOrganizationListFailure => ({
  type: FETCH_ADMIN_ORGANIZATION_LIST_FAILURE,
  payload
});
