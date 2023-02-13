import {
  FETCH_GIFT_CARD_REQUEST_LIST,
  FETCH_GIFT_CARD_REQUEST_LIST_SUCCESS,
  FETCH_GIFT_CARD_REQUEST_LIST_FAILURE,
  FETCH_GIFT_CARD_INTEGRATION_LIST,
  FETCH_GIFT_CARD_INTEGRATION_LIST_FAILURE,
  FETCH_GIFT_CARD_INTEGRATION_LIST_SUCCESS,
  SET_GIFT_CARD_REQUEST_INTEGRATION,
  SET_GIFT_CARD_REQUEST_AMOUNT,
  SET_GIFT_CARD_REQUEST_STEP_BACK,
  SET_GIFT_CARD_REQUEST_RESET_DATA,
  POST_GIFT_CARD_REQUEST,
  POST_GIFT_CARD_REQUEST_SUCCESS,
  POST_GIFT_CARD_REQUEST_FAILURE,
  FETCH_GIFT_CARD_URL,
  FETCH_GIFT_CARD_URL_SUCCESS,
  FETCH_GIFT_CARD_URL_FAILURE,
} from "./actionTypes";

export interface IGiftCardIntegration {
  id: string;
  website: string;
  image: string;
  title: string;
  description: string;
  constraintType: string;
  priority: number;
  constraintJson: string;
}

export interface IGiftCardFile {
  url: string;
}

export interface IGiftCardRequest {
  id: string;
  adminComment: string;
  userId: string;
  giftCardIntegrationId: string;
  amount: string;
  status: string;
  giftCardIntegration: IGiftCardIntegration;
  createdAt: Date;
  updatedAt: Date;
}

export interface GiftCardRequestState {
  pending: boolean;
  giftCardRequestList: IGiftCardRequest[];
  giftCardIntegrationList: IGiftCardIntegration[];
  giftCardRequestIntegration: IGiftCardIntegration | null;
  stepperPage: number;
  giftCardFile: IGiftCardFile | null;
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

export interface SetGiftCardIntegrationPayload {
  integration: IGiftCardIntegration;
}

export interface SetGiftCardAmountPayload {
  amount: number;
}

export interface SetGiftCardRequestStepBackPayload {
  currentStep: number;
}

export interface PostGiftCardRequestPayload {
  giftCardIntegrationId: string;
  amount: number;
}

export interface PostGiftCardRequestFailurePayload {
  error: string;
}

export interface FetchGiftCardUrlPayload {
  giftCardRequestId: string;
}

export interface FetchGiftCardUrlSuccessPayload {
  giftCardFile: IGiftCardFile;
}

export interface FetchGiftCardUrlFailurePayload {
  error: string;
}

export interface FetchGiftCardRequestList {
  type: typeof FETCH_GIFT_CARD_REQUEST_LIST;
}

export interface FetchGiftCardRequestListSuccess {
  type: typeof FETCH_GIFT_CARD_REQUEST_LIST_SUCCESS;
  payload: FetchGiftCardRequestListSuccessPayload;
}

export interface FetchGiftCardRequestListFailure {
  type: typeof FETCH_GIFT_CARD_REQUEST_LIST_FAILURE;
  payload: FetchGiftCardRequestListFailurePayload;
}

export interface FetchGiftCardIntegrationList {
  type: typeof FETCH_GIFT_CARD_INTEGRATION_LIST;
}

export interface FetchGiftCardIntegrationListSuccess {
  type: typeof FETCH_GIFT_CARD_INTEGRATION_LIST_SUCCESS;
  payload: FetchGiftCardIntegrationListSuccessPayload;
}

export interface FetchGiftCardIntegrationListFailure {
  type: typeof FETCH_GIFT_CARD_INTEGRATION_LIST_FAILURE;
  payload: FetchGiftCardIntegrationListFailurePayload;
}

export interface SetGiftCardRequestIntegration {
  type: typeof SET_GIFT_CARD_REQUEST_INTEGRATION;
  payload: SetGiftCardIntegrationPayload;
}

export interface SetGiftCardRequestAmount {
  type: typeof SET_GIFT_CARD_REQUEST_AMOUNT;
  payload: SetGiftCardAmountPayload;
}

export interface SetGiftCardRequestStepBack {
  type: typeof SET_GIFT_CARD_REQUEST_STEP_BACK;
  payload: SetGiftCardRequestStepBackPayload;
}

export interface SetGiftCardRequestResetData {
  type: typeof SET_GIFT_CARD_REQUEST_RESET_DATA;
}

export interface PostGiftCardRequest {
  type: typeof POST_GIFT_CARD_REQUEST;
  payload: PostGiftCardRequestPayload;
  navigate: Function;
}

export interface PostGiftCardRequestSuccess {
  type: typeof POST_GIFT_CARD_REQUEST_SUCCESS;
}

export interface PostGiftCardRequestFailure {
  type: typeof POST_GIFT_CARD_REQUEST_FAILURE;
  payload: PostGiftCardRequestFailurePayload;
}

export interface FetchGiftCardUrl {
  type: typeof FETCH_GIFT_CARD_URL;
  payload: FetchGiftCardUrlPayload;
}

export interface FetchGiftCardUrlSuccess {
  type: typeof FETCH_GIFT_CARD_URL_SUCCESS;
  payload: FetchGiftCardUrlSuccessPayload;
}

export interface FetchGiftCardUrlFailure {
  type: typeof FETCH_GIFT_CARD_URL_FAILURE;
  payload: FetchGiftCardUrlFailurePayload;
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
  | SetGiftCardRequestStepBack
  | SetGiftCardRequestResetData
  | PostGiftCardRequest
  | PostGiftCardRequestSuccess
  | PostGiftCardRequestFailure
  | FetchGiftCardUrl
  | FetchGiftCardUrlSuccess
  | FetchGiftCardUrlFailure;
