import { AuthUser } from "../auth/types";
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

export interface IAdminOrganization {
  id: string;
  name: string;
  employeeNumber?: number;
  totalPointsPerMonth?: number;
  pointsPerMonth: number;
  balance: number;
  isTestOrg?: boolean;
}

export interface IAdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userRole?: string;
}

export interface IAdminInvite {
  id: string;
  email: string;
  status: string;
  createdAt: Date;
  userRole: string;
}

export interface AdminOrganizationState {
  pending: boolean;
  adminOrganizationList: IAdminOrganization[];
  adminOrganization: IAdminOrganization | null;
  adminUserList: IAdminUser[];
  adminUser: AuthUser | null;
  adminInviteList: IAdminInvite[];
  error: string | null;
}

export interface IInvite {
  email: string;
  userRole: string;
}

export interface ISendPointsData {
  amount: number;
  message: string;
}

export interface FetchAdminOrganizationListSuccessPayload {
  adminOrganizationList: IAdminOrganization[];
}

export interface FetchAdminOrganizationListFailurePayload {
  error: string;
}

export interface FetchAdminOrganizationPayload {
  organizationId: string;
}

export interface FetchAdminOrganizationSuccessPayload {
  adminOrganization: IAdminOrganization;
}

export interface FetchAdminOrganizationFailurePayload {
  error: string;
}

export interface FetchAdminUserListPayload {
  organizationId: string;
}

export interface FetchAdminUserListSuccessPayload {
  adminUserList: IAdminUser[];
}

export interface FetchAdminUserListFailurePayload {
  error: string;
}

export interface FetchAdminInviteListPayload {
  organizationId: string;
}

export interface FetchAdminInviteListSuccessPayload {
  adminInviteList: IAdminInvite[];
}

export interface FetchAdminInviteListFailurePayload {
  error: string;
}

export interface PostAdminInvitePayload {
  orgId: string;
  inviteData: IInvite;
}

export interface PostAdminInviteFailurePayload {
  error: string;
}

export interface CancelAdminInvitePayload {
  inviteId: string;
  orgId: string;
}

export interface CancelAdminInviteFailurePayload {
  error: string;
}

export interface FetchAdminUserPayload {
  userId: string;
}

export interface FetchAdminUserSuccessPayload {
  adminUser: AuthUser;
}

export interface FetchAdminUserFailurePayload {
  error: string;
}

export interface DeleteAdminUserPayload {
  userId: string;
  organizationId: string;
}

export interface DeleteAdminUserFailurePayload {
  error: string;
}

export interface AdminSendPointsToUserPayload {
  userId: string;
  orgId: string;
  sendPointsData: ISendPointsData;
}

export interface AdminSendPointsToUserFailurePayload {
  error: string;
}

export interface FetchAdminOrganizationList {
  type: typeof FETCH_ADMIN_ORGANIZATION_LIST;
}

export interface FetchAdminOrganizationListSuccess {
  type: typeof FETCH_ADMIN_ORGANIZATION_LIST_SUCCESS;
  payload: FetchAdminOrganizationListSuccessPayload;
}

export interface FetchAdminOrganizationListFailure {
  type: typeof FETCH_ADMIN_ORGANIZATION_LIST_FAILURE;
  payload: FetchAdminOrganizationListFailurePayload;
}

export interface FetchAdminOrganization {
  type: typeof FETCH_ADMIN_ORGANIZATION;
  payload: FetchAdminOrganizationPayload;
}

export interface FetchAdminOrganizationSuccess {
  type: typeof FETCH_ADMIN_ORGANIZATION_SUCCESS;
  payload: FetchAdminOrganizationSuccessPayload;
}

export interface FetchAdminOrganizationFailure {
  type: typeof FETCH_ADMIN_ORGANIZATION_FAILURE;
  payload: FetchAdminOrganizationFailurePayload;
}

export interface FetchAdminUserList {
  type: typeof FETCH_ADMIN_USER_LIST;
  payload: FetchAdminUserListPayload;
}

export interface FetchAdminUserListSuccess {
  type: typeof FETCH_ADMIN_USER_LIST_SUCCESS;
  payload: FetchAdminUserListSuccessPayload;
}

export interface FetchAdminUserListFailure {
  type: typeof FETCH_ADMIN_USER_LIST_FAILURE;
  payload: FetchAdminUserListFailurePayload;
}

export interface FetchAdminInviteList {
  type: typeof FETCH_ADMIN_INVITE_LIST;
  payload: FetchAdminInviteListPayload;
}

export interface FetchAdminInviteListSuccess {
  type: typeof FETCH_ADMIN_INVITE_LIST_SUCCESS;
  payload: FetchAdminInviteListSuccessPayload;
}

export interface FetchAdminInviteListFailure {
  type: typeof FETCH_ADMIN_INVITE_LIST_FAILURE;
  payload: FetchAdminInviteListFailurePayload;
}

export interface PostAdminInvite {
  type: typeof POST_ADMIN_INVITE;
  payload: PostAdminInvitePayload;
}

export type PostAdminInviteSuccess = {
  type: typeof POST_ADMIN_INVITE_SUCCESS;
};

export type PostAdminInviteFailure = {
  type: typeof POST_ADMIN_INVITE_FAILURE;
  payload: PostAdminInviteFailurePayload;
};

export interface CancelAdminInvite {
  type: typeof CANCEL_ADMIN_INVITE;
  payload: CancelAdminInvitePayload;
}

export type CancelAdminInviteSuccess = {
  type: typeof CANCEL_ADMIN_INVITE_SUCCESS;
};

export type CancelAdminInviteFailure = {
  type: typeof CANCEL_ADMIN_INVITE_FAILURE;
  payload: CancelAdminInviteFailurePayload;
};

export interface FetchAdminUser {
  type: typeof FETCH_ADMIN_USER;
  payload: FetchAdminUserPayload;
}

export interface FetchAdminUserSuccess {
  type: typeof FETCH_ADMIN_USER_SUCCESS;
  payload: FetchAdminUserSuccessPayload;
}

export interface FetchAdminUserFailure {
  type: typeof FETCH_ADMIN_USER_FAILURE;
  payload: FetchAdminUserFailurePayload;
}

export interface DeleteAdminUser {
  type: typeof DELETE_ADMIN_USER;
  payload: DeleteAdminUserPayload;
  navigate: Function;
}

export interface DeleteAdminUserSuccess {
  type: typeof DELETE_ADMIN_USER_SUCCESS;
}

export interface DeleteAdminUserFailure {
  type: typeof DELETE_ADMIN_USER_FAILURE;
  payload: DeleteAdminUserFailurePayload;
}

export interface AdminSendPointsToUser {
  type: typeof ADMIN_SEND_POINTS_TO_USER;
  payload: AdminSendPointsToUserPayload;
  navigate: Function;
}

export type AdminSendPointsToUserSuccess = {
  type: typeof ADMIN_SEND_POINTS_TO_USER_SUCCESS;
};

export type AdminSendPointsToUserFailure = {
  type: typeof ADMIN_SEND_POINTS_TO_USER_FAILURE;
  payload: AdminSendPointsToUserFailurePayload;
};

export interface SetOpenModal {
  type: typeof SET_OPEN_MODAL;
}

export interface SetCloseModal {
  type: typeof SET_CLOSE_MODAL;
}

export interface SetOpenDialog {
  type: typeof SET_OPEN_DIALOG;
}

export interface SetCloseDialog {
  type: typeof SET_CLOSE_DIALOG;
}

export type AdminOrganizationActions =
  | FetchAdminOrganizationList
  | FetchAdminOrganizationListSuccess
  | FetchAdminOrganizationListFailure
  | FetchAdminOrganization
  | FetchAdminOrganizationSuccess
  | FetchAdminOrganizationFailure
  | FetchAdminUserList
  | FetchAdminUserListSuccess
  | FetchAdminUserListFailure
  | FetchAdminInviteList
  | FetchAdminInviteListSuccess
  | FetchAdminInviteListFailure
  | PostAdminInvite
  | PostAdminInviteSuccess
  | PostAdminInviteFailure
  | CancelAdminInvite
  | CancelAdminInviteSuccess
  | CancelAdminInviteFailure
  | FetchAdminUser
  | FetchAdminUserSuccess
  | FetchAdminUserFailure
  | DeleteAdminUser
  | DeleteAdminUserSuccess
  | DeleteAdminUserFailure
  | AdminSendPointsToUser
  | AdminSendPointsToUserSuccess
  | AdminSendPointsToUserFailure
  | SetOpenModal
  | SetCloseModal
  | SetOpenDialog
  | SetCloseDialog;
