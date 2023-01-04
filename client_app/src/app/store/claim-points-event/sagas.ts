import axios, { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { fetchClaimPointsEventListFailure, fetchClaimPointsEventListSuccess } from "./actions";
import { FETCH_CLAIM_POINTS_EVENT_LIST } from "./actionTypes";
import { IClaimPointEvent } from "./types";


const getClaimPointsEventList = (token:string) =>
  axios.get<IClaimPointEvent[]>("api/claim-points-events/",{ headers: { Authorization: `Bearer ${token}` } });

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/
function* fetchClaimPointsEventListSaga() {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IClaimPointEvent[]> = yield call(getClaimPointsEventList, token);
    yield put(
      fetchClaimPointsEventListSuccess({
        claimPointsEventList: response.data
      })
    );
  } catch (e) {
    yield put(
      fetchClaimPointsEventListFailure({
        error: e.message
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
  Allows concurrent increments.
*/
function* claimPointsEventSaga() {
  yield all([takeLatest(FETCH_CLAIM_POINTS_EVENT_LIST, fetchClaimPointsEventListSaga)]);
}

export default claimPointsEventSaga;
