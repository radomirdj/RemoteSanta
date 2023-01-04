import {
  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST, FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_SUCCESS, FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_FAILURE
} from "./actionTypes";

export interface IAdminGiftCardIntegration {
  id: string;
  website :string;        
  image:string;
  title:string;
  description:string;
  constraintType:string;
  priority:number;       
  constraintJson:string;
}

export interface IAdminGiftCardRequest {
  id: string;
  adminComment:string;
  userId: string;
  giftCardIntegrationId: string;
  amount: string;
  status:string;
  giftCardIntegration:IAdminGiftCardIntegration;
  createdAt:Date;
  updatedAt:Date;
}

export interface AdminGiftCardRequestState {
  pending: boolean;
  adminGiftCardRequestList: IAdminGiftCardRequest[];
  error: string | null;
}

export interface FetchAdminGiftCardRequestListSuccessPayload {
  adminGiftCardRequestList: IAdminGiftCardRequest[];
}

export interface FetchAdminGiftCardRequestListFailurePayload {
  error: string;
}

export interface FetchAdminGiftCardRequestList{
  type: typeof FETCH_ADMIN_GIFT_CARD_REQUEST_LIST;
}

export interface FetchAdminGiftCardRequestListSuccess {
  type: typeof FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_SUCCESS,
  payload:FetchAdminGiftCardRequestListSuccessPayload 
}

export interface FetchAdminGiftCardRequestListFailure {
  type: typeof FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_FAILURE;
  payload:FetchAdminGiftCardRequestListFailurePayload
}

export type AdminGiftCardRequestActions =
  | FetchAdminGiftCardRequestList
  | FetchAdminGiftCardRequestListSuccess
  | FetchAdminGiftCardRequestListFailure;
