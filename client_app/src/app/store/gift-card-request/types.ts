import {
  FETCH_GIFT_CARD_REQUEST_LIST,
 FETCH_GIFT_CARD_REQUEST_LIST_SUCCESS,
FETCH_GIFT_CARD_REQUEST_LIST_FAILURE,
FETCH_GIFT_CARD_INTEGRATION_LIST,
FETCH_GIFT_CARD_INTEGRATION_LIST_FAILURE,
FETCH_GIFT_CARD_INTEGRATION_LIST_SUCCESS
} from "./actionTypes";

export interface IGiftCardIntegration {
  id: string;
  website :string;        
  image:string;
  title:string;
  description:string;
  constraintType:string;
  priority:number;       
  constraintJson:string;
}

export interface IGiftCardRequest {
  id: string;
  adminComment:string;
  userId: string;
  giftCardIntegrationId: string;
  amount: string;
  status:string;
  giftCardIntegration:IGiftCardIntegration;
  createdAt:Date;
  updatedAt:Date;
}

export interface GiftCardRequestState {
  pending: boolean;
  giftCardRequestList: IGiftCardRequest[];
  giftCardIntegrationList: IGiftCardIntegration[];
  error: string | null;
}

export interface FetchGiftCardRequestListSuccessPayload {
  giftCardRequestList: IGiftCardRequest[];
}

export interface FetchGiftCardRequestListFailurePayload {
  error: string;
}

export interface FetchGiftCardIntegrationListSuccessPayload {
  giftCardIntegrationList: IGiftCardIntegration[];
}

export interface FetchGiftCardIntegrationListFailurePayload {
  error: string;
}

export interface FetchGiftCardRequestList{
  type: typeof FETCH_GIFT_CARD_REQUEST_LIST;
}

export interface FetchGiftCardRequestListSuccess {
  type: typeof FETCH_GIFT_CARD_REQUEST_LIST_SUCCESS,
  payload:FetchGiftCardRequestListSuccessPayload 
}

export interface FetchGiftCardRequestListFailure {
  type: typeof FETCH_GIFT_CARD_REQUEST_LIST_FAILURE;
  payload:FetchGiftCardRequestListFailurePayload
}

export interface FetchGiftCardIntegrationList{
  type: typeof FETCH_GIFT_CARD_INTEGRATION_LIST;
}

export interface FetchGiftCardIntegrationListSuccess {
  type: typeof FETCH_GIFT_CARD_INTEGRATION_LIST_SUCCESS,
  payload:FetchGiftCardIntegrationListSuccessPayload 
}

export interface FetchGiftCardIntegrationListFailure {
  type: typeof FETCH_GIFT_CARD_INTEGRATION_LIST_FAILURE;
  payload:FetchGiftCardIntegrationListFailurePayload
}

export type GiftCardRequestActions =
  | FetchGiftCardRequestListFailure
  | FetchGiftCardRequestListSuccess
  | FetchGiftCardRequestList
  | FetchGiftCardIntegrationListFailure
  | FetchGiftCardIntegrationListSuccess
  | FetchGiftCardIntegrationList;
