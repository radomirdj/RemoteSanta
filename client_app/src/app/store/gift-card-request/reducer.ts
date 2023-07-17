import { act } from "@testing-library/react";
import {
  FETCH_GIFT_CARD_INTEGRATION_LIST,
  FETCH_GIFT_CARD_INTEGRATION_LIST_FAILURE,
  FETCH_GIFT_CARD_INTEGRATION_LIST_SUCCESS,
  FETCH_GIFT_CARD_REQUEST_LIST,
  FETCH_GIFT_CARD_REQUEST_LIST_FAILURE,
  FETCH_GIFT_CARD_REQUEST_LIST_SUCCESS,
  FETCH_GIFT_CARD_FILE,
  FETCH_GIFT_CARD_FILE_FAILURE,
  FETCH_GIFT_CARD_FILE_SUCCESS,
  POST_GIFT_CARD_REQUEST,
  POST_GIFT_CARD_REQUEST_FAILURE,
  POST_GIFT_CARD_REQUEST_SUCCESS,
  SET_GIFT_CARD_REQUEST_AMOUNT,
  SET_GIFT_CARD_REQUEST_INTEGRATION,
  SET_GIFT_CARD_REQUEST_RESET_DATA,
  SET_GIFT_CARD_REQUEST_STEP_BACK,
  FETCH_GIFT_CARD_INTEGRATION,
  FETCH_GIFT_CARD_INTEGRATION_SUCCESS,
  FETCH_GIFT_CARD_INTEGRATION_FAILURE,
} from "./actionTypes";

import { GiftCardRequestActions, GiftCardRequestState } from "./types";

const initialState: GiftCardRequestState = {
  pending: false,
  giftCardRequestList: [],
  giftCardIntegrationList: [],
  giftCardIntegration: null,
  giftCardRequestIntegration: null,
  stepperPage: 0,
  giftCardRequestAmount: 0,
  giftCardRequestMessage: null,
  giftCardRequestAmountInIntegrationCurrency: 0,
  error: null,
};

export default (state = initialState, action: GiftCardRequestActions) => {
  switch (action.type) {
    case FETCH_GIFT_CARD_REQUEST_LIST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_GIFT_CARD_REQUEST_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        giftCardRequestList: action.payload.giftCardRequestList,
        error: null,
      };
    case FETCH_GIFT_CARD_REQUEST_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        giftCardRequestList: [],
        error: action.payload.error,
      };
    case FETCH_GIFT_CARD_INTEGRATION_LIST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_GIFT_CARD_INTEGRATION_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        giftCardIntegrationList: action.payload.giftCardIntegrationList,
        error: null,
      };
    case FETCH_GIFT_CARD_INTEGRATION_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        giftCardIntegrationList: [],
        error: action.payload.error,
      };
    case SET_GIFT_CARD_REQUEST_INTEGRATION:
      return {
        ...state,
        pending: false,
        giftCardRequestIntegration: action.payload.integration,
        stepperPage: 1,
      };
    case SET_GIFT_CARD_REQUEST_AMOUNT:
      return {
        ...state,
        pending: false,
        giftCardRequestAmount: action.payload.amount,
        giftCardRequestAmountInIntegrationCurrency:
          action.payload.amountInIntegrationCurrency,
        giftCardRequestMessage: action.payload.message || "",
        stepperPage: 2,
      };
    case SET_GIFT_CARD_REQUEST_STEP_BACK:
      if (action.payload.currentStep === 1) {
        return {
          ...state,
          pending: false,
          giftCardRequestAmount: 0,
          giftCardRequestMessage: null,
          giftCardRequestIntegration: null,
          stepperPage: 0,
        };
      } else {
        return {
          ...state,
          pending: false,
          giftCardRequestAmount: 0,
          giftCardRequestMessage: null,
          stepperPage: 1,
        };
      }
    case SET_GIFT_CARD_REQUEST_RESET_DATA:
      return {
        ...state,
        pending: false,
        giftCardRequestAmount: 0,
        giftCardRequestMessage: null,
        giftCardRequestIntegration: null,
        stepperPage: 0,
      };
    case POST_GIFT_CARD_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case POST_GIFT_CARD_REQUEST_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case POST_GIFT_CARD_REQUEST_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case FETCH_GIFT_CARD_FILE:
      return {
        ...state,
        pending: true,
      };
    case FETCH_GIFT_CARD_FILE_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case FETCH_GIFT_CARD_FILE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case FETCH_GIFT_CARD_INTEGRATION:
      return {
        ...state,
        pending: true,
      };
    case FETCH_GIFT_CARD_INTEGRATION_SUCCESS:
      return {
        ...state,
        pending: false,
        giftCardIntegration: action.payload.giftCardIntegration,
        error: null,
      };
    case FETCH_GIFT_CARD_INTEGRATION_FAILURE:
      return {
        ...state,
        pending: false,
        giftCardIntegration: null,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
