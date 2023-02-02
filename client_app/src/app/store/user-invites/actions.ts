import {
  FETCH_USER_INVITE_LIST,
  FETCH_USER_INVITE_LIST_SUCCESS,
  FETCH_USER_INVITE_LIST_FAILURE,
  POST_USER_INVITE,
  POST_USER_INVITE_SUCCESS,
  POST_USER_INVITE_FAILURE,
  CANCEL_USER_INVITE,
  CANCEL_USER_INVITE_SUCCESS,
  CANCEL_USER_INVITE_FAILURE,
  SET_OPEN_MODAL,
  SET_CLOSE_MODAL,
} from "./actionTypes";
import {
  CancelUserInvite,
  CancelUserInviteFailure,
  CancelUserInviteFailurePayload,
  CancelUserInvitePayload,
  CancelUserInviteSuccess,
  FetchUserInviteList,
  FetchUserInviteListFailure,
  FetchUserInviteListFailurePayload,
  FetchUserInviteListPayload,
  FetchUserInviteListSuccess,
  FetchUserInviteListSuccessPayload,
  PostUserInvite,
  PostUserInviteFailure,
  PostUserInviteFailurePayload,
  PostUserInvitePayload,
  PostUserInviteSuccess,
  SetCloseModal,
  SetOpenModal,
} from "./types";

export const fetchUserInviteList = (
  payload: FetchUserInviteListPayload
): FetchUserInviteList => ({
  type: FETCH_USER_INVITE_LIST,
  payload,
});

export const fetchUserInviteListSuccess = (
  payload: FetchUserInviteListSuccessPayload
): FetchUserInviteListSuccess => ({
  type: FETCH_USER_INVITE_LIST_SUCCESS,
  payload,
});

export const fetchUserInviteListFailure = (
  payload: FetchUserInviteListFailurePayload
): FetchUserInviteListFailure => ({
  type: FETCH_USER_INVITE_LIST_FAILURE,
  payload,
});

export const postUserInvite = (
  payload: PostUserInvitePayload
): PostUserInvite => ({
  type: POST_USER_INVITE,
  payload,
});

export const postUserInviteSuccess = (): PostUserInviteSuccess => ({
  type: POST_USER_INVITE_SUCCESS,
});

export const postUserInviteFailure = (
  payload: PostUserInviteFailurePayload
): PostUserInviteFailure => ({
  type: POST_USER_INVITE_FAILURE,
  payload,
});

export const cancelUserInvite = (
  payload: CancelUserInvitePayload
): CancelUserInvite => ({
  type: CANCEL_USER_INVITE,
  payload,
});

export const cancelUserInviteSuccess = (): CancelUserInviteSuccess => ({
  type: CANCEL_USER_INVITE_SUCCESS,
});

export const cancelUserInviteFailure = (
  payload: CancelUserInviteFailurePayload
): CancelUserInviteFailure => ({
  type: CANCEL_USER_INVITE_FAILURE,
  payload,
});

export const setOpenModal = (): SetOpenModal => ({
  type: SET_OPEN_MODAL,
});

export const setCloseModal = (): SetCloseModal => ({
  type: SET_CLOSE_MODAL,
});
