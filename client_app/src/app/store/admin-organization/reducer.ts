import { act } from "@testing-library/react";
import {
  FETCH_ADMIN_ORGANIZATION_LIST,
  FETCH_ADMIN_ORGANIZATION_LIST_FAILURE,
  FETCH_ADMIN_ORGANIZATION_LIST_SUCCESS,
} from "./actionTypes";

import { AdminOrganizationActions, AdminOrganizationState } from "./types";

const initialState: AdminOrganizationState = {
  pending: false,
  adminOrganizationList: [],
  error: null
};

export default (state = initialState, action: AdminOrganizationActions) => {
  switch (action.type) {
    case FETCH_ADMIN_ORGANIZATION_LIST:
      return {
        ...state,
        pending: true
      };
    case FETCH_ADMIN_ORGANIZATION_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        adminOrganizationList: action.payload.adminOrganizationList,
        error: null
      };
    case  FETCH_ADMIN_ORGANIZATION_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        adminOrganizationList: [],
        error: action.payload.error
      };
    default:
      return {
        ...state
      };
  }
};
