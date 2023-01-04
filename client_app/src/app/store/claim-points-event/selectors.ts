import { AppState } from "../rootReducer";

export const getPendingSelector = (state: AppState) => state.claimPointsEvent.pending;

export const getClaimPointsEventListSelector = (state: AppState) => state.claimPointsEvent.claimPointsEventList;

export const getErrorSelector = (state: AppState) => state.claimPointsEvent.error;
