import axios from "axios";
import {
  FetchAdminOrganizationTransactionListPayload,
  IAdminOrganizationTransaction,
  PostAdminToOrgTransactionPayload,
} from "../store/admin-organization-transaction/types";
import {
  FetchAdminOrganizationPayload,
  IAdminOrganization,
} from "../store/admin-organization/types";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const getAdminOrganizationTransactionList = (
  payload: FetchAdminOrganizationTransactionListPayload,
  token: string
) =>
  api.get<IAdminOrganizationTransaction[]>(
    `admin/orgs/${payload.organizationId}/transactions/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const getAdminOrganizationList = (token: string) =>
  api.get<IAdminOrganization[]>("admin/orgs/", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAdminOrganization = (
  payload: FetchAdminOrganizationPayload,
  token: string
) =>
  api.get<IAdminOrganization>(`admin/orgs/${payload.organizationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getUserSelf = async (token: string) => {
  const response = await api.get<string>("api/users/self", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return { authUser: response.data };
};

export const postAdminToOrganizationTransaction = (
  token: string,
  payload: PostAdminToOrgTransactionPayload
) => {
  return api.post<string>(
    `admin/orgs/${payload.organizationId}/transactions/admin-to-org/`,
    payload.adminToOrg,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
