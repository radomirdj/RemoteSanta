import { AppState } from "../rootReducer";

export const getPendingSelector = (state: AppState) =>
  state.giftCardRequest.pending;

export const getGiftCardRequestListSelector = (state: AppState) =>
  state.giftCardRequest.giftCardRequestList;

export const getGiftCardFileSelector = (state: AppState) =>
  state.giftCardRequest.giftCardFile;

export const getGiftCardIntegrationListSelector = (state: AppState) =>
  state.giftCardRequest.giftCardIntegrationList;

export const getGiftCardRequestIntegrationSelector = (state: AppState) =>
  state.giftCardRequest.giftCardRequestIntegration;

export const getGiftCardRequestAmountSelector = (state: AppState) =>
  state.giftCardRequest.giftCardRequestAmount;

export const getStepperPagetSelector = (state: AppState) =>
  state.giftCardRequest.stepperPage;

export const getErrorSelector = (state: AppState) =>
  state.giftCardRequest.error;
