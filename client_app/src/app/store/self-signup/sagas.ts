import { all, call, put, takeLatest } from "redux-saga/effects";
import { selfSignupOrgUser } from "../../services/api-service";

import { selfSignUpFailure, selfSignUpSuccess } from "./actions";
import { SELF_SIGN_UP_REQUEST } from "./actionTypes";
import { SelfSignUpRequest } from "./types";

/*
  Worker Saga: Fired on FETCH_MESSAGE_REQUEST action
*/
function* selfSignUpSaga(action: SelfSignUpRequest) {
  try {
    yield call(selfSignupOrgUser, action.payload);
    yield put(selfSignUpSuccess());
    action.navigate("/company-signup-verify-email");
  } catch (e) {
    console.log("function*signUpSaga -> e", e);
    yield put(
      selfSignUpFailure({
        error: e.response.data.message,
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_MESSAGE_REQUEST` action.
  Allows concurrent increments.
*/
function* selfSignupSaga() {
  yield all([takeLatest(SELF_SIGN_UP_REQUEST, selfSignUpSaga)]);
}

export default selfSignupSaga;
