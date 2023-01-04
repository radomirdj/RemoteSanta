import {
  FETCH_ADMIN_ORGANIZATION_LIST, FETCH_ADMIN_ORGANIZATION_LIST_SUCCESS, FETCH_ADMIN_ORGANIZATION_LIST_FAILURE
} from "./actionTypes";

export interface IAdminOrganization {
  id: string;
  name:string;
  employeeNumber?: number;
  totalPointsPerMonth?: number;
  pointsPerMonth: number;
}

export interface AdminOrganizationState {
  pending: boolean;
  adminOrganizationList: IAdminOrganization[];
  error: string | null;
}

export interface FetchAdminOrganizationListSuccessPayload {
  adminOrganizationList: IAdminOrganization[];
}

export interface FetchAdminOrganizationListFailurePayload {
  error: string;
}

export interface FetchAdminOrganizationList{
  type: typeof FETCH_ADMIN_ORGANIZATION_LIST;
}

export interface FetchAdminOrganizationListSuccess {
  type: typeof FETCH_ADMIN_ORGANIZATION_LIST_SUCCESS,
  payload:FetchAdminOrganizationListSuccessPayload 
}

export interface FetchAdminOrganizationListFailure {
  type: typeof FETCH_ADMIN_ORGANIZATION_LIST_FAILURE;
  payload:FetchAdminOrganizationListFailurePayload
}

export type AdminOrganizationActions =
  | FetchAdminOrganizationList
  | FetchAdminOrganizationListSuccess
  | FetchAdminOrganizationListFailure;
