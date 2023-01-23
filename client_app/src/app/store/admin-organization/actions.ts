import {
  FETCH_ADMIN_ORGANIZATION_LIST,
  FETCH_ADMIN_ORGANIZATION_LIST_SUCCESS,
  FETCH_ADMIN_ORGANIZATION_LIST_FAILURE,
  FETCH_ADMIN_ORGANIZATION,
  FETCH_ADMIN_ORGANIZATION_SUCCESS,
  FETCH_ADMIN_ORGANIZATION_FAILURE,
  FETCH_ADMIN_USER_LIST,
  FETCH_ADMIN_USER_LIST_SUCCESS,
  FETCH_ADMIN_USER_LIST_FAILURE,
  FETCH_ADMIN_INVITE_LIST,
  FETCH_ADMIN_INVITE_LIST_SUCCESS,
  FETCH_ADMIN_INVITE_LIST_FAILURE,
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
  FetchAdminUserList,
  FetchAdminUserListSuccessPayload,
  FetchAdminUserListSuccess,
  FetchAdminUserListFailurePayload,
  FetchAdminUserListFailure,
  FetchAdminUserListPayload,
  FetchAdminInviteListPayload,
  FetchAdminInviteList,
  FetchAdminInviteListSuccessPayload,
  FetchAdminInviteListSuccess,
  FetchAdminInviteListFailure,
  FetchAdminInviteListFailurePayload,
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

export const fetchAdminUserList = (
  payload: FetchAdminUserListPayload
): FetchAdminUserList => ({
  type: FETCH_ADMIN_USER_LIST,
  payload,
});

export const fetchAdminUserListSuccess = (
  payload: FetchAdminUserListSuccessPayload
): FetchAdminUserListSuccess => ({
  type: FETCH_ADMIN_USER_LIST_SUCCESS,
  payload,
});

export const fetchAdminUserListFailure = (
  payload: FetchAdminUserListFailurePayload
): FetchAdminUserListFailure => ({
  type: FETCH_ADMIN_USER_LIST_FAILURE,
  payload,
});

export const fetchAdminInviteList = (
  payload: FetchAdminInviteListPayload
): FetchAdminInviteList => ({
  type: FETCH_ADMIN_INVITE_LIST,
  payload,
});

export const fetchAdminInviteListSuccess = (
  payload: FetchAdminInviteListSuccessPayload
): FetchAdminInviteListSuccess => ({
  type: FETCH_ADMIN_INVITE_LIST_SUCCESS,
  payload,
});

export const fetchAdminInviteListFailure = (
  payload: FetchAdminInviteListFailurePayload
): FetchAdminInviteListFailure => ({
  type: FETCH_ADMIN_INVITE_LIST_FAILURE,
  payload,
});
