import axios, { AxiosResponse, AxiosError } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { signUpFailure, signUpSuccess } from "./actions";
import { SIGN_UP_REQUEST } from "./actionTypes";
import { SignUpRequest, SignUpRequestPayload } from "./types";

const signUp = (payload: SignUpRequestPayload) => {
  return axios.post<string>("api/users/signup", payload);
};

/*
  Worker Saga: Fired on FETCH_MESSAGE_REQUEST action
*/
function* signUpSaga(action: SignUpRequest) {
  console.log(action.payload)
  try {
    yield call(signUp, action.payload);
    yield put(
      signUpSuccess()
    );
  } catch (e) {
    console.log("function*fetchMessageSaga -> e", e);
    yield put(
      signUpFailure({
        error: e.message
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_MESSAGE_REQUEST` action.
  Allows concurrent increments.
*/
function* authSaga() {
  yield all([takeLatest(SIGN_UP_REQUEST, signUpSaga)]);
}

export default authSaga;
