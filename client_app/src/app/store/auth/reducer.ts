import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from "./actionTypes";

import { SignUpActions, SignUpState } from "./types";

const initialState: SignUpState = {
  pending: false,
  error: null
};

export default (state = initialState, action: SignUpActions) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        pending: true
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error
      };
    default:
      return {
        ...state
      };
  }
};
