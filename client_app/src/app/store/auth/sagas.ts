import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { getUserSelf } from "../../services/api-service";

import {
  changePasswordFailure,
  changePasswordSuccess,
  forgotPasswordFailure,
  forgotPasswordSuccess,
  getSelfFailure,
  getSelfSuccess,
  loginFailure,
  loginSuccess,
  signUpFailure,
  signUpSuccess,
} from "./actions";
import {
  CHANGE_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  GET_SELF_REQUEST,
  LOGIN_REQUEST,
  LOGOUT,
  SIGN_UP_REQUEST,
} from "./actionTypes";
import {
  ChangePasswordRequest,
  ChangePasswordRequestPayload,
  ForgotPasswordRequest,
  ForgotPasswordRequestPayload,
  GetSelfRequest,
  LoginRequest,
  LoginRequestPayload,
  LoginSuccessPayload,
  Logout,
  SignUpRequest,
  SignUpRequestPayload,
} from "./types";

const signUp = (payload: SignUpRequestPayload) => {
  return axios.post<string>("api/users/signup", payload);
};

const login = async (payload: LoginRequestPayload) => {
  const response = await axios.post<string>("api/users/login", payload);
  return { authUser: response.data };
};

const forgotPassword = async (payload: ForgotPasswordRequestPayload) => {
  return axios.post<string>("api/users/forgot-password", payload);
};

const changePassword = async (payload: ChangePasswordRequestPayload) => {
  return axios.post<string>("api/users/confirm-password", payload);
};

/*
  Worker Saga: Fired on FETCH_MESSAGE_REQUEST action
*/
function* signUpSaga(action: SignUpRequest) {
  try {
    yield call(signUp, action.payload);
    yield put(signUpSuccess());
    action.navigate("/verify-email");
  } catch (e) {
    console.log("function*signUpSaga -> e", e);
    yield put(
      signUpFailure({
        error: e.response.data.message,
      })
    );
  }
}

function* loginSaga(action: LoginRequest) {
  try {
    const loginSuccessPayload: LoginSuccessPayload = yield call(
      login,
      action.payload
    );
    yield put(loginSuccess(loginSuccessPayload));
    localStorage.setItem("token", loginSuccessPayload.authUser.accessToken);
    localStorage.setItem("userRole", loginSuccessPayload.authUser.userRole);
  } catch (e) {
    console.log("function*loginSaga -> e", e);
    yield put(
      loginFailure({
        error: e.response.data.message,
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
          error: "no token",
        })
      );
    } else {
      const getSelfSuccessPayload: LoginSuccessPayload = yield call(
        getUserSelf,
        token
      );
      yield put(getSelfSuccess(getSelfSuccessPayload));
    }
  } catch (e) {
    console.log("function*getSelfSaga -> e", e);
    yield put(
      getSelfFailure({
        error: e.response.data.message,
      })
    );
  }
}

function* logoutSaga(action: Logout) {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  action.navigate("/login");
}

function* forgotPasswordSaga(action: ForgotPasswordRequest) {
  try {
    yield call(forgotPassword, action.payload);
    yield put(forgotPasswordSuccess());
    action.navigate("/change-password");
  } catch (e) {
    console.log("function*forgotPasswordSaga -> e", e);
    yield put(
      forgotPasswordFailure({
        error: e.response.data.message,
      })
    );
  }
}

function* changePasswordSaga(action: ChangePasswordRequest) {
  try {
    yield call(changePassword, action.payload);
    yield put(changePasswordSuccess());
    action.navigate("/change-password-success");
  } catch (e) {
    console.log("function*changePasswordSaga -> e", e);
    yield put(
      changePasswordFailure({
        error: e.response.data.message,
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
  yield all([takeLatest(GET_SELF_REQUEST, getSelfSaga)]);
  yield all([takeLatest(LOGOUT, logoutSaga)]);
  yield all([takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordSaga)]);
  yield all([takeLatest(CHANGE_PASSWORD_REQUEST, changePasswordSaga)]);
}

export default authSaga;
