import axios, { AxiosResponse, AxiosError } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { AuthUser } from "../../entitites/AuthUser";

import { loginFailure, loginSuccess, signUpFailure, signUpSuccess } from "./actions";
import { LOGIN_REQUEST, SIGN_UP_REQUEST } from "./actionTypes";
import { LoginRequest, LoginRequestPayload, LoginSuccessPayload, SignUpRequest, SignUpRequestPayload } from "./types";

const signUp = (payload: SignUpRequestPayload) => {
  return axios.post<string>("api/users/signup", payload);
};

const login = async (payload: LoginRequestPayload) => {
  const response = await axios.post<string>("api/users/login", payload);
  return { authUser: response.data };
};

/*
  Worker Saga: Fired on FETCH_MESSAGE_REQUEST action
*/
function* signUpSaga(action: SignUpRequest) {
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


function* loginSaga(action: LoginRequest) {
  try {
    const loginSuccessPayload: LoginSuccessPayload = yield call(login, action.payload);

    yield put(
      loginSuccess(loginSuccessPayload)
    );
  } catch (e) {
    console.log("function*fetchMessageSaga -> e", e);
    yield put(
      loginFailure({
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
  yield all([takeLatest(LOGIN_REQUEST, loginSaga)]);
}

export default authSaga;
