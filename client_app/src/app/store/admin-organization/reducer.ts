import { act } from "@testing-library/react";
import {
  FETCH_ADMIN_ORGANIZATION_LIST,
  FETCH_ADMIN_ORGANIZATION_LIST_FAILURE,
  FETCH_ADMIN_ORGANIZATION_LIST_SUCCESS,
  FETCH_ADMIN_ORGANIZATION,
  FETCH_ADMIN_ORGANIZATION_FAILURE,
  FETCH_ADMIN_ORGANIZATION_SUCCESS,
} from "./actionTypes";

import { AdminOrganizationActions, AdminOrganizationState } from "./types";

const initialState: AdminOrganizationState = {
  pending: false,
  adminOrganizationList: [],
  adminOrganization: null,
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
    default:
      return {
        ...state,
      };
  }
};
