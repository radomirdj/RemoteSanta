import { act } from "@testing-library/react";
import {
  FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST,
  FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST_FAILURE,
  FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST_SUCCESS,
  POST_ADMIN_TO_ORG_TRANSACTION,
  POST_ADMIN_TO_ORG_TRANSACTION_SUCCESS,
  POST_ADMIN_TO_ORG_TRANSACTION_FAILURE,
} from "./actionTypes";

import {
  AdminOrganizationTransactionActions,
  AdminOrganizationTransactionState,
} from "./types";

const initialState: AdminOrganizationTransactionState = {
  pending: false,
  adminOrganizationTransactionList: [],
  error: null,
};

export default (
  state = initialState,
  action: AdminOrganizationTransactionActions
) => {
  switch (action.type) {
    case FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        adminOrganizationTransactionList:
          action.payload.adminOrganizationTransactionList,
        error: null,
      };
    case FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        adminOrganizationTransactionList: [],
        error: action.payload.error,
      };
    case POST_ADMIN_TO_ORG_TRANSACTION:
      return {
        ...state,
        pending: true,
      };
    case POST_ADMIN_TO_ORG_TRANSACTION_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case POST_ADMIN_TO_ORG_TRANSACTION_FAILURE:
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
