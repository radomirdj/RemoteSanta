import { act } from "@testing-library/react";
import {
  FETCH_GIFT_CARD_INTEGRATION_LIST,
  FETCH_GIFT_CARD_INTEGRATION_LIST_FAILURE,
  FETCH_GIFT_CARD_INTEGRATION_LIST_SUCCESS,
  FETCH_GIFT_CARD_REQUEST_LIST,
  FETCH_GIFT_CARD_REQUEST_LIST_FAILURE,
  FETCH_GIFT_CARD_REQUEST_LIST_SUCCESS,
  SET_GIFT_CARD_REQUEST_AMOUNT,
  SET_GIFT_CARD_REQUEST_INTEGRATION,
  SET_GIFT_CARD_REQUEST_STEP_BACK
} from "./actionTypes";

import { GiftCardRequestActions, GiftCardRequestState } from "./types";

const initialState: GiftCardRequestState = {
  pending: false,
  giftCardRequestList: [],
  giftCardIntegrationList: [],
  giftCardRequestIntegration: null,
  stepperPage:0,
  giftCardRequestAmount: 0,
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
      case SET_GIFT_CARD_REQUEST_INTEGRATION:
        return {
          ...state,
          pending: false,
          giftCardRequestIntegration: action.payload.integration,
          stepperPage:1,
        };
      case SET_GIFT_CARD_REQUEST_AMOUNT:
        return {
          ...state,
          pending: false,
          giftCardRequestAmount: action.payload.amount,
          stepperPage:2
        };
      case SET_GIFT_CARD_REQUEST_STEP_BACK:
        if(action.payload.currentStep === 1){
        return {
          ...state,
          pending: false,
          giftCardRequestAmount: 0,
          giftCardRequestIntegration:null,
          stepperPage:0
        };
      } else {
        return {
          ...state,
          pending: false,
          giftCardRequestAmount: 0,
          stepperPage:1
        };
      }
    default:
      return {
        ...state
      };
  }
};
