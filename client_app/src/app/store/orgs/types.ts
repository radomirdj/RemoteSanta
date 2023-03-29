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
} from "./actionTypes";

export interface IOrganization {
  id: string;
  name: string;
  employeeNumber?: number;
  totalPointsPerMonth?: number;
  pointsPerMonth: number;
  balance: number;
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
}

export interface OrganizationState {
  pending: boolean;
  organization: IOrganization | null;
  orgTransactionList: IOrgTransaction[];
  orgUserList: IOrgUser[];
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
  | DeleteOrgUserFailure;
