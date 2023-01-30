import axios, { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  getAdminGiftCardRequest,
  getAdminGiftCardRequestUser,
} from "../../services/api-service";
import { AuthUser } from "../auth/types";
import {
  fetchAdminGiftCardRequestFailure,
  fetchAdminGiftCardRequestListFailure,
  fetchAdminGiftCardRequestListSuccess,
  fetchAdminGiftCardRequestSuccess,
  fetchAdminGiftCardRequestUserFailure,
  fetchAdminGiftCardRequestUserSuccess,
} from "./actions";
import {
  FETCH_ADMIN_GIFT_CARD_REQUEST,
  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST,
  FETCH_ADMIN_GIFT_CARD_REQUEST_USER,
} from "./actionTypes";
import {
  FetchAdminGiftCardRequest,
  FetchAdminGiftCardRequestUser,
  IAdminGiftCardRequest,
} from "./types";

const getAdminGiftCardRequestList = (token: string) =>
  axios.get<IAdminGiftCardRequest[]>("api/admin/gift-card-requests/", {
    headers: { Authorization: `Bearer ${token}` },
  });

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/
function* fetchAdminGiftCardRequestListSaga() {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IAdminGiftCardRequest[]> = yield call(
      getAdminGiftCardRequestList,
      token
    );
    yield put(
      fetchAdminGiftCardRequestListSuccess({
        adminGiftCardRequestList: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchAdminGiftCardRequestListFailure({
        error: e.message,
      })
    );
  }
}

function* fetchAdminGiftCardRequestSaga(action: FetchAdminGiftCardRequest) {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IAdminGiftCardRequest> = yield call(
      getAdminGiftCardRequest,
      action.payload,
      token
    );
    yield put(
      fetchAdminGiftCardRequestSuccess({
        adminGiftCardRequest: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchAdminGiftCardRequestFailure({
        error: e.message,
      })
    );
  }
}

function* fetchAdminGiftCardRequestUserSaga(
  action: FetchAdminGiftCardRequestUser
) {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<AuthUser> = yield call(
      getAdminGiftCardRequestUser,
      action.payload,
      token
    );
    yield put(
      fetchAdminGiftCardRequestUserSuccess({
        adminGiftCardRequestUser: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchAdminGiftCardRequestUserFailure({
        error: e.message,
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
  Allows concurrent increments.
*/
function* AdminGiftCardRequestSaga() {
  yield all([
    takeLatest(
      FETCH_ADMIN_GIFT_CARD_REQUEST_LIST,
      fetchAdminGiftCardRequestListSaga
    ),
    takeLatest(FETCH_ADMIN_GIFT_CARD_REQUEST, fetchAdminGiftCardRequestSaga),
    takeLatest(
      FETCH_ADMIN_GIFT_CARD_REQUEST_USER,
      fetchAdminGiftCardRequestUserSaga
    ),
  ]);
}

export default AdminGiftCardRequestSaga;
