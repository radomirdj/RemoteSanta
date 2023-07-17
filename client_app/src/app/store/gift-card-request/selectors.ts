import { AppState } from "../rootReducer";

export const getPendingSelector = (state: AppState) =>
  state.giftCardRequest.pending;

export const getGiftCardRequestListSelector = (state: AppState) =>
  state.giftCardRequest.giftCardRequestList;

export const getGiftCardIntegrationListSelector = (state: AppState) =>
  state.giftCardRequest.giftCardIntegrationList;

export const getGiftCardRequestIntegrationSelector = (state: AppState) =>
  state.giftCardRequest.giftCardRequestIntegration;

export const getGiftCardRequestAmountSelector = (state: AppState) =>
  state.giftCardRequest.giftCardRequestAmount;

export const getGiftCardRequestMessageSelector = (state: AppState) =>
  state.giftCardRequest.giftCardRequestMessage;

export const getGiftCardRequestAmountInIntegrationCurrencySelector = (
  state: AppState
) => state.giftCardRequest.giftCardRequestAmountInIntegrationCurrency;

export const getStepperPagetSelector = (state: AppState) =>
  state.giftCardRequest.stepperPage;

export const getErrorSelector = (state: AppState) =>
  state.giftCardRequest.error;

export const getGiftCardIntegrationSelector = (state: AppState) =>
  state.giftCardRequest.giftCardIntegration;
