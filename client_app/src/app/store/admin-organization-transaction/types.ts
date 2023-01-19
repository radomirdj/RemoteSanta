import { IClaimPointEvent } from "../claim-points-event/types";
import {
  FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST,
  FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST_SUCCESS,
  FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST_FAILURE,
  POST_ADMIN_TO_ORG_TRANSACTION,
  POST_ADMIN_TO_ORG_TRANSACTION_SUCCESS,
  POST_ADMIN_TO_ORG_TRANSACTION_FAILURE,
} from "./actionTypes";

export interface IAdminToOrgTransaction {
  amount: number;
}

export interface IAdminOrganizationTransaction {
  id: string;
  orgId: string;
  type: string;
  totalAmount: number;
  createdAt: Date;
  event?: IClaimPointEvent;
}

export interface AdminOrganizationTransactionState {
  pending: boolean;
  adminOrganizationTransactionList: IAdminOrganizationTransaction[];
  error: string | null;
}

export interface FetchAdminOrganizationTransactionListPayload {
  organizationId: string;
}

export interface FetchAdminOrganizationTransactionListSuccessPayload {
  adminOrganizationTransactionList: IAdminOrganizationTransaction[];
}

export interface FetchAdminOrganizationTransactionListFailurePayload {
  error: string;
}

export interface PostAdminToOrgTransactionPayload {
  organizationId: string;
  adminToOrg: IAdminToOrgTransaction;
}

export interface PostAdminToOrgTransactionFailurePayload {
  error: string;
}

export interface FetchAdminOrganizationTransactionList {
  type: typeof FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST;
  payload: FetchAdminOrganizationTransactionListPayload;
}

export interface FetchAdminOrganizationTransactionListSuccess {
  type: typeof FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST_SUCCESS;
  payload: FetchAdminOrganizationTransactionListSuccessPayload;
}

export interface FetchAdminOrganizationTransactionListFailure {
  type: typeof FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST_FAILURE;
  payload: FetchAdminOrganizationTransactionListFailurePayload;
}

export interface PostAdminToOrgTransaction {
  type: typeof POST_ADMIN_TO_ORG_TRANSACTION;
  payload: PostAdminToOrgTransactionPayload;
  navigate: Function;
}

export interface PostAdminToOrgTransactionSuccess {
  type: typeof POST_ADMIN_TO_ORG_TRANSACTION_SUCCESS;
}

export interface PostAdminToOrgTransactionFailure {
  type: typeof POST_ADMIN_TO_ORG_TRANSACTION_FAILURE;
  payload: PostAdminToOrgTransactionFailurePayload;
}

export type AdminOrganizationTransactionActions =
  | FetchAdminOrganizationTransactionList
  | FetchAdminOrganizationTransactionListSuccess
  | FetchAdminOrganizationTransactionListFailure
  | PostAdminToOrgTransaction
  | PostAdminToOrgTransactionSuccess
  | PostAdminToOrgTransactionFailure;
