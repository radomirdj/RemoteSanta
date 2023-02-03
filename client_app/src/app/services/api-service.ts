import axios from "axios";
import {
  DeclineAdminGiftCardRequestPayload,
  FetchAdminGiftCardRequestPayload,
  FetchAdminGiftCardRequestUserPayload,
  FulfillAdminGiftCardRequestPayload,
  IAdminGiftCardRequest,
} from "../store/admin-gift-card-requests/types";
import {
  FetchAdminOrganizationTransactionListPayload,
  IAdminOrganizationTransaction,
  PostAdminToOrgTransactionPayload,
  PostOrgToEmployeesTransactionPayload,
} from "../store/admin-organization-transaction/types";
import {
  CancelAdminInvitePayload,
  FetchAdminInviteListPayload,
  FetchAdminOrganizationPayload,
  FetchAdminUserListPayload,
  FetchAdminUserPayload,
  IAdminInvite,
  IAdminOrganization,
  IAdminUser,
  PostAdminInvitePayload,
} from "../store/admin-organization/types";
import { AuthUser } from "../store/auth/types";
import { IOrganization, IOrgTransaction, IOrgUser } from "../store/orgs/types";
import {
  CancelUserInvitePayload,
  FetchUserInviteListPayload,
  IUserInvite,
  PostUserInvitePayload,
} from "../store/user-invites/types";

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

export const getAdminUserList = (
  payload: FetchAdminUserListPayload,
  token: string
) =>
  api.get<IAdminUser[]>(`admin/orgs/${payload.organizationId}/users/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAdminInviteList = (
  payload: FetchAdminInviteListPayload,
  token: string
) =>
  api.get<IAdminInvite[]>(
    `admin/orgs/${payload.organizationId}/user-invites/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const getAdminOrganization = (
  payload: FetchAdminOrganizationPayload,
  token: string
) =>
  api.get<IAdminOrganization>(`admin/orgs/${payload.organizationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getUserSelf = async (token: string) => {
  const response = await api.get<string>("users/self", {
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

export const postOrganizationToEmployeesTransaction = (
  token: string,
  payload: PostOrgToEmployeesTransactionPayload
) => {
  return api.post<string>(
    `admin/orgs/${payload.organizationId}/transactions/org-to-employees/`,
    payload.orgToEmployees,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getAdminGiftCardRequest = (
  payload: FetchAdminGiftCardRequestPayload,
  token: string
) =>
  api.get<IAdminGiftCardRequest>(
    `admin/gift-card-requests/${payload.giftCardRequestId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const getAdminGiftCardRequestUser = (
  payload: FetchAdminGiftCardRequestUserPayload,
  token: string
) =>
  api.get<AuthUser>(`admin/users/${payload.userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fulfillGiftCardRequest = (
  payload: FulfillAdminGiftCardRequestPayload,
  token: string
) => {
  return api.post<string>(
    `admin/gift-card-requests/${payload.giftCardRequestId}/fulfill`,
    payload.fulfillData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const declineGiftCardRequest = (
  payload: DeclineAdminGiftCardRequestPayload,
  token: String
) => {
  return api.post<string>(
    `admin/gift-card-requests/${payload.giftCardRequestId}/decline`,
    payload.declineData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const postInviteAdmin = (
  payload: PostAdminInvitePayload,
  token: string
) => {
  return api.post<string>(
    `admin/orgs/${payload.orgId}/user-invites/`,
    payload.inviteData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const cancelInviteAdmin = (
  payload: CancelAdminInvitePayload,
  token: string
) => {
  return api.post<string>(
    `admin/user-invites/${payload.inviteId}/cancel`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getOrganization = (token: string) =>
  api.get<IOrganization>(`orgs/current_org`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrganizationTransactionList = (token: string) =>
  api.get<IOrgTransaction[]>(`orgs/current_org/transactions/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrganizationUserList = (token: string) =>
  api.get<IOrgUser[]>(`orgs/current_org/users/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const cancelInviteUser = (
  payload: CancelUserInvitePayload,
  token: string
) => {
  return api.post<string>(
    `user-invites/${payload.inviteId}/cancel`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const postInviteUser = (
  payload: PostUserInvitePayload,
  token: string
) => {
  return api.post<string>(`user-invites/`, payload.inviteData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserInviteList = (
  payload: FetchUserInviteListPayload,
  token: string
) =>
  api.get<IUserInvite[]>(`user-invites/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAdminUser = (payload: FetchAdminUserPayload, token: string) =>
  api.get<IAdminUser>(`admin/users/${payload.userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
