import axios, { AxiosResponse, AxiosError } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { fetchMessageFailure, fetchMessageSuccess } from "./actions";
import { FETCH_MESSAGE_REQUEST } from "./actionTypes";

const getMessage = () => {
  return axios.get<string>("api/");
};

/*
  Worker Saga: Fired on FETCH_MESSAGE_REQUEST action
*/
function* fetchMessageSaga() {
  try {
    const response: AxiosResponse<string> = yield call(getMessage);
    yield put(
      fetchMessageSuccess({
        message: response.data,
      })
    );
  } catch (e) {
    console.log("function*fetchMessageSaga -> e", e);
    yield put(
      fetchMessageFailure({
        error: e.message,
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_MESSAGE_REQUEST` action.
  Allows concurrent increments.
*/
function* messageSaga() {
  yield all([takeLatest(FETCH_MESSAGE_REQUEST, fetchMessageSaga)]);
}

export default messageSaga;
