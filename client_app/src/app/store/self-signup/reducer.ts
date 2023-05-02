import { PlaylistAddOutlined } from "@mui/icons-material";
import {
  SELF_SIGN_UP_REQUEST,
  SELF_SIGN_UP_SUCCESS,
  SELF_SIGN_UP_FAILURE,
} from "./actionTypes";

import { SelfSignupState, SelfSignupActions } from "./types";

const initialState: SelfSignupState = {
  pending: false,
  error: null,
};

export default (state = initialState, action: SelfSignupActions) => {
  switch (action.type) {
    case SELF_SIGN_UP_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case SELF_SIGN_UP_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case SELF_SIGN_UP_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
