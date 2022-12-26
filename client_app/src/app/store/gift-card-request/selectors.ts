import { AppState } from "../rootReducer";

export const getPendingSelector = (state: AppState) => state.giftCardRequest.pending;

export const getGiftCardRequestListSelector = (state: AppState) => state.giftCardRequest.giftCardRequestList;

export const getGiftCardIntegrationListSelector = (state: AppState) => state.giftCardRequest.giftCardIntegrationList;

export const getErrorSelector = (state: AppState) => state.giftCardRequest.error;
