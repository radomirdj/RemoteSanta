import {
  FETCH_GIFT_CARD_REQUEST_LIST,
  FETCH_GIFT_CARD_REQUEST_LIST_SUCCESS,
  FETCH_GIFT_CARD_REQUEST_LIST_FAILURE,
  FETCH_GIFT_CARD_INTEGRATION_LIST,
  FETCH_GIFT_CARD_INTEGRATION_LIST_SUCCESS,
  FETCH_GIFT_CARD_INTEGRATION_LIST_FAILURE
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
  FetchGiftCardIntegrationListFailure
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
