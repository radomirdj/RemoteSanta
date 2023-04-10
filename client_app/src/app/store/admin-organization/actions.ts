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
  DELETE_ADMIN_USER,
  DELETE_ADMIN_USER_SUCCESS,
  DELETE_ADMIN_USER_FAILURE,
  ADMIN_SEND_POINTS_TO_USER,
  ADMIN_SEND_POINTS_TO_USER_SUCCESS,
  ADMIN_SEND_POINTS_TO_USER_FAILURE,
  SET_OPEN_MODAL,
  SET_CLOSE_MODAL,
  SET_OPEN_DIALOG,
  SET_CLOSE_DIALOG,
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
  DeleteAdminUser,
  DeleteAdminUserPayload,
  DeleteAdminUserSuccess,
  DeleteAdminUserFailurePayload,
  DeleteAdminUserFailure,
  AdminSendPointsToUser,
  AdminSendPointsToUserPayload,
  AdminSendPointsToUserSuccess,
  AdminSendPointsToUserFailurePayload,
  AdminSendPointsToUserFailure,
  SetOpenModal,
  SetCloseModal,
  SetOpenDialog,
  SetCloseDialog,
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

export const deleteAdminUser = (
  payload: DeleteAdminUserPayload,
  navigate: Function
): DeleteAdminUser => ({
  type: DELETE_ADMIN_USER,
  payload,
  navigate,
});

export const deleteAdminUserSuccess = (): DeleteAdminUserSuccess => ({
  type: DELETE_ADMIN_USER_SUCCESS,
});

export const deleteAdminUserFailure = (
  payload: DeleteAdminUserFailurePayload
): DeleteAdminUserFailure => ({
  type: DELETE_ADMIN_USER_FAILURE,
  payload,
});

export const adminSendPointsToUser = (
  payload: AdminSendPointsToUserPayload,
  navigate: Function
): AdminSendPointsToUser => ({
  type: ADMIN_SEND_POINTS_TO_USER,
  payload,
  navigate,
});

export const adminSendPointsToUserSuccess =
  (): AdminSendPointsToUserSuccess => ({
    type: ADMIN_SEND_POINTS_TO_USER_SUCCESS,
  });

export const adminSendPointsToUserFailure = (
  payload: AdminSendPointsToUserFailurePayload
): AdminSendPointsToUserFailure => ({
  type: ADMIN_SEND_POINTS_TO_USER_FAILURE,
  payload,
});

export const setOpenModal = (): SetOpenModal => ({
  type: SET_OPEN_MODAL,
});

export const setCloseModal = (): SetCloseModal => ({
  type: SET_CLOSE_MODAL,
});

export const setOpenDialog = (): SetOpenDialog => ({
  type: SET_OPEN_DIALOG,
});

export const setCloseDialog = (): SetCloseDialog => ({
  type: SET_CLOSE_DIALOG,
});
