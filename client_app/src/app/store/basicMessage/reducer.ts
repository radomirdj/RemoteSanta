import {
  FETCH_MESSAGE_REQUEST,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_FAILURE
} from "./actionTypes";

import { MessageActions, MessageState } from "./types";

const initialState: MessageState = {
  pending: false,
  message: "",
  error: null
};

export default (state = initialState, action: MessageActions) => {
  switch (action.type) {
    case FETCH_MESSAGE_REQUEST:
      return {
        ...state,
        pending: true
      };
    case FETCH_MESSAGE_SUCCESS:
      return {
        ...state,
        pending: false,
        message: action.payload.message,
        error: null
      };
    case FETCH_MESSAGE_FAILURE:
      return {
        ...state,
        pending: false,
        message: "",
        error: action.payload.error
      };
    default:
      return {
        ...state
      };
  }
};
