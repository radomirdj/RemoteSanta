import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  getAdminOrganization,
  getAdminOrganizationList,
  getAdminUserList,
} from "../../services/api-service";
import {
  fetchAdminOrganizationFailure,
  fetchAdminOrganizationListFailure,
  fetchAdminOrganizationListSuccess,
  fetchAdminOrganizationSuccess,
  fetchAdminUserListFailure,
  fetchAdminUserListSuccess,
} from "./actions";
import {
  FETCH_ADMIN_ORGANIZATION,
  FETCH_ADMIN_ORGANIZATION_LIST,
  FETCH_ADMIN_USER_LIST,
} from "./actionTypes";
import {
  FetchAdminOrganization,
  FetchAdminUserList,
  IAdminOrganization,
  IAdminUser,
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

/*
  Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
  Allows concurrent increments.
*/
function* AdminOrganizationSaga() {
  yield all([
    takeLatest(FETCH_ADMIN_ORGANIZATION_LIST, fetchAdminOrganizationListSaga),
    takeLatest(FETCH_ADMIN_ORGANIZATION, fetchAdminOrganizationSaga),
    takeLatest(FETCH_ADMIN_USER_LIST, fetchAdminUserListSaga),
  ]);
}

export default AdminOrganizationSaga;
