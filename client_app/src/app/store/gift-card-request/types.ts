import {
  FETCH_GIFT_CARD_REQUEST_LIST,
 FETCH_GIFT_CARD_REQUEST_LIST_SUCCESS,
FETCH_GIFT_CARD_REQUEST_LIST_FAILURE
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
  userId: string;
  giftCardIntegrationId: string;
  amount: string;
  status:string;
  giftCardIntegration:IGiftCardIntegration;
}

export interface GiftCardRequestState {
  pending: boolean;
  giftCardRequestList: IGiftCardRequest[];
  error: string | null;
}

export interface FetchGiftCardRequestListSuccessPayload {
  giftCardRequestList: IGiftCardRequest[];
}

export interface FetchGiftCardRequestListFailurePayload {
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

export type GiftCardRequestActions =
  | FetchGiftCardRequestListFailure
  | FetchGiftCardRequestListSuccess
  | FetchGiftCardRequestList;
