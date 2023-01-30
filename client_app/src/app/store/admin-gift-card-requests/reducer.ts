import { act } from "@testing-library/react";
import {
  FETCH_ADMIN_GIFT_CARD_REQUEST,
  FETCH_ADMIN_GIFT_CARD_REQUEST_FAILURE,
  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST,
  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_FAILURE,
  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_SUCCESS,
  FETCH_ADMIN_GIFT_CARD_REQUEST_SUCCESS,
  FETCH_ADMIN_GIFT_CARD_REQUEST_USER,
  FETCH_ADMIN_GIFT_CARD_REQUEST_USER_FAILURE,
  FETCH_ADMIN_GIFT_CARD_REQUEST_USER_SUCCESS,
} from "./actionTypes";

import {
  AdminGiftCardRequestActions,
  AdminGiftCardRequestState,
} from "./types";

const initialState: AdminGiftCardRequestState = {
  pending: false,
  adminGiftCardRequestList: [],
  adminGiftCardRequest: null,
  adminGiftCardRequestUser: null,
  error: null,
};

export default (state = initialState, action: AdminGiftCardRequestActions) => {
  switch (action.type) {
    case FETCH_ADMIN_GIFT_CARD_REQUEST_LIST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        adminGiftCardRequestList: action.payload.adminGiftCardRequestList,
        error: null,
      };
    case FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        adminGiftCardRequestList: [],
        error: action.payload.error,
      };
    case FETCH_ADMIN_GIFT_CARD_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ADMIN_GIFT_CARD_REQUEST_SUCCESS:
      return {
        ...state,
        pending: false,
        adminGiftCardRequest: action.payload.adminGiftCardRequest,
        error: null,
      };
    case FETCH_ADMIN_GIFT_CARD_REQUEST_FAILURE:
      return {
        ...state,
        pending: false,
        adminGiftCardRequest: null,
        error: action.payload.error,
      };
    case FETCH_ADMIN_GIFT_CARD_REQUEST_USER:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ADMIN_GIFT_CARD_REQUEST_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        adminGiftCardRequestUser: action.payload.adminGiftCardRequestUser,
        error: null,
      };
    case FETCH_ADMIN_GIFT_CARD_REQUEST_USER_FAILURE:
      return {
        ...state,
        pending: false,
        adminGiftCardRequestUser: null,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
