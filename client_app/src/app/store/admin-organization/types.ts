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
} from "./actionTypes";

export interface IAdminOrganization {
  id: string;
  name: string;
  employeeNumber?: number;
  totalPointsPerMonth?: number;
  pointsPerMonth: number;
  balance: number;
}

export interface IAdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AdminOrganizationState {
  pending: boolean;
  adminOrganizationList: IAdminOrganization[];
  adminOrganization: IAdminOrganization | null;
  adminUserList: IAdminUser[];
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

export interface FetchAdminUserListPayload {
  organizationId: string;
}

export interface FetchAdminUserListSuccessPayload {
  adminUserList: IAdminUser[];
}

export interface FetchAdminUserListFailurePayload {
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

export type AdminOrganizationActions =
  | FetchAdminOrganizationList
  | FetchAdminOrganizationListSuccess
  | FetchAdminOrganizationListFailure
  | FetchAdminOrganization
  | FetchAdminOrganizationSuccess
  | FetchAdminOrganizationFailure
  | FetchAdminUserList
  | FetchAdminUserListSuccess
  | FetchAdminUserListFailure;
