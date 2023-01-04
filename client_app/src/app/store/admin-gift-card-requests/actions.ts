import {
  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST,
  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_SUCCESS,
  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_FAILURE,
} from "./actionTypes";
import {
  FetchAdminGiftCardRequestList,
  FetchAdminGiftCardRequestListSuccessPayload,
  FetchAdminGiftCardRequestListSuccess,
  FetchAdminGiftCardRequestListFailurePayload,
  FetchAdminGiftCardRequestListFailure,
} from "./types";

export const fetchAdminGiftCardRequestList = (): FetchAdminGiftCardRequestList => ({
  type: FETCH_ADMIN_GIFT_CARD_REQUEST_LIST
});

export const fetchAdminGiftCardRequestListSuccess = (
  payload: FetchAdminGiftCardRequestListSuccessPayload
): FetchAdminGiftCardRequestListSuccess => ({
  type: FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_SUCCESS,
  payload
});

export const fetchAdminGiftCardRequestListFailure = (
  payload: FetchAdminGiftCardRequestListFailurePayload
): FetchAdminGiftCardRequestListFailure => ({
  type: FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_FAILURE,
  payload
});
