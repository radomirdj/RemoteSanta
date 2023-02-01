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
} from "./actionTypes";

export interface IUserInvite {
  id: string;
  email: string;
  status: string;
  createdAt: Date;
}

export interface UserInviteState {
  pending: boolean;
  userInviteList: IUserInvite[];
  error: string | null;
}

export interface IInvite {
  email: string;
}

export interface FetchUserInviteListPayload {
  organizationId: string;
}

export interface FetchUserInviteListSuccessPayload {
  userInviteList: IUserInvite[];
}

export interface FetchUserInviteListFailurePayload {
  error: string;
}

export interface PostUserInvitePayload {
  orgId: string;
  inviteData: IInvite;
}

export interface PostUserInviteFailurePayload {
  error: string;
}

export interface CancelUserInvitePayload {
  inviteId: string;
}

export interface CancelUserInviteFailurePayload {
  error: string;
}

export interface FetchUserInviteList {
  type: typeof FETCH_USER_INVITE_LIST;
  payload: FetchUserInviteListPayload;
}

export interface FetchUserInviteListSuccess {
  type: typeof FETCH_USER_INVITE_LIST_SUCCESS;
  payload: FetchUserInviteListSuccessPayload;
}

export interface FetchUserInviteListFailure {
  type: typeof FETCH_USER_INVITE_LIST_FAILURE;
  payload: FetchUserInviteListFailurePayload;
}

export interface PostUserInvite {
  type: typeof POST_USER_INVITE;
  payload: PostUserInvitePayload;
}

export type PostUserInviteSuccess = {
  type: typeof POST_USER_INVITE_SUCCESS;
};

export type PostUserInviteFailure = {
  type: typeof POST_USER_INVITE_FAILURE;
  payload: PostUserInviteFailurePayload;
};

export interface CancelUserInvite {
  type: typeof CANCEL_USER_INVITE;
  payload: CancelUserInvitePayload;
}

export type CancelUserInviteSuccess = {
  type: typeof CANCEL_USER_INVITE_SUCCESS;
};

export type CancelUserInviteFailure = {
  type: typeof CANCEL_USER_INVITE_FAILURE;
  payload: CancelUserInviteFailurePayload;
};

export type UserInviteActions =
  | FetchUserInviteList
  | FetchUserInviteListSuccess
  | FetchUserInviteListFailure
  | PostUserInvite
  | PostUserInviteSuccess
  | PostUserInviteFailure
  | CancelUserInvite
  | CancelUserInviteSuccess
  | CancelUserInviteFailure;
