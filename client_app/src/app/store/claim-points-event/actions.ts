import {
  FETCH_CLAIM_POINTS_EVENT_LIST,
  FETCH_CLAIM_POINTS_EVENT_LIST_SUCCESS,
  FETCH_CLAIM_POINTS_EVENT_LIST_FAILURE,
} from "./actionTypes";
import {
  FetchClaimPointsEventList,
  FetchClaimPointsEventListSuccessPayload,
  FetchClaimPointsEventListSuccess,
  FetchClaimPointsEventListFailurePayload,
  FetchClaimPointsEventListFailure,
} from "./types";

export const fetchClaimPointsEventList = (): FetchClaimPointsEventList => ({
  type: FETCH_CLAIM_POINTS_EVENT_LIST
});

export const fetchClaimPointsEventListSuccess = (
  payload: FetchClaimPointsEventListSuccessPayload
): FetchClaimPointsEventListSuccess => ({
  type: FETCH_CLAIM_POINTS_EVENT_LIST_SUCCESS,
  payload
});

export const fetchClaimPointsEventListFailure = (
  payload: FetchClaimPointsEventListFailurePayload
): FetchClaimPointsEventListFailure => ({
  type: FETCH_CLAIM_POINTS_EVENT_LIST_FAILURE,
  payload
});
