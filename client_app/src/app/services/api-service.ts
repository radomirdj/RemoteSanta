import axios from "axios";
import {
  FetchAdminOrganizationTransactionListPayload,
  IAdminOrganizationTransaction,
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
  const response = await axios.get<string>("api/users/self", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return { authUser: response.data };
};
