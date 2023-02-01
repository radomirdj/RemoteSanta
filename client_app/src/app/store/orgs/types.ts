import { IClaimPointEvent } from "../claim-points-event/types";
import {
  FETCH_ORGANIZATION,
  FETCH_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATION_FAILURE,
  FETCH_ORG_TRANSACTION_LIST,
  FETCH_ORG_TRANSACTION_LIST_SUCCESS,
  FETCH_ORG_TRANSACTION_LIST_FAILURE,
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

export interface OrganizationState {
  pending: boolean;
  organization: IOrganization | null;
  orgTransactionList: IOrgTransaction[];
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

export type OrganizationActions =
  | FetchOrganization
  | FetchOrganizationSuccess
  | FetchOrganizationFailure
  | FetchOrganizationTransactionList
  | FetchOrganizationTransactionListSuccess
  | FetchOrganizationTransactionListFailure;
