import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  getOrganization,
  getOrganizationTransactionList,
  getOrganizationUserList,
} from "../../services/api-service";
import {
  fetchOrganizationFailure,
  fetchOrganizationSuccess,
  fetchOrganizationTransactionListFailure,
  fetchOrganizationTransactionListSuccess,
  fetchOrganizationUserListFailure,
  fetchOrganizationUserListSuccess,
} from "./actions";
import {
  FETCH_ORGANIZATION,
  FETCH_ORG_TRANSACTION_LIST,
  FETCH_ORG_USER_LIST,
} from "./actionTypes";
import {
  FetchOrganization,
  FetchOrganizationTransactionList,
  FetchOrganizationUserList,
  IOrganization,
  IOrgTransaction,
  IOrgUser,
} from "./types";

function* fetchOrganizationSaga(action: FetchOrganization) {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IOrganization> = yield call(
      getOrganization,
      token
    );
    yield put(
      fetchOrganizationSuccess({
        organization: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchOrganizationFailure({
        error: e.message,
      })
    );
  }
}

function* fetchOrganizationTransactionListSaga(
  action: FetchOrganizationTransactionList
) {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IOrgTransaction[]> = yield call(
      getOrganizationTransactionList,
      token
    );
    yield put(
      fetchOrganizationTransactionListSuccess({
        organizationTransactionList: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchOrganizationTransactionListFailure({
        error: e.message,
      })
    );
  }
}

function* fetchOrganizationUserListSaga(action: FetchOrganizationUserList) {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IOrgUser[]> = yield call(
      getOrganizationUserList,
      token
    );
    yield put(
      fetchOrganizationUserListSuccess({
        orgUserList: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchOrganizationUserListFailure({
        error: e.message,
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
  Allows concurrent increments.
*/
function* OrganizationSaga() {
  yield all([
    takeLatest(FETCH_ORGANIZATION, fetchOrganizationSaga),
    takeLatest(
      FETCH_ORG_TRANSACTION_LIST,
      fetchOrganizationTransactionListSaga
    ),
    takeLatest(FETCH_ORG_USER_LIST, fetchOrganizationUserListSaga),
  ]);
}

export default OrganizationSaga;