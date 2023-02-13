import {
  FETCH_GIFT_CARD_REQUEST_LIST,
  FETCH_GIFT_CARD_REQUEST_LIST_SUCCESS,
  FETCH_GIFT_CARD_REQUEST_LIST_FAILURE,
  FETCH_GIFT_CARD_INTEGRATION_LIST,
  FETCH_GIFT_CARD_INTEGRATION_LIST_SUCCESS,
  FETCH_GIFT_CARD_INTEGRATION_LIST_FAILURE,
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
import {
  FetchGiftCardRequestList,
  FetchGiftCardRequestListFailure,
  FetchGiftCardRequestListSuccess,
  FetchGiftCardRequestListSuccessPayload,
  FetchGiftCardRequestListFailurePayload,
  FetchGiftCardIntegrationList,
  FetchGiftCardIntegrationListSuccessPayload,
  FetchGiftCardIntegrationListSuccess,
  FetchGiftCardIntegrationListFailurePayload,
  FetchGiftCardIntegrationListFailure,
  SetGiftCardIntegrationPayload,
  SetGiftCardRequestIntegration,
  SetGiftCardAmountPayload,
  SetGiftCardRequestAmount,
  SetGiftCardRequestStepBackPayload,
  SetGiftCardRequestStepBack,
  SetGiftCardRequestResetData,
  PostGiftCardRequestFailurePayload,
  PostGiftCardRequest,
  PostGiftCardRequestPayload,
  PostGiftCardRequestSuccess,
  PostGiftCardRequestFailure,
  FetchGiftCardUrlPayload,
  FetchGiftCardUrl,
  FetchGiftCardUrlSuccessPayload,
  FetchGiftCardUrlSuccess,
  FetchGiftCardUrlFailure,
  FetchGiftCardUrlFailurePayload,
} from "./types";

export const fetchGiftCardRequestList = (): FetchGiftCardRequestList => ({
  type: FETCH_GIFT_CARD_REQUEST_LIST,
});

export const fetchGiftCardRequestListSuccess = (
  payload: FetchGiftCardRequestListSuccessPayload
): FetchGiftCardRequestListSuccess => ({
  type: FETCH_GIFT_CARD_REQUEST_LIST_SUCCESS,
  payload,
});

export const fetchGiftCardRequestListFailure = (
  payload: FetchGiftCardRequestListFailurePayload
): FetchGiftCardRequestListFailure => ({
  type: FETCH_GIFT_CARD_REQUEST_LIST_FAILURE,
  payload,
});

export const fetchGiftCardIntegrationList =
  (): FetchGiftCardIntegrationList => ({
    type: FETCH_GIFT_CARD_INTEGRATION_LIST,
  });

export const fetchGiftCardIntegrationListSuccess = (
  payload: FetchGiftCardIntegrationListSuccessPayload
): FetchGiftCardIntegrationListSuccess => ({
  type: FETCH_GIFT_CARD_INTEGRATION_LIST_SUCCESS,
  payload,
});

export const fetchGiftCardIntegrationListFailure = (
  payload: FetchGiftCardIntegrationListFailurePayload
): FetchGiftCardIntegrationListFailure => ({
  type: FETCH_GIFT_CARD_INTEGRATION_LIST_FAILURE,
  payload,
});

export const setGiftCardRequestIntegration = (
  payload: SetGiftCardIntegrationPayload
): SetGiftCardRequestIntegration => ({
  type: SET_GIFT_CARD_REQUEST_INTEGRATION,
  payload,
});

export const setGiftCardRequestAmount = (
  payload: SetGiftCardAmountPayload
): SetGiftCardRequestAmount => ({
  type: SET_GIFT_CARD_REQUEST_AMOUNT,
  payload,
});

export const setGiftCardRequestStepBack = (
  payload: SetGiftCardRequestStepBackPayload
): SetGiftCardRequestStepBack => ({
  type: SET_GIFT_CARD_REQUEST_STEP_BACK,
  payload,
});

export const setGiftCardRequestResetData = (): SetGiftCardRequestResetData => ({
  type: SET_GIFT_CARD_REQUEST_RESET_DATA,
});

export const postGiftCardRequest = (
  payload: PostGiftCardRequestPayload,
  navigate: Function
): PostGiftCardRequest => ({
  type: POST_GIFT_CARD_REQUEST,
  payload,
  navigate,
});

export const postGiftCardRequestSuccess = (): PostGiftCardRequestSuccess => ({
  type: POST_GIFT_CARD_REQUEST_SUCCESS,
});

export const postGiftCardRequestFailure = (
  payload: PostGiftCardRequestFailurePayload
): PostGiftCardRequestFailure => ({
  type: POST_GIFT_CARD_REQUEST_FAILURE,
  payload,
});

export const fetchGiftCardUrl = (
  payload: FetchGiftCardUrlPayload
): FetchGiftCardUrl => ({
  type: FETCH_GIFT_CARD_URL,
  payload,
});

export const fetchGiftCardUrlSuccess = (
  payload: FetchGiftCardUrlSuccessPayload
): FetchGiftCardUrlSuccess => ({
  type: FETCH_GIFT_CARD_URL_SUCCESS,
  payload,
});

export const fetchGiftCardUrlFailure = (
  payload: FetchGiftCardUrlFailurePayload
): FetchGiftCardUrlFailure => ({
  type: FETCH_GIFT_CARD_URL_FAILURE,
  payload,
});
