import {
  FETCH_ADMIN_ORGANIZATION_LIST,
  FETCH_ADMIN_ORGANIZATION_LIST_SUCCESS,
  FETCH_ADMIN_ORGANIZATION_LIST_FAILURE,
  FETCH_ADMIN_ORGANIZATION,
  FETCH_ADMIN_ORGANIZATION_SUCCESS,
  FETCH_ADMIN_ORGANIZATION_FAILURE,
} from "./actionTypes";
import {
  FetchAdminOrganizationList,
  FetchAdminOrganizationListSuccessPayload,
  FetchAdminOrganizationListSuccess,
  FetchAdminOrganizationListFailurePayload,
  FetchAdminOrganizationListFailure,
  FetchAdminOrganization,
  FetchAdminOrganizationPayload,
  FetchAdminOrganizationSuccess,
  FetchAdminOrganizationSuccessPayload,
  FetchAdminOrganizationFailurePayload,
  FetchAdminOrganizationFailure,
} from "./types";

export const fetchAdminOrganizationList = (): FetchAdminOrganizationList => ({
  type: FETCH_ADMIN_ORGANIZATION_LIST,
});

export const fetchAdminOrganizationListSuccess = (
  payload: FetchAdminOrganizationListSuccessPayload
): FetchAdminOrganizationListSuccess => ({
  type: FETCH_ADMIN_ORGANIZATION_LIST_SUCCESS,
  payload,
});

export const fetchAdminOrganizationListFailure = (
  payload: FetchAdminOrganizationListFailurePayload
): FetchAdminOrganizationListFailure => ({
  type: FETCH_ADMIN_ORGANIZATION_LIST_FAILURE,
  payload,
});

export const fetchAdminOrganization = (
  payload: FetchAdminOrganizationPayload
): FetchAdminOrganization => ({
  type: FETCH_ADMIN_ORGANIZATION,
  payload,
});

export const fetchAdminOrganizationSuccess = (
  payload: FetchAdminOrganizationSuccessPayload
): FetchAdminOrganizationSuccess => ({
  type: FETCH_ADMIN_ORGANIZATION_SUCCESS,
  payload,
});

export const fetchAdminOrganizationFailure = (
  payload: FetchAdminOrganizationFailurePayload
): FetchAdminOrganizationFailure => ({
  type: FETCH_ADMIN_ORGANIZATION_FAILURE,
  payload,
});
