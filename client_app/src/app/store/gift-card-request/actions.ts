import {
  FETCH_GIFT_CARD_REQUEST_LIST,
  FETCH_GIFT_CARD_REQUEST_LIST_SUCCESS,
  FETCH_GIFT_CARD_REQUEST_LIST_FAILURE
} from "./actionTypes";
import {
  FetchGiftCardRequestList,
  FetchGiftCardRequestListFailure,
  FetchGiftCardRequestListSuccess,
  FetchGiftCardRequestListSuccessPayload,
  FetchGiftCardRequestListFailurePayload
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
