import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  getAdminOrganizationTransactionList,
  postAdminToOrganizationTransaction,
} from "../../services/api-service";
import { fetchAdminOrganization } from "../admin-organization/actions";
import {
  fetchAdminOrganizationTransactionListFailure,
  fetchAdminOrganizationTransactionListSuccess,
  postAdminToOrgTransactionFailure,
  postAdminToOrgTransactionSuccess,
} from "./actions";
import {
  FETCH_ADMIN_ORGANIZATION_TRANSACTION_LIST,
  POST_ADMIN_TO_ORG_TRANSACTION,
} from "./actionTypes";
import {
  FetchAdminOrganizationTransactionList,
  IAdminOrganizationTransaction,
  PostAdminToOrgTransaction,
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

function* postAdminToOrgTransactionSaga(action: PostAdminToOrgTransaction) {
  try {
    const token: string = localStorage.getItem("token") || "";
    yield call(postAdminToOrganizationTransaction, token, action.payload);
    yield put(postAdminToOrgTransactionSuccess());
    yield put(
      fetchAdminOrganization({ organizationId: action.payload.organizationId })
    );
  } catch (e) {
    yield put(
      postAdminToOrgTransactionFailure({
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
    takeLatest(POST_ADMIN_TO_ORG_TRANSACTION, postAdminToOrgTransactionSaga),
  ]);
}

export default AdminOrganizationTransactionSaga;
