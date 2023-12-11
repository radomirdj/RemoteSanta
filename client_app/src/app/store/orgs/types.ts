import { ISendPointsData } from "../admin-organization/types";
import { AuthUser, IUserBalance } from "../auth/types";
import { IClaimPointEvent } from "../claim-points-event/types";
import {
  FETCH_ORGANIZATION,
  FETCH_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATION_FAILURE,
  FETCH_ORG_TRANSACTION_LIST,
  FETCH_ORG_TRANSACTION_LIST_SUCCESS,
  FETCH_ORG_TRANSACTION_LIST_FAILURE,
  FETCH_ORG_USER_LIST,
  FETCH_ORG_USER_LIST_SUCCESS,
  FETCH_ORG_USER_LIST_FAILURE,
  FETCH_ORG_USER,
  FETCH_ORG_USER_SUCCESS,
  FETCH_ORG_USER_FAILURE,
  DELETE_ORG_USER,
  DELETE_ORG_USER_SUCCESS,
  DELETE_ORG_USER_FAILURE,
  SEND_POINTS_TO_USER,
  SEND_POINTS_TO_USER_SUCCESS,
  SEND_POINTS_TO_USER_FAILURE,
  SET_OPEN_DIALOG_SEND_POINTS,
  SET_CLOSE_DIALOG_SEND_POINTS,
  PEER_SEND_POINTS_TO_USER,
  PEER_SEND_POINTS_TO_USER_SUCCESS,
  PEER_SEND_POINTS_TO_USER_FAILURE,
  SECRET_SANTA_TRIAL,
  SECRET_SANTA_TRIAL_SUCCESS,
  SECRET_SANTA_TRIAL_FAILURE,
} from "./actionTypes";

export interface IOrganizationCountry {
  id: string;
  currencyString: string;
  countryCode: string;
  countryName: string;
  conversionRateToPoints: number;
}

export interface IOrganization {
  id: string;
  name: string;
  employeeNumber?: number;
  totalPointsPerMonth?: number;
  pointsPerMonth: number;
  balance: number;
  country?: IOrganizationCountry;
}

export interface IOrgTransaction {
  id: string;
  orgId: string;
  type: string;
  totalAmount: number;
  createdAt: Date;
  event?: IClaimPointEvent;
}

export interface IOrgUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userBalance?: IUserBalance;
  userRole?: string;
  birthDate?: string;
  org?: IOrganization;
  countryId?: string;
}

export interface OrganizationState {
  pending: boolean;
  organization: IOrganization | null;
  orgTransactionList: IOrgTransaction[];
  orgUserList: IOrgUser[];
  openDialog: boolean;
  orgUser: IOrgUser | null;
  error: string | null;
}

export interface FetchOrganizationSuccessPayload {
  organization: IOrganization;
}

export interface FetchOrganizationFailurePayload {
  error: string;
}

export interface FetchOrganizationTransactionListSuccessPayload {
  organizationTransactionList: IOrgTransaction[];
}

export interface FetchOrganizationTransactionListFailurePayload {
  error: string;
}

export interface FetchOrganizationUserListSuccessPayload {
  orgUserList: IOrgUser[];
}

export interface FetchOrganizationUserListFailurePayload {
  error: string;
}

export interface FetchOrgUserPayload {
  userId: string;
}

export interface FetchOrgUserSuccessPayload {
  user: IOrgUser;
}

export interface FetchOrgUserFailurePayload {
  error: string;
}

export interface DeleteOrgUserPayload {
  userId: string;
}

export interface DeleteOrgUserFailurePayload {
  error: string;
}

export interface SendPointsToUserPayload {
  userId: string;
  sendPointsData: ISendPointsData;
}

export interface SendPointsToUserFailurePayload {
  error: string;
}

export interface PeerSendPointsToUserPayload {
  userId: string;
  sendPointsData: ISendPointsData;
}

export interface PeerSendPointsToUserFailurePayload {
  error: string;
}

export interface SecretSantaTrialFailurePayload {
  error: string;
}

export interface FetchOrganization {
  type: typeof FETCH_ORGANIZATION;
}

export interface FetchOrganizationSuccess {
  type: typeof FETCH_ORGANIZATION_SUCCESS;
  payload: FetchOrganizationSuccessPayload;
}

export interface FetchOrganizationFailure {
  type: typeof FETCH_ORGANIZATION_FAILURE;
  payload: FetchOrganizationFailurePayload;
}

export interface FetchOrganizationTransactionList {
  type: typeof FETCH_ORG_TRANSACTION_LIST;
}

export interface FetchOrganizationTransactionListSuccess {
  type: typeof FETCH_ORG_TRANSACTION_LIST_SUCCESS;
  payload: FetchOrganizationTransactionListSuccessPayload;
}

export interface FetchOrganizationTransactionListFailure {
  type: typeof FETCH_ORG_TRANSACTION_LIST_FAILURE;
  payload: FetchOrganizationTransactionListFailurePayload;
}

export interface FetchOrganizationUserList {
  type: typeof FETCH_ORG_USER_LIST;
}

export interface FetchOrganizationUserListSuccess {
  type: typeof FETCH_ORG_USER_LIST_SUCCESS;
  payload: FetchOrganizationUserListSuccessPayload;
}

export interface FetchOrganizationUserListFailure {
  type: typeof FETCH_ORG_USER_LIST_FAILURE;
  payload: FetchOrganizationUserListFailurePayload;
}

export interface FetchOrgUser {
  type: typeof FETCH_ORG_USER;
  payload: FetchOrgUserPayload;
}

export interface FetchOrgUserSuccess {
  type: typeof FETCH_ORG_USER_SUCCESS;
  payload: FetchOrgUserSuccessPayload;
}

export interface FetchOrgUserFailure {
  type: typeof FETCH_ORG_USER_FAILURE;
  payload: FetchOrgUserFailurePayload;
}

export interface DeleteOrgUser {
  type: typeof DELETE_ORG_USER;
  payload: DeleteOrgUserPayload;
  navigate: Function;
}

export interface DeleteOrgUserSuccess {
  type: typeof DELETE_ORG_USER_SUCCESS;
}

export interface DeleteOrgUserFailure {
  type: typeof DELETE_ORG_USER_FAILURE;
  payload: DeleteOrgUserFailurePayload;
}

export interface SendPointsToUser {
  type: typeof SEND_POINTS_TO_USER;
  payload: SendPointsToUserPayload;
  navigate: Function;
}

export type SendPointsToUserSuccess = {
  type: typeof SEND_POINTS_TO_USER_SUCCESS;
};

export type SendPointsToUserFailure = {
  type: typeof SEND_POINTS_TO_USER_FAILURE;
  payload: SendPointsToUserFailurePayload;
};

export interface SetOpenDialogSendPoints {
  type: typeof SET_OPEN_DIALOG_SEND_POINTS;
}

export interface SetCloseDialogSendPoints {
  type: typeof SET_CLOSE_DIALOG_SEND_POINTS;
}

export interface PeerSendPointsToUser {
  type: typeof PEER_SEND_POINTS_TO_USER;
  payload: PeerSendPointsToUserPayload;
  navigate: Function;
}

export type PeerSendPointsToUserSuccess = {
  type: typeof PEER_SEND_POINTS_TO_USER_SUCCESS;
};

export type PeerSendPointsToUserFailure = {
  type: typeof PEER_SEND_POINTS_TO_USER_FAILURE;
  payload: PeerSendPointsToUserFailurePayload;
};

export interface SecretSantaTrial {
  type: typeof SECRET_SANTA_TRIAL;
}

export type SecretSantaTrialSuccess = {
  type: typeof SECRET_SANTA_TRIAL_SUCCESS;
};

export type SecretSantaTrialFailure = {
  type: typeof SECRET_SANTA_TRIAL_FAILURE;
  payload: SecretSantaTrialFailurePayload;
};

export type OrganizationActions =
  | FetchOrganization
  | FetchOrganizationSuccess
  | FetchOrganizationFailure
  | FetchOrganizationTransactionList
  | FetchOrganizationTransactionListSuccess
  | FetchOrganizationTransactionListFailure
  | FetchOrganizationUserList
  | FetchOrganizationUserListSuccess
  | FetchOrganizationUserListFailure
  | FetchOrgUser
  | FetchOrgUserSuccess
  | FetchOrgUserFailure
  | DeleteOrgUser
  | DeleteOrgUserSuccess
  | DeleteOrgUserFailure
  | SendPointsToUser
  | SendPointsToUserSuccess
  | SendPointsToUserFailure
  | SetOpenDialogSendPoints
  | SetCloseDialogSendPoints
  | PeerSendPointsToUser
  | PeerSendPointsToUserSuccess
  | PeerSendPointsToUserFailure
  | SecretSantaTrial
  | SecretSantaTrialSuccess
  | SecretSantaTrialFailure;
