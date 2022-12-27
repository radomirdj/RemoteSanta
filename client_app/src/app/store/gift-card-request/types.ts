import {
  FETCH_GIFT_CARD_REQUEST_LIST,
 FETCH_GIFT_CARD_REQUEST_LIST_SUCCESS,
FETCH_GIFT_CARD_REQUEST_LIST_FAILURE,
FETCH_GIFT_CARD_INTEGRATION_LIST,
FETCH_GIFT_CARD_INTEGRATION_LIST_FAILURE,
FETCH_GIFT_CARD_INTEGRATION_LIST_SUCCESS,
SET_GIFT_CARD_REQUEST_INTEGRATION,
SET_GIFT_CARD_REQUEST_AMOUNT,
SET_GIFT_CARD_REQUEST_STEP_BACK
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
  giftCardRequestIntegration: IGiftCardIntegration | null;
  stepperPage:number;
  giftCardRequestAmount: number;
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

export interface SetGiftCardIntegrationPayload{
  integration:IGiftCardIntegration;
}

export interface SetGiftCardAmountPayload{
  amount:number;
}

export interface SetGiftCardRequestStepBackPayload{
  currentStep:number;
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

export interface SetGiftCardRequestIntegration {
  type: typeof SET_GIFT_CARD_REQUEST_INTEGRATION;
  payload:SetGiftCardIntegrationPayload
}

export interface SetGiftCardRequestAmount{
  type: typeof SET_GIFT_CARD_REQUEST_AMOUNT;
  payload:SetGiftCardAmountPayload
}

export interface SetGiftCardRequestStepBack{
  type: typeof SET_GIFT_CARD_REQUEST_STEP_BACK;
  payload:SetGiftCardRequestStepBackPayload
}

export type GiftCardRequestActions =
  | FetchGiftCardRequestListFailure
  | FetchGiftCardRequestListSuccess
  | FetchGiftCardRequestList
  | FetchGiftCardIntegrationListFailure
  | FetchGiftCardIntegrationListSuccess
  | FetchGiftCardIntegrationList
  | SetGiftCardRequestAmount
  | SetGiftCardRequestIntegration
  | SetGiftCardRequestStepBack;
