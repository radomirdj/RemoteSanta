import { AppState } from "../rootReducer";

export const getPendingSelector = (state: AppState) =>
  state.adminGiftCardRequest.pending;

export const getAdminGiftCardRequestListSelector = (state: AppState) =>
  state.adminGiftCardRequest.adminGiftCardRequestList;

export const getAdminGiftCardRequestSelector = (state: AppState) =>
  state.adminGiftCardRequest.adminGiftCardRequest;

export const getAdminGiftCardRequestUserSelector = (state: AppState) =>
  state.adminGiftCardRequest.adminGiftCardRequestUser;

export const getErrorSelector = (state: AppState) =>
  state.adminGiftCardRequest.error;
