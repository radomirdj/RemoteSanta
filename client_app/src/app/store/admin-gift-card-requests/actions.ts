import {
  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST,
  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_SUCCESS,
  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_FAILURE,
  FETCH_ADMIN_GIFT_CARD_REQUEST,
  FETCH_ADMIN_GIFT_CARD_REQUEST_SUCCESS,
  FETCH_ADMIN_GIFT_CARD_REQUEST_FAILURE,
  FETCH_ADMIN_GIFT_CARD_REQUEST_USER,
  FETCH_ADMIN_GIFT_CARD_REQUEST_USER_SUCCESS,
  FETCH_ADMIN_GIFT_CARD_REQUEST_USER_FAILURE,
  DECLINE_ADMIN_GIFT_CARD_REQUEST,
  DECLINE_ADMIN_GIFT_CARD_REQUEST_SUCCESS,
  DECLINE_ADMIN_GIFT_CARD_REQUEST_FAILURE,
} from "./actionTypes";
import {
  FetchAdminGiftCardRequestList,
  FetchAdminGiftCardRequestListSuccessPayload,
  FetchAdminGiftCardRequestListSuccess,
  FetchAdminGiftCardRequestListFailurePayload,
  FetchAdminGiftCardRequestListFailure,
  FetchAdminGiftCardRequestPayload,
  FetchAdminGiftCardRequest,
  FetchAdminGiftCardRequestSuccessPayload,
  FetchAdminGiftCardRequestSuccess,
  FetchAdminGiftCardRequestFailurePayload,
  FetchAdminGiftCardRequestFailure,
  FetchAdminGiftCardRequestUserPayload,
  FetchAdminGiftCardRequestUser,
  FetchAdminGiftCardRequestUserSuccessPayload,
  FetchAdminGiftCardRequestUserSuccess,
  FetchAdminGiftCardRequestUserFailure,
  FetchAdminGiftCardRequestUserFailurePayload,
  DeclineAdminGiftCardRequestPayload,
  DeclineAdminGiftCardRequest,
  DeclineAdminGiftCardRequestSuccess,
  DeclineAdminGiftCardRequestFailurePayload,
  DeclineAdminGiftCardRequestFailure,
} from "./types";

export const fetchAdminGiftCardRequestList =
  (): FetchAdminGiftCardRequestList => ({
    type: FETCH_ADMIN_GIFT_CARD_REQUEST_LIST,
  });

export const fetchAdminGiftCardRequestListSuccess = (
  payload: FetchAdminGiftCardRequestListSuccessPayload
): FetchAdminGiftCardRequestListSuccess => ({
  type: FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_SUCCESS,
  payload,
});

export const fetchAdminGiftCardRequestListFailure = (
  payload: FetchAdminGiftCardRequestListFailurePayload
): FetchAdminGiftCardRequestListFailure => ({
  type: FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_FAILURE,
  payload,
});

export const fetchAdminGiftCardRequest = (
  payload: FetchAdminGiftCardRequestPayload
): FetchAdminGiftCardRequest => ({
  type: FETCH_ADMIN_GIFT_CARD_REQUEST,
  payload,
});

export const fetchAdminGiftCardRequestSuccess = (
  payload: FetchAdminGiftCardRequestSuccessPayload
): FetchAdminGiftCardRequestSuccess => ({
  type: FETCH_ADMIN_GIFT_CARD_REQUEST_SUCCESS,
  payload,
});

export const fetchAdminGiftCardRequestFailure = (
  payload: FetchAdminGiftCardRequestFailurePayload
): FetchAdminGiftCardRequestFailure => ({
  type: FETCH_ADMIN_GIFT_CARD_REQUEST_FAILURE,
  payload,
});

export const fetchAdminGiftCardRequestUser = (
  payload: FetchAdminGiftCardRequestUserPayload
): FetchAdminGiftCardRequestUser => ({
  type: FETCH_ADMIN_GIFT_CARD_REQUEST_USER,
  payload,
});

export const fetchAdminGiftCardRequestUserSuccess = (
  payload: FetchAdminGiftCardRequestUserSuccessPayload
): FetchAdminGiftCardRequestUserSuccess => ({
  type: FETCH_ADMIN_GIFT_CARD_REQUEST_USER_SUCCESS,
  payload,
});

export const fetchAdminGiftCardRequestUserFailure = (
  payload: FetchAdminGiftCardRequestUserFailurePayload
): FetchAdminGiftCardRequestUserFailure => ({
  type: FETCH_ADMIN_GIFT_CARD_REQUEST_USER_FAILURE,
  payload,
});

export const declineAdminGiftCardRequest = (
  payload: DeclineAdminGiftCardRequestPayload,
  navigate: Function
): DeclineAdminGiftCardRequest => ({
  type: DECLINE_ADMIN_GIFT_CARD_REQUEST,
  payload,
  navigate,
});

export const declineAdminGiftCardRequestSuccess =
  (): DeclineAdminGiftCardRequestSuccess => ({
    type: DECLINE_ADMIN_GIFT_CARD_REQUEST_SUCCESS,
  });

export const declineAdminGiftCardRequestFailure = (
  payload: DeclineAdminGiftCardRequestFailurePayload
): DeclineAdminGiftCardRequestFailure => ({
  type: DECLINE_ADMIN_GIFT_CARD_REQUEST_FAILURE,
  payload,
});
