import { act } from "@testing-library/react";
import {
  FETCH_ADMIN_ORGANIZATION_LIST,
  FETCH_ADMIN_ORGANIZATION_LIST_FAILURE,
  FETCH_ADMIN_ORGANIZATION_LIST_SUCCESS,
  FETCH_ADMIN_ORGANIZATION,
  FETCH_ADMIN_ORGANIZATION_FAILURE,
  FETCH_ADMIN_ORGANIZATION_SUCCESS,
  FETCH_ADMIN_USER_LIST,
  FETCH_ADMIN_USER_LIST_SUCCESS,
  FETCH_ADMIN_USER_LIST_FAILURE,
  FETCH_ADMIN_INVITE_LIST,
  FETCH_ADMIN_INVITE_LIST_SUCCESS,
  FETCH_ADMIN_INVITE_LIST_FAILURE,
  POST_ADMIN_INVITE,
  POST_ADMIN_INVITE_SUCCESS,
  POST_ADMIN_INVITE_FAILURE,
  CANCEL_ADMIN_INVITE,
  CANCEL_ADMIN_INVITE_SUCCESS,
  CANCEL_ADMIN_INVITE_FAILURE,
  FETCH_ADMIN_USER,
  FETCH_ADMIN_USER_SUCCESS,
  FETCH_ADMIN_USER_FAILURE,
  DELETE_ADMIN_USER,
  DELETE_ADMIN_USER_SUCCESS,
  DELETE_ADMIN_USER_FAILURE,
} from "./actionTypes";

import { AdminOrganizationActions, AdminOrganizationState } from "./types";

const initialState: AdminOrganizationState = {
  pending: false,
  adminOrganizationList: [],
  adminOrganization: null,
  adminUserList: [],
  adminUser: null,
  adminInviteList: [],
  error: null,
};

export default (state = initialState, action: AdminOrganizationActions) => {
  switch (action.type) {
    case FETCH_ADMIN_ORGANIZATION_LIST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ADMIN_ORGANIZATION_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        adminOrganizationList: action.payload.adminOrganizationList,
        error: null,
      };
    case FETCH_ADMIN_ORGANIZATION_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        adminOrganizationList: [],
        error: action.payload.error,
      };
    case FETCH_ADMIN_ORGANIZATION:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ADMIN_ORGANIZATION_SUCCESS:
      return {
        ...state,
        pending: false,
        adminOrganization: action.payload.adminOrganization,
        error: null,
      };
    case FETCH_ADMIN_ORGANIZATION_FAILURE:
      return {
        ...state,
        pending: false,
        adminOrganization: null,
        error: action.payload.error,
      };
    case FETCH_ADMIN_USER_LIST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ADMIN_USER_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        adminUserList: action.payload.adminUserList,
        error: null,
      };
    case FETCH_ADMIN_USER_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        adminUserList: [],
        error: action.payload.error,
      };
    case FETCH_ADMIN_INVITE_LIST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ADMIN_INVITE_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        adminInviteList: action.payload.adminInviteList,
        error: null,
      };
    case FETCH_ADMIN_INVITE_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        adminInviteList: [],
        error: action.payload.error,
      };
    case POST_ADMIN_INVITE:
      return {
        ...state,
        pending: true,
      };
    case POST_ADMIN_INVITE_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case POST_ADMIN_INVITE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case CANCEL_ADMIN_INVITE:
      return {
        ...state,
        pending: true,
      };
    case CANCEL_ADMIN_INVITE_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case CANCEL_ADMIN_INVITE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case FETCH_ADMIN_USER:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ADMIN_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        adminUser: action.payload.adminUser,
        error: null,
      };
    case FETCH_ADMIN_USER_FAILURE:
      return {
        ...state,
        pending: false,
        adminUser: null,
        error: action.payload.error,
      };
    case DELETE_ADMIN_USER:
      return {
        ...state,
        pending: true,
      };
    case DELETE_ADMIN_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case DELETE_ADMIN_USER_FAILURE:
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
