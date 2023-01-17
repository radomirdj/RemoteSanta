import { IClaimPointEvent } from "../claim-points-event/types";
import {
  FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST,
  FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST_SUCCESS,
  FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST_FAILURE,
} from "./actionTypes";

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

export type AdminOrganizationTransactionActions =
  | FetchAdminOrganizationTransactionList
  | FetchAdminOrganizationTransactionListSuccess
  | FetchAdminOrganizationTransactionListFailure;
