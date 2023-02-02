import { act } from "@testing-library/react";
import {
  FETCH_USER_INVITE_LIST,
  FETCH_USER_INVITE_LIST_SUCCESS,
  FETCH_USER_INVITE_LIST_FAILURE,
  POST_USER_INVITE,
  POST_USER_INVITE_SUCCESS,
  POST_USER_INVITE_FAILURE,
  CANCEL_USER_INVITE,
  CANCEL_USER_INVITE_SUCCESS,
  CANCEL_USER_INVITE_FAILURE,
  SET_OPEN_MODAL,
  SET_CLOSE_MODAL,
} from "./actionTypes";

import { UserInviteActions, UserInviteState } from "./types";

const initialState: UserInviteState = {
  pending: false,
  userInviteList: [],
  openModal: false,
  error: null,
};

export default (state = initialState, action: UserInviteActions) => {
  switch (action.type) {
    case FETCH_USER_INVITE_LIST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_USER_INVITE_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        userInviteList: action.payload.userInviteList,
        error: null,
      };
    case FETCH_USER_INVITE_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        userInviteList: [],
        error: action.payload.error,
      };
    case POST_USER_INVITE:
      return {
        ...state,
        pending: true,
      };
    case POST_USER_INVITE_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case POST_USER_INVITE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case CANCEL_USER_INVITE:
      return {
        ...state,
        pending: true,
      };
    case CANCEL_USER_INVITE_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case CANCEL_USER_INVITE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case SET_OPEN_MODAL:
      return {
        ...state,
        openModal: true,
        pending: true,
      };
    case SET_CLOSE_MODAL:
      return {
        ...state,
        openModal: false,
        pending: true,
      };
    default:
      return {
        ...state,
      };
  }
};
