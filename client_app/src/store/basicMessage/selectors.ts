import { AppState } from "../rootReducer";

export const getPendingSelector = (state: AppState) => state.message.pending;

export const getMessageSelector = (state: AppState) => state.message.message;

export const getErrorSelector = (state: AppState) => state.message.error;
