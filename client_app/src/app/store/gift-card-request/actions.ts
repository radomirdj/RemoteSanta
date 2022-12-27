import {
  FETCH_GIFT_CARD_REQUEST_LIST,
  FETCH_GIFT_CARD_REQUEST_LIST_SUCCESS,
  FETCH_GIFT_CARD_REQUEST_LIST_FAILURE,
  FETCH_GIFT_CARD_INTEGRATION_LIST,
  FETCH_GIFT_CARD_INTEGRATION_LIST_SUCCESS,
  FETCH_GIFT_CARD_INTEGRATION_LIST_FAILURE,
  SET_GIFT_CARD_REQUEST_INTEGRATION,
  SET_GIFT_CARD_REQUEST_AMOUNT,
  SET_GIFT_CARD_REQUEST_STEP_BACK
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
  SetGiftCardRequestStepBack
} from "./types";

export const fetchGiftCardRequestList = (): FetchGiftCardRequestList => ({
  type: FETCH_GIFT_CARD_REQUEST_LIST
});

export const fetchGiftCardRequestListSuccess = (
  payload: FetchGiftCardRequestListSuccessPayload
): FetchGiftCardRequestListSuccess => ({
  type: FETCH_GIFT_CARD_REQUEST_LIST_SUCCESS,
  payload
});

export const fetchGiftCardRequestListFailure = (
  payload: FetchGiftCardRequestListFailurePayload
): FetchGiftCardRequestListFailure => ({
  type: FETCH_GIFT_CARD_REQUEST_LIST_FAILURE,
  payload
});

export const fetchGiftCardIntegrationList = (): FetchGiftCardIntegrationList => ({
  type: FETCH_GIFT_CARD_INTEGRATION_LIST
});

export const fetchGiftCardIntegrationListSuccess = (
  payload: FetchGiftCardIntegrationListSuccessPayload
): FetchGiftCardIntegrationListSuccess => ({
  type: FETCH_GIFT_CARD_INTEGRATION_LIST_SUCCESS,
  payload
});

export const fetchGiftCardIntegrationListFailure = (
  payload: FetchGiftCardIntegrationListFailurePayload
): FetchGiftCardIntegrationListFailure => ({
  type: FETCH_GIFT_CARD_INTEGRATION_LIST_FAILURE,
  payload
});

export const setGiftCardRequestIntegration = (
  payload: SetGiftCardIntegrationPayload
): SetGiftCardRequestIntegration => ({
  type: SET_GIFT_CARD_REQUEST_INTEGRATION,
  payload
});

export const setGiftCardRequestAmount = (
  payload: SetGiftCardAmountPayload
): SetGiftCardRequestAmount => ({
  type: SET_GIFT_CARD_REQUEST_AMOUNT,
  payload
});

export const setGiftCardRequestStepBack = (
  payload: SetGiftCardRequestStepBackPayload
): SetGiftCardRequestStepBack => ({
  type: SET_GIFT_CARD_REQUEST_STEP_BACK,
  payload
});
