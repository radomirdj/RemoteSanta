import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  getOrganization,
  getOrganizationTransactionList,
} from "../../services/api-service";
import {
  fetchOrganizationFailure,
  fetchOrganizationSuccess,
  fetchOrganizationTransactionListFailure,
  fetchOrganizationTransactionListSuccess,
} from "./actions";
import { FETCH_ORGANIZATION, FETCH_ORG_TRANSACTION_LIST } from "./actionTypes";
import {
  FetchOrganization,
  FetchOrganizationTransactionList,
  IOrganization,
  IOrgTransaction,
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
  ]);
}

export default OrganizationSaga;
