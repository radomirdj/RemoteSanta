import { act } from "@testing-library/react";
import {
  FETCH_ORGANIZATION,
  FETCH_ORGANIZATION_FAILURE,
  FETCH_ORGANIZATION_SUCCESS,
  FETCH_ORG_TRANSACTION_LIST,
  FETCH_ORG_TRANSACTION_LIST_SUCCESS,
  FETCH_ORG_TRANSACTION_LIST_FAILURE,
  FETCH_ORG_USER_LIST,
  FETCH_ORG_USER_LIST_SUCCESS,
  FETCH_ORG_USER_LIST_FAILURE,
  FETCH_ORG_USER,
  FETCH_ORG_USER_SUCCESS,
  FETCH_ORG_USER_FAILURE,
  DELETE_ORG_USER,
  DELETE_ORG_USER_SUCCESS,
  DELETE_ORG_USER_FAILURE,
  SEND_POINTS_TO_USER,
  SEND_POINTS_TO_USER_SUCCESS,
  SEND_POINTS_TO_USER_FAILURE,
  SET_OPEN_DIALOG_SEND_POINTS,
  SET_CLOSE_DIALOG_SEND_POINTS,
  PEER_SEND_POINTS_TO_USER,
  PEER_SEND_POINTS_TO_USER_SUCCESS,
  PEER_SEND_POINTS_TO_USER_FAILURE,
} from "./actionTypes";

import { OrganizationActions, OrganizationState } from "./types";

const initialState: OrganizationState = {
  pending: false,
  organization: null,
  orgTransactionList: [],
  orgUserList: [],
  openDialog: false,
  orgUser: null,
  error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: OrganizationActions) => {
  switch (action.type) {
    case FETCH_ORGANIZATION:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ORGANIZATION_SUCCESS:
      return {
        ...state,
        pending: false,
        organization: action.payload.organization,
        error: null,
      };
    case FETCH_ORGANIZATION_FAILURE:
      return {
        ...state,
        pending: false,
        organization: null,
        error: action.payload.error,
      };
    case FETCH_ORG_TRANSACTION_LIST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ORG_TRANSACTION_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        orgTransactionList: action.payload.organizationTransactionList,
        error: null,
      };
    case FETCH_ORG_TRANSACTION_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        orgTransactionList: [],
        error: action.payload.error,
      };
    case FETCH_ORG_USER_LIST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ORG_USER_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        orgUserList: action.payload.orgUserList,
        error: null,
      };
    case FETCH_ORG_USER_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        orgUserList: [],
        error: action.payload.error,
      };
    case FETCH_ORG_USER:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ORG_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        orgUser: action.payload.user,
        error: null,
      };
    case FETCH_ORG_USER_FAILURE:
      return {
        ...state,
        pending: false,
        orgUser: null,
        error: action.payload.error,
      };
    case DELETE_ORG_USER:
      return {
        ...state,
        pending: true,
      };
    case DELETE_ORG_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case DELETE_ORG_USER_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case SEND_POINTS_TO_USER:
      return {
        ...state,
        pending: true,
      };
    case SEND_POINTS_TO_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case SEND_POINTS_TO_USER_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case SET_OPEN_DIALOG_SEND_POINTS:
      return {
        ...state,
        openDialog: true,
      };
    case SET_CLOSE_DIALOG_SEND_POINTS:
      return {
        ...state,
        openDialog: false,
      };
    case PEER_SEND_POINTS_TO_USER:
      return {
        ...state,
        pending: true,
      };
    case PEER_SEND_POINTS_TO_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case PEER_SEND_POINTS_TO_USER_FAILURE:
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
