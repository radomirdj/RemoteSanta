import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  cancelInviteUser,
  getUserInviteList,
  postInviteUser,
} from "../../services/api-service";
import {
  cancelUserInviteFailure,
  cancelUserInviteSuccess,
  fetchUserInviteListFailure,
  fetchUserInviteListSuccess,
  postUserInviteFailure,
  postUserInviteSuccess,
  setCloseDialog,
  setCloseModal,
} from "./actions";
import {
  CANCEL_USER_INVITE,
  FETCH_USER_INVITE_LIST,
  POST_USER_INVITE,
} from "./actionTypes";
import {
  CancelUserInvite,
  FetchUserInviteList,
  IUserInvite,
  PostUserInvite,
} from "./types";

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/

function* fetchUserInviteListSaga(action: FetchUserInviteList) {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IUserInvite[]> = yield call(
      getUserInviteList,
      action.payload,
      token
    );
    yield put(
      fetchUserInviteListSuccess({
        userInviteList: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchUserInviteListFailure({
        error: e.message,
      })
    );
  }
}

function* postUserInviteSaga(action: PostUserInvite) {
  try {
    const token: string = localStorage.getItem("token") || "";
    yield call(postInviteUser, action.payload, token);
    yield put(postUserInviteSuccess());
    yield put(setCloseModal());
  } catch (e) {
    console.log("function*signUpSaga -> e", e);
    yield put(
      postUserInviteFailure({
        error: e.response.data.message,
      })
    );
  }
}

function* cancelUserInviteSaga(action: CancelUserInvite) {
  try {
    const token: string = localStorage.getItem("token") || "";
    yield call(cancelInviteUser, action.payload, token);
    yield put(cancelUserInviteSuccess());
    yield put(setCloseDialog());
  } catch (e) {
    console.log("function*signUpSaga -> e", e);
    yield put(
      cancelUserInviteFailure({
        error: e.response.data.message,
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
  Allows concurrent increments.
*/
function* UserInviteSaga() {
  yield all([
    takeLatest(FETCH_USER_INVITE_LIST, fetchUserInviteListSaga),
    takeLatest(POST_USER_INVITE, postUserInviteSaga),
    takeLatest(CANCEL_USER_INVITE, cancelUserInviteSaga),
  ]);
}

export default UserInviteSaga;
