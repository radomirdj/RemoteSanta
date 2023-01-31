import { AuthUser } from "../auth/types";
import {
  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST,
  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_SUCCESS,
  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_FAILURE,
  FETCH_ADMIN_GIFT_CARD_REQUEST,
  FETCH_ADMIN_GIFT_CARD_REQUEST_SUCCESS,
  FETCH_ADMIN_GIFT_CARD_REQUEST_FAILURE,
  FETCH_ADMIN_GIFT_CARD_REQUEST_USER,
  FETCH_ADMIN_GIFT_CARD_REQUEST_USER_SUCCESS,
  FETCH_ADMIN_GIFT_CARD_REQUEST_USER_FAILURE,
  FULFILL_ADMIN_GIFT_CARD_REQUEST,
  FULFILL_ADMIN_GIFT_CARD_REQUEST_SUCCESS,
  FULFILL_ADMIN_GIFT_CARD_REQUEST_FAILURE,
  DECLINE_ADMIN_GIFT_CARD_REQUEST,
  DECLINE_ADMIN_GIFT_CARD_REQUEST_SUCCESS,
  DECLINE_ADMIN_GIFT_CARD_REQUEST_FAILURE,
} from "./actionTypes";

export interface IAdminGiftCardIntegration {
  id: string;
  website: string;
  image: string;
  title: string;
  description: string;
  constraintType: string;
  priority: number;
  constraintJson: string;
}

export interface IAdminGiftCardRequest {
  id: string;
  adminComment: string;
  userId: string;
  giftCardIntegrationId: string;
  amount: string;
  status: string;
  giftCardIntegration: IAdminGiftCardIntegration;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminGiftCardRequestState {
  pending: boolean;
  adminGiftCardRequestList: IAdminGiftCardRequest[];
  adminGiftCardRequest: IAdminGiftCardRequest | null;
  adminGiftCardRequestUser: AuthUser | null;
  error: string | null;
}

export interface IFulfillPayload {
  description?: string;
  url: string;
}

export interface IDeclinePayload {
  adminComment: string;
}

export interface FetchAdminGiftCardRequestListSuccessPayload {
  adminGiftCardRequestList: IAdminGiftCardRequest[];
}

export interface FetchAdminGiftCardRequestListFailurePayload {
  error: string;
}

export interface FetchAdminGiftCardRequestPayload {
  giftCardRequestId: string;
}

export interface FetchAdminGiftCardRequestSuccessPayload {
  adminGiftCardRequest: IAdminGiftCardRequest;
}

export interface FetchAdminGiftCardRequestFailurePayload {
  error: string;
}

export interface FetchAdminGiftCardRequestUserPayload {
  userId: string;
}

export interface FetchAdminGiftCardRequestUserSuccessPayload {
  adminGiftCardRequestUser: AuthUser;
}

export interface FetchAdminGiftCardRequestUserFailurePayload {
  error: string;
}

export interface FulfillAdminGiftCardRequestPayload {
  giftCardRequestId: string;
  fulfillData: IFulfillPayload;
}

export interface FulfillAdminGiftCardRequestFailurePayload {
  error: string;
}

export interface DeclineAdminGiftCardRequestPayload {
  giftCardRequestId: string;
  declineData: IDeclinePayload;
}

export interface DeclineAdminGiftCardRequestFailurePayload {
  error: string;
}

export interface FetchAdminGiftCardRequestList {
  type: typeof FETCH_ADMIN_GIFT_CARD_REQUEST_LIST;
}

export interface FetchAdminGiftCardRequestListSuccess {
  type: typeof FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_SUCCESS;
  payload: FetchAdminGiftCardRequestListSuccessPayload;
}

export interface FetchAdminGiftCardRequestListFailure {
  type: typeof FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_FAILURE;
  payload: FetchAdminGiftCardRequestListFailurePayload;
}

export interface FetchAdminGiftCardRequest {
  type: typeof FETCH_ADMIN_GIFT_CARD_REQUEST;
  payload: FetchAdminGiftCardRequestPayload;
}

export interface FetchAdminGiftCardRequestSuccess {
  type: typeof FETCH_ADMIN_GIFT_CARD_REQUEST_SUCCESS;
  payload: FetchAdminGiftCardRequestSuccessPayload;
}

export interface FetchAdminGiftCardRequestFailure {
  type: typeof FETCH_ADMIN_GIFT_CARD_REQUEST_FAILURE;
  payload: FetchAdminGiftCardRequestFailurePayload;
}

export interface FetchAdminGiftCardRequestUser {
  type: typeof FETCH_ADMIN_GIFT_CARD_REQUEST_USER;
  payload: FetchAdminGiftCardRequestUserPayload;
}

export interface FetchAdminGiftCardRequestUserSuccess {
  type: typeof FETCH_ADMIN_GIFT_CARD_REQUEST_USER_SUCCESS;
  payload: FetchAdminGiftCardRequestUserSuccessPayload;
}

export interface FetchAdminGiftCardRequestUserFailure {
  type: typeof FETCH_ADMIN_GIFT_CARD_REQUEST_USER_FAILURE;
  payload: FetchAdminGiftCardRequestUserFailurePayload;
}

export interface FulfillAdminGiftCardRequest {
  type: typeof FULFILL_ADMIN_GIFT_CARD_REQUEST;
  payload: FulfillAdminGiftCardRequestPayload;
  navigate: Function;
}

export type FulfillAdminGiftCardRequestSuccess = {
  type: typeof FULFILL_ADMIN_GIFT_CARD_REQUEST_SUCCESS;
};

export type FulfillAdminGiftCardRequestFailure = {
  type: typeof FULFILL_ADMIN_GIFT_CARD_REQUEST_FAILURE;
  payload: FulfillAdminGiftCardRequestFailurePayload;
};

export interface DeclineAdminGiftCardRequest {
  type: typeof DECLINE_ADMIN_GIFT_CARD_REQUEST;
  payload: DeclineAdminGiftCardRequestPayload;
  navigate: Function;
}

export type DeclineAdminGiftCardRequestSuccess = {
  type: typeof DECLINE_ADMIN_GIFT_CARD_REQUEST_SUCCESS;
};

export type DeclineAdminGiftCardRequestFailure = {
  type: typeof DECLINE_ADMIN_GIFT_CARD_REQUEST_FAILURE;
  payload: DeclineAdminGiftCardRequestFailurePayload;
};

export type AdminGiftCardRequestActions =
  | FetchAdminGiftCardRequestList
  | FetchAdminGiftCardRequestListSuccess
  | FetchAdminGiftCardRequestListFailure
  | FetchAdminGiftCardRequest
  | FetchAdminGiftCardRequestSuccess
  | FetchAdminGiftCardRequestFailure
  | FetchAdminGiftCardRequestUser
  | FetchAdminGiftCardRequestUserSuccess
  | FetchAdminGiftCardRequestUserFailure
  | FulfillAdminGiftCardRequest
  | FulfillAdminGiftCardRequestSuccess
  | FulfillAdminGiftCardRequestFailure
  | DeclineAdminGiftCardRequest
  | DeclineAdminGiftCardRequestSuccess
  | DeclineAdminGiftCardRequestFailure;
