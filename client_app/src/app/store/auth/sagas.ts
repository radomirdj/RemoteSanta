import axios, { AxiosResponse, AxiosError } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { AuthUser } from "../../entitites/AuthUser";

import { getSelfFailure, getSelfSuccess, loginFailure, loginSuccess, logout, signUpFailure, signUpSuccess } from "./actions";
import { GET_SELF_REQUEST, LOGIN_REQUEST, LOGOUT, SIGN_UP_REQUEST } from "./actionTypes";
import { GetSelfRequest, LoginRequest, LoginRequestPayload, LoginSuccessPayload, Logout, SignUpRequest, SignUpRequestPayload } from "./types";

const signUp = (payload: SignUpRequestPayload) => {
  return axios.post<string>("api/users/signup", payload);
};

const login = async (payload: LoginRequestPayload) => {
  const response = await axios.post<string>("api/users/login", payload);
  return { authUser: response.data };
};

const getUserSelf = async (token: string) => {
  const response = await axios.get<string>("api/users/self", { headers: { Authorization: `Bearer ${token}` } });
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
    console.log("function*signUpSaga -> e", e);
    yield put(
      signUpFailure({
        error: e.response.data.message
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
    localStorage.setItem("token", loginSuccessPayload.authUser.accessToken);
  } catch (e) {
    console.log("function*loginSaga -> e", e);
    yield put(
      loginFailure({
        error: e.response.data.message
      })
    );
  }
}

function* getSelfSaga(action: GetSelfRequest) {
  try {
    const token: string = localStorage.getItem("token") || "";
    if (!token) {
      yield put(
        getSelfFailure({
          error: "no token"
        })
      );
    } else {
      const getSelfSuccessPayload: LoginSuccessPayload = yield call(getUserSelf, token);
      yield put(
        getSelfSuccess(getSelfSuccessPayload)
      );
    }
  } catch (e) {
    console.log("function*getSelfSaga -> e", e);
    yield put(
      getSelfFailure({
        error: e.response.data.message
      })
    );
  }
}

function* logoutSaga(action: Logout) {
  localStorage.removeItem("token");
}

/*
  Starts worker saga on latest dispatched `FETCH_MESSAGE_REQUEST` action.
  Allows concurrent increments.
*/
function* authSaga() {
  yield all([takeLatest(SIGN_UP_REQUEST, signUpSaga)]);
  yield all([takeLatest(LOGIN_REQUEST, loginSaga)]);
  yield all([takeLatest(GET_SELF_REQUEST, getSelfSaga)]);
  yield all([takeLatest(LOGOUT, logoutSaga)]);
}

export default authSaga;
