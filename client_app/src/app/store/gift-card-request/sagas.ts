import axios, { AxiosResponse, AxiosError } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { SignUpRequestPayload } from "../auth/types";
import { fetchGiftCardIntegrationListFailure, fetchGiftCardIntegrationListSuccess, fetchGiftCardRequestListFailure, fetchGiftCardRequestListSuccess, postGiftCardRequestFailure, postGiftCardRequestSuccess, setGiftCardRequestAmount, setGiftCardRequestIntegration, setGiftCardRequestResetData, setGiftCardRequestStepBack } from "./actions";
import { FETCH_GIFT_CARD_INTEGRATION_LIST, FETCH_GIFT_CARD_REQUEST_LIST, POST_GIFT_CARD_REQUEST, SET_GIFT_CARD_REQUEST_AMOUNT, SET_GIFT_CARD_REQUEST_INTEGRATION, SET_GIFT_CARD_REQUEST_RESET_DATA, SET_GIFT_CARD_REQUEST_STEP_BACK } from "./actionTypes";
import { IGiftCardIntegration, IGiftCardRequest, PostGiftCardRequest, PostGiftCardRequestPayload, SetGiftCardRequestAmount, SetGiftCardRequestIntegration, SetGiftCardRequestResetData, SetGiftCardRequestStepBack } from "./types";

const getGiftCardRequestList = (token:string) =>
  axios.get<IGiftCardRequest[]>("api/gift-card-requests/",{ headers: { Authorization: `Bearer ${token}` } });

const getGiftCardIntegrationList = (token:string) =>
  axios.get<IGiftCardIntegration[]>("api/gift-card-integrations/",{ headers: { Authorization: `Bearer ${token}` } });

const postGiftCardRequest = (token:string,payload: PostGiftCardRequestPayload) => {
   axios.post<string>("api/gift-card-requests/", payload, { headers: { Authorization: `Bearer ${token}` } });
};

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

function* setGiftCardRequestIntegrationSaga(action:SetGiftCardRequestIntegration) {
  yield call(setGiftCardRequestIntegration, action.payload);
}

function* setGiftCardRequestAmountSaga(action:SetGiftCardRequestAmount) {
  yield call(setGiftCardRequestAmount, action.payload);
}

function* setGiftCardRequestStepBackSaga(action:SetGiftCardRequestStepBack) {
  yield call(setGiftCardRequestStepBack, action.payload);
}

function* setGiftCardRequestResetDataSaga(action:SetGiftCardRequestResetData) {
  yield call(setGiftCardRequestResetData);
}

function* postGiftCardRequestSaga(action: PostGiftCardRequest) {
  try {
    const token: string = localStorage.getItem("token") || "";
    yield call(postGiftCardRequest, token, action.payload);
    yield put(
      postGiftCardRequestSuccess()
    );
    action.navigate("/gift-card-request-success");
  } catch (e) {
    yield put(
      postGiftCardRequestFailure({
        error: e.message
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
  Allows concurrent increments.
*/
function* giftCardRequestSaga() {
  yield all([takeLatest(FETCH_GIFT_CARD_REQUEST_LIST, fetchGiftCardRequestListSaga)]);
  yield all([takeLatest(FETCH_GIFT_CARD_INTEGRATION_LIST, fetchGiftCardIntegrationListSaga)]);
  yield all([takeLatest(SET_GIFT_CARD_REQUEST_INTEGRATION, setGiftCardRequestIntegrationSaga)]);
  yield all([takeLatest(SET_GIFT_CARD_REQUEST_AMOUNT, setGiftCardRequestAmountSaga)]);
  yield all([takeLatest(SET_GIFT_CARD_REQUEST_STEP_BACK, setGiftCardRequestStepBackSaga)]);
  yield all([takeLatest(SET_GIFT_CARD_REQUEST_RESET_DATA, setGiftCardRequestResetDataSaga)]);
  yield all([takeLatest(POST_GIFT_CARD_REQUEST, postGiftCardRequestSaga)]);
}

export default giftCardRequestSaga;
