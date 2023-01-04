import { act } from "@testing-library/react";
import {
  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST,
  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_FAILURE,
  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_SUCCESS,
} from "./actionTypes";

import { AdminGiftCardRequestActions, AdminGiftCardRequestState } from "./types";

const initialState: AdminGiftCardRequestState = {
  pending: false,
  adminGiftCardRequestList: [],
  error: null
};

export default (state = initialState, action: AdminGiftCardRequestActions) => {
  switch (action.type) {
    case FETCH_ADMIN_GIFT_CARD_REQUEST_LIST:
      return {
        ...state,
        pending: true
      };
    case FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        adminGiftCardRequestList: action.payload.adminGiftCardRequestList,
        error: null
      };
    case  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        claimPointsEventList: [],
        error: action.payload.error
      };
    default:
      return {
        ...state
      };
  }
};
