import axios, { AxiosResponse, AxiosError } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { fetchGiftCardIntegrationListFailure, fetchGiftCardIntegrationListSuccess, fetchGiftCardRequestListFailure, fetchGiftCardRequestListSuccess } from "./actions";
import { FETCH_GIFT_CARD_INTEGRATION_LIST, FETCH_GIFT_CARD_REQUEST_LIST } from "./actionTypes";
import { IGiftCardIntegration, IGiftCardRequest } from "./types";

const getGiftCardRequestList = (token:string) =>
  axios.get<IGiftCardRequest[]>("api/gift-card-requests/",{ headers: { Authorization: `Bearer ${token}` } });

const getGiftCardIntegrationList = (token:string) =>
  axios.get<IGiftCardIntegration[]>("api/gift-card-integrations/",{ headers: { Authorization: `Bearer ${token}` } });

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/
function* fetchGiftCardRequestListSaga() {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IGiftCardRequest[]> = yield call(getGiftCardRequestList, token);
    yield put(
      fetchGiftCardRequestListSuccess({
        giftCardRequestList: response.data
      })
    );
  } catch (e) {
    yield put(
      fetchGiftCardRequestListFailure({
        error: e.message
      })
    );
  }
}

function* fetchGiftCardIntegrationListSaga() {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IGiftCardIntegration[]> = yield call(getGiftCardIntegrationList, token);
    yield put(
      fetchGiftCardIntegrationListSuccess({
        giftCardIntegrationList: response.data
      })
    );
  } catch (e) {
    yield put(
      fetchGiftCardIntegrationListFailure({
        error: e.message
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
  Allows concurrent increments.
*/
function* todoSaga() {
  yield all([takeLatest(FETCH_GIFT_CARD_REQUEST_LIST, fetchGiftCardRequestListSaga)]);
  yield all([takeLatest(FETCH_GIFT_CARD_INTEGRATION_LIST, fetchGiftCardIntegrationListSaga)]);
}

export default todoSaga;
