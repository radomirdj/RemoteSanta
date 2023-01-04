import axios, { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { fetchAdminOrganizationListFailure, fetchAdminOrganizationListSuccess } from "./actions";
import {  FETCH_ADMIN_ORGANIZATION_LIST } from "./actionTypes";
import { IAdminOrganization } from "./types";


const getAdminOrganizationList = (token:string) =>
  axios.get<IAdminOrganization[]>("api/admin/orgs/",{ headers: { Authorization: `Bearer ${token}` } });

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/
function* fetchAdminOrganizationListSaga() {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IAdminOrganization[]> = yield call(getAdminOrganizationList, token);
    yield put(
      fetchAdminOrganizationListSuccess({
        adminOrganizationList: response.data
      })
    );
  } catch (e) {
    yield put(
      fetchAdminOrganizationListFailure({
        error: e.message
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
  Allows concurrent increments.
*/
function* AdminOrganizationSaga() {
  yield all([takeLatest(FETCH_ADMIN_ORGANIZATION_LIST, fetchAdminOrganizationListSaga)]);
}

export default AdminOrganizationSaga;
