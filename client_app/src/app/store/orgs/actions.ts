import {
  FETCH_ORGANIZATION,
  FETCH_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATION_FAILURE,
  FETCH_ORG_TRANSACTION_LIST,
  FETCH_ORG_TRANSACTION_LIST_SUCCESS,
  FETCH_ORG_TRANSACTION_LIST_FAILURE,
} from "./actionTypes";
import {
  FetchOrganization,
  FetchOrganizationSuccess,
  FetchOrganizationSuccessPayload,
  FetchOrganizationFailurePayload,
  FetchOrganizationFailure,
  FetchOrganizationTransactionList,
  FetchOrganizationTransactionListSuccessPayload,
  FetchOrganizationTransactionListSuccess,
  FetchOrganizationTransactionListFailurePayload,
  FetchOrganizationTransactionListFailure,
} from "./types";

export const fetchOrganization = (): FetchOrganization => ({
  type: FETCH_ORGANIZATION,
});

export const fetchOrganizationSuccess = (
  payload: FetchOrganizationSuccessPayload
): FetchOrganizationSuccess => ({
  type: FETCH_ORGANIZATION_SUCCESS,
  payload,
});

export const fetchOrganizationFailure = (
  payload: FetchOrganizationFailurePayload
): FetchOrganizationFailure => ({
  type: FETCH_ORGANIZATION_FAILURE,
  payload,
});

export const fetchOrganizationTransactionList =
  (): FetchOrganizationTransactionList => ({
    type: FETCH_ORG_TRANSACTION_LIST,
  });

export const fetchOrganizationTransactionListSuccess = (
  payload: FetchOrganizationTransactionListSuccessPayload
): FetchOrganizationTransactionListSuccess => ({
  type: FETCH_ORG_TRANSACTION_LIST_SUCCESS,
  payload,
});

export const fetchOrganizationTransactionListFailure = (
  payload: FetchOrganizationTransactionListFailurePayload
): FetchOrganizationTransactionListFailure => ({
  type: FETCH_ORG_TRANSACTION_LIST_FAILURE,
  payload,
});
