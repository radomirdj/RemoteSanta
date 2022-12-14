import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  GET_SELF_REQUEST,
  GET_SELF_SUCCESS,
  GET_SELF_FAILURE,
  LOGOUT,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE
} from "./actionTypes";

import { AuthState, AuthActions } from "./types";

const initialState: AuthState = {
  pending: false,
  authUser: { id: "", firstName: "", lastName: "", email: "", accessToken: "" },
  error: null
};

export default (state = initialState, action: AuthActions) => {
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
    case LOGIN_REQUEST:
      return {
        ...state,
        pending: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        pending: false,
        authUser: action.payload.authUser,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error
      };
    case GET_SELF_REQUEST:
      return {
        ...state,
        pending: true
      };
    case GET_SELF_SUCCESS:
      return {
        ...state,
        pending: false,
        authUser: action.payload.authUser,
        error: null
      };
    case GET_SELF_FAILURE:
      return {
        ...state,
        pending: false,
        authUser: { id: "", firstName: "", lastName: "", email: "", accessToken: "" },
      };
    case LOGOUT:
      return {
        ...state,
        pending: false,
        authUser: { id: "", firstName: "", lastName: "", email: "", accessToken: "" },
      };
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        pending: true
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null
      };
    case FORGOT_PASSWORD_FAILURE:
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
