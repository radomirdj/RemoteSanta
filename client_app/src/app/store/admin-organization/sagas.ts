import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  cancelInviteAdmin,
  getAdminInviteList,
  getAdminOrganization,
  getAdminOrganizationList,
  getAdminUserList,
  postInviteAdmin,
} from "../../services/api-service";
import { setCloseDialog, setCloseModal } from "../user-invites/actions";
import {
  cancelAdminInviteFailure,
  cancelAdminInviteSuccess,
  fetchAdminInviteListFailure,
  fetchAdminInviteListSuccess,
  fetchAdminOrganizationFailure,
  fetchAdminOrganizationListFailure,
  fetchAdminOrganizationListSuccess,
  fetchAdminOrganizationSuccess,
  fetchAdminUserListFailure,
  fetchAdminUserListSuccess,
  postAdminInviteFailure,
  postAdminInviteSuccess,
} from "./actions";
import {
  CANCEL_ADMIN_INVITE,
  FETCH_ADMIN_INVITE_LIST,
  FETCH_ADMIN_ORGANIZATION,
  FETCH_ADMIN_ORGANIZATION_LIST,
  FETCH_ADMIN_USER_LIST,
  POST_ADMIN_INVITE,
} from "./actionTypes";
import {
  CancelAdminInvite,
  FetchAdminInviteList,
  FetchAdminOrganization,
  FetchAdminUserList,
  IAdminInvite,
  IAdminOrganization,
  IAdminUser,
  PostAdminInvite,
} from "./types";

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/
function* fetchAdminOrganizationListSaga() {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IAdminOrganization[]> = yield call(
      getAdminOrganizationList,
      token
    );
    yield put(
      fetchAdminOrganizationListSuccess({
        adminOrganizationList: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchAdminOrganizationListFailure({
        error: e.message,
      })
    );
  }
}

function* fetchAdminOrganizationSaga(action: FetchAdminOrganization) {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IAdminOrganization> = yield call(
      getAdminOrganization,
      action.payload,
      token
    );
    yield put(
      fetchAdminOrganizationSuccess({
        adminOrganization: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchAdminOrganizationFailure({
        error: e.message,
      })
    );
  }
}

function* fetchAdminUserListSaga(action: FetchAdminUserList) {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IAdminUser[]> = yield call(
      getAdminUserList,
      action.payload,
      token
    );
    yield put(
      fetchAdminUserListSuccess({
        adminUserList: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchAdminUserListFailure({
        error: e.message,
      })
    );
  }
}

function* fetchAdminInviteListSaga(action: FetchAdminInviteList) {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IAdminInvite[]> = yield call(
      getAdminInviteList,
      action.payload,
      token
    );
    yield put(
      fetchAdminInviteListSuccess({
        adminInviteList: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchAdminInviteListFailure({
        error: e.message,
      })
    );
  }
}

function* postAdminInviteSaga(action: PostAdminInvite) {
  try {
    const token: string = localStorage.getItem("token") || "";
    yield call(postInviteAdmin, action.payload, token);
    yield put(postAdminInviteSuccess());
    yield put(setCloseModal());
  } catch (e) {
    console.log("function*signUpSaga -> e", e);
    yield put(
      postAdminInviteFailure({
        error: e.response.data.message,
      })
    );
  }
}

function* cancelAdminInviteSaga(action: CancelAdminInvite) {
  try {
    const token: string = localStorage.getItem("token") || "";
    yield call(cancelInviteAdmin, action.payload, token);
    yield put(cancelAdminInviteSuccess());
    yield put(setCloseDialog());
  } catch (e) {
    console.log("function*signUpSaga -> e", e);
    yield put(
      cancelAdminInviteFailure({
        error: e.response.data.message,
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
  Allows concurrent increments.
*/
function* AdminOrganizationSaga() {
  yield all([
    takeLatest(FETCH_ADMIN_ORGANIZATION_LIST, fetchAdminOrganizationListSaga),
    takeLatest(FETCH_ADMIN_ORGANIZATION, fetchAdminOrganizationSaga),
    takeLatest(FETCH_ADMIN_USER_LIST, fetchAdminUserListSaga),
    takeLatest(FETCH_ADMIN_INVITE_LIST, fetchAdminInviteListSaga),
    takeLatest(POST_ADMIN_INVITE, postAdminInviteSaga),
    takeLatest(CANCEL_ADMIN_INVITE, cancelAdminInviteSaga),
  ]);
}

export default AdminOrganizationSaga;
