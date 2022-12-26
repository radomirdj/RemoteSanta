import {
  FETCH_GIFT_CARD_INTEGRATION_LIST,
  FETCH_GIFT_CARD_INTEGRATION_LIST_FAILURE,
  FETCH_GIFT_CARD_INTEGRATION_LIST_SUCCESS,
  FETCH_GIFT_CARD_REQUEST_LIST,
  FETCH_GIFT_CARD_REQUEST_LIST_FAILURE,
  FETCH_GIFT_CARD_REQUEST_LIST_SUCCESS
} from "./actionTypes";

import { GiftCardRequestActions, GiftCardRequestState } from "./types";

const initialState: GiftCardRequestState = {
  pending: false,
  giftCardRequestList: [],
  giftCardIntegrationList: [],
  error: null
};

export default (state = initialState, action: GiftCardRequestActions) => {
  switch (action.type) {
    case FETCH_GIFT_CARD_REQUEST_LIST:
      return {
        ...state,
        pending: true
      };
    case FETCH_GIFT_CARD_REQUEST_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        giftCardRequestList: action.payload.giftCardRequestList,
        error: null
      };
    case FETCH_GIFT_CARD_REQUEST_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        giftCardRequestList: [],
        error: action.payload.error
      };
      case FETCH_GIFT_CARD_INTEGRATION_LIST:
        return {
          ...state,
          pending: true
        };
      case FETCH_GIFT_CARD_INTEGRATION_LIST_SUCCESS:
        return {
          ...state,
          pending: false,
          giftCardIntegrationList: action.payload.giftCardIntegrationList,
          error: null
        };
      case FETCH_GIFT_CARD_INTEGRATION_LIST_FAILURE:
        return {
          ...state,
          pending: false,
          giftCardIntegrationList: [],
          error: action.payload.error
        };
    default:
      return {
        ...state
      };
  }
};
