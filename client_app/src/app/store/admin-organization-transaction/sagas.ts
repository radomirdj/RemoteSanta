import axios, { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchAdminOrganizationTransactionListFailure,
  fetchAdminOrganizationTransactionListSuccess,
} from "./actions";
import { FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST } from "./actionTypes";
import {
  FetchAdminOrganizationTransactionList,
  FetchAdminOrganizationTransactionListPayload,
  IAdminOrganizationTransaction,
} from "./types";

const getAdminOrganizationTransactionList = (
  payload: FetchAdminOrganizationTransactionListPayload,
  token: string
) =>
  axios.get<IAdminOrganizationTransaction[]>(
    `api/admin/orgs/${payload.organizationId}/transactions/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/
function* fetchAdminOrganizationTransactionListSaga(
  action: FetchAdminOrganizationTransactionList
) {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IAdminOrganizationTransaction[]> = yield call(
      getAdminOrganizationTransactionList,
      action.payload,
      token
    );
    yield put(
      fetchAdminOrganizationTransactionListSuccess({
        adminOrganizationTransactionList: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchAdminOrganizationTransactionListFailure({
        error: e.message,
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
  Allows concurrent increments.
*/
function* AdminOrganizationTransactionSaga() {
  yield all([
    takeLatest(
      FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST,
      fetchAdminOrganizationTransactionListSaga
    ),
  ]);
}

export default AdminOrganizationTransactionSaga;
