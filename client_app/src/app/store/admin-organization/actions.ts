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
  POST_ADMIN_INVITE,
  POST_ADMIN_INVITE_SUCCESS,
  POST_ADMIN_INVITE_FAILURE,
  CANCEL_ADMIN_INVITE,
  CANCEL_ADMIN_INVITE_SUCCESS,
  CANCEL_ADMIN_INVITE_FAILURE,
  FETCH_ADMIN_USER,
  FETCH_ADMIN_USER_SUCCESS,
  FETCH_ADMIN_USER_FAILURE,
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
  PostAdminInvitePayload,
  PostAdminInvite,
  PostAdminInviteSuccess,
  PostAdminInviteFailurePayload,
  PostAdminInviteFailure,
  CancelAdminInvitePayload,
  CancelAdminInvite,
  CancelAdminInviteSuccess,
  CancelAdminInviteFailurePayload,
  CancelAdminInviteFailure,
  FetchAdminUserPayload,
  FetchAdminUser,
  FetchAdminUserSuccessPayload,
  FetchAdminUserSuccess,
  FetchAdminUserFailurePayload,
  FetchAdminUserFailure,
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

export const postAdminInvite = (
  payload: PostAdminInvitePayload
): PostAdminInvite => ({
  type: POST_ADMIN_INVITE,
  payload,
});

export const postAdminInviteSuccess = (): PostAdminInviteSuccess => ({
  type: POST_ADMIN_INVITE_SUCCESS,
});

export const postAdminInviteFailure = (
  payload: PostAdminInviteFailurePayload
): PostAdminInviteFailure => ({
  type: POST_ADMIN_INVITE_FAILURE,
  payload,
});

export const cancelAdminInvite = (
  payload: CancelAdminInvitePayload
): CancelAdminInvite => ({
  type: CANCEL_ADMIN_INVITE,
  payload,
});

export const cancelAdminInviteSuccess = (): CancelAdminInviteSuccess => ({
  type: CANCEL_ADMIN_INVITE_SUCCESS,
});

export const cancelAdminInviteFailure = (
  payload: CancelAdminInviteFailurePayload
): CancelAdminInviteFailure => ({
  type: CANCEL_ADMIN_INVITE_FAILURE,
  payload,
});

export const fetchAdminUser = (
  payload: FetchAdminUserPayload
): FetchAdminUser => ({
  type: FETCH_ADMIN_USER,
  payload,
});

export const fetchAdminUserSuccess = (
  payload: FetchAdminUserSuccessPayload
): FetchAdminUserSuccess => ({
  type: FETCH_ADMIN_USER_SUCCESS,
  payload,
});

export const fetchAdminUserFailure = (
  payload: FetchAdminUserFailurePayload
): FetchAdminUserFailure => ({
  type: FETCH_ADMIN_USER_FAILURE,
  payload,
});
