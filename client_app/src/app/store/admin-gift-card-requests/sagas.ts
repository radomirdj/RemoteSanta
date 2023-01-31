import axios, { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  declineGiftCardRequest,
  fulfillGiftCardRequest,
  getAdminGiftCardRequest,
  getAdminGiftCardRequestUser,
} from "../../services/api-service";
import { AuthUser } from "../auth/types";
import {
  declineAdminGiftCardRequestFailure,
  declineAdminGiftCardRequestSuccess,
  fetchAdminGiftCardRequestFailure,
  fetchAdminGiftCardRequestListFailure,
  fetchAdminGiftCardRequestListSuccess,
  fetchAdminGiftCardRequestSuccess,
  fetchAdminGiftCardRequestUser,
  fetchAdminGiftCardRequestUserFailure,
  fetchAdminGiftCardRequestUserSuccess,
  fulfillAdminGiftCardRequestFailure,
  fulfillAdminGiftCardRequestSuccess,
} from "./actions";
import {
  DECLINE_ADMIN_GIFT_CARD_REQUEST,
  FETCH_ADMIN_GIFT_CARD_REQUEST,
  FETCH_ADMIN_GIFT_CARD_REQUEST_LIST,
  FETCH_ADMIN_GIFT_CARD_REQUEST_USER,
  FULFILL_ADMIN_GIFT_CARD_REQUEST,
} from "./actionTypes";
import {
  DeclineAdminGiftCardRequest,
  FetchAdminGiftCardRequest,
  FetchAdminGiftCardRequestUser,
  FulfillAdminGiftCardRequest,
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
    yield put(fetchAdminGiftCardRequestUser({ userId: response.data.userId }));
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

function* fulfillAdminGiftCardRequestSaga(action: FulfillAdminGiftCardRequest) {
  try {
    const token: string = localStorage.getItem("token") || "";
    yield call(fulfillGiftCardRequest, action.payload, token);
    yield put(fulfillAdminGiftCardRequestSuccess());
    action.navigate("/fulfill-gift-card-request-sucess");
  } catch (e) {
    console.log("function*signUpSaga -> e", e);
    yield put(
      fulfillAdminGiftCardRequestFailure({
        error: e.response.data.message,
      })
    );
  }
}

function* declineAdminGiftCardRequestSaga(action: DeclineAdminGiftCardRequest) {
  try {
    const token: string = localStorage.getItem("token") || "";
    yield call(declineGiftCardRequest, action.payload, token);
    yield put(declineAdminGiftCardRequestSuccess());
    action.navigate("/decline-gift-card-request-sucess");
  } catch (e) {
    console.log("function*signUpSaga -> e", e);
    yield put(
      declineAdminGiftCardRequestFailure({
        error: e.response.data.message,
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
    takeLatest(
      FULFILL_ADMIN_GIFT_CARD_REQUEST,
      fulfillAdminGiftCardRequestSaga
    ),
    takeLatest(
      DECLINE_ADMIN_GIFT_CARD_REQUEST,
      declineAdminGiftCardRequestSaga
    ),
  ]);
}

export default AdminGiftCardRequestSaga;
