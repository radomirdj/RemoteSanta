import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { getAdminOrganizationTransactionList } from "../../services/api-service";
import {
  fetchAdminOrganizationTransactionListFailure,
  fetchAdminOrganizationTransactionListSuccess,
} from "./actions";
import { FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST } from "./actionTypes";
import {
  FetchAdminOrganizationTransactionList,
  IAdminOrganizationTransaction,
} from "./types";

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
