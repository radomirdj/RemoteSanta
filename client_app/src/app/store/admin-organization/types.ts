import {
  FETCH_ADMIN_ORGANIZATION_LIST,
  FETCH_ADMIN_ORGANIZATION_LIST_SUCCESS,
  FETCH_ADMIN_ORGANIZATION_LIST_FAILURE,
  FETCH_ADMIN_ORGANIZATION,
  FETCH_ADMIN_ORGANIZATION_SUCCESS,
  FETCH_ADMIN_ORGANIZATION_FAILURE,
} from "./actionTypes";

export interface IAdminOrganization {
  id: string;
  name: string;
  employeeNumber?: number;
  totalPointsPerMonth?: number;
  pointsPerMonth: number;
  balance: number;
}

export interface AdminOrganizationState {
  pending: boolean;
  adminOrganizationList: IAdminOrganization[];
  adminOrganization: IAdminOrganization | null;
  error: string | null;
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

export type AdminOrganizationActions =
  | FetchAdminOrganizationList
  | FetchAdminOrganizationListSuccess
  | FetchAdminOrganizationListFailure
  | FetchAdminOrganization
  | FetchAdminOrganizationSuccess
  | FetchAdminOrganizationFailure;
