import axios, { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { fetchAdminGiftCardRequestListFailure, fetchAdminGiftCardRequestListSuccess } from "./actions";
import { FETCH_ADMIN_GIFT_CARD_REQUEST_LIST } from "./actionTypes";
import { IAdminGiftCardRequest } from "./types";


const getAdminGiftCardRequestList = (token:string) =>
  axios.get<IAdminGiftCardRequest[]>("api/admin/gift-card-requests/",{ headers: { Authorization: `Bearer ${token}` } });

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/
function* fetchAdminGiftCardRequestListSaga() {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IAdminGiftCardRequest[]> = yield call(getAdminGiftCardRequestList, token);
    yield put(
      fetchAdminGiftCardRequestListSuccess({
        adminGiftCardRequestList: response.data
      })
    );
  } catch (e) {
    yield put(
      fetchAdminGiftCardRequestListFailure({
        error: e.message
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
  Allows concurrent increments.
*/
function* AdminGiftCardRequestSaga() {
  yield all([takeLatest(FETCH_ADMIN_GIFT_CARD_REQUEST_LIST, fetchAdminGiftCardRequestListSaga)]);
}

export default AdminGiftCardRequestSaga;
