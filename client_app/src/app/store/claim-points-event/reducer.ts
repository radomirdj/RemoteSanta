import { act } from "@testing-library/react";
import {
  FETCH_CLAIM_POINTS_EVENT_LIST,
  FETCH_CLAIM_POINTS_EVENT_LIST_FAILURE,
  FETCH_CLAIM_POINTS_EVENT_LIST_SUCCESS,
} from "./actionTypes";

import { ClaimPointsEventActions, ClaimPointsEventState } from "./types";

const initialState: ClaimPointsEventState = {
  pending: false,
  claimPointsEventList: [],
  error: null
};

export default (state = initialState, action: ClaimPointsEventActions) => {
  switch (action.type) {
    case FETCH_CLAIM_POINTS_EVENT_LIST:
      return {
        ...state,
        pending: true
      };
    case FETCH_CLAIM_POINTS_EVENT_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        claimPointsEventList: action.payload.claimPointsEventList,
        error: null
      };
    case  FETCH_CLAIM_POINTS_EVENT_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        claimPointsEventList: [],
        error: action.payload.error
      };
    default:
      return {
        ...state
      };
  }
};
