import axios, { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import * as FileSaver from "file-saver";
import { getGiftCardFile } from "../../services/api-service";
import { getSelfRequest } from "../auth/actions";
import {
  fetchGiftCardIntegrationListFailure,
  fetchGiftCardIntegrationListSuccess,
  fetchGiftCardRequestListFailure,
  fetchGiftCardRequestListSuccess,
  fetchGiftCardFileFailure,
  fetchGiftCardFileSuccess,
  postGiftCardRequestFailure,
  postGiftCardRequestSuccess,
  setGiftCardRequestAmount,
  setGiftCardRequestIntegration,
  setGiftCardRequestResetData,
  setGiftCardRequestStepBack,
} from "./actions";
import {
  FETCH_GIFT_CARD_FILE,
  FETCH_GIFT_CARD_INTEGRATION_LIST,
  FETCH_GIFT_CARD_REQUEST_LIST,
  POST_GIFT_CARD_REQUEST,
  SET_GIFT_CARD_REQUEST_AMOUNT,
  SET_GIFT_CARD_REQUEST_INTEGRATION,
  SET_GIFT_CARD_REQUEST_RESET_DATA,
  SET_GIFT_CARD_REQUEST_STEP_BACK,
} from "./actionTypes";
import {
  FetchGiftCardFile,
  FetchGiftCardIntegrationList,
  IGiftCardIntegration,
  IGiftCardRequest,
  PostGiftCardRequest,
  PostGiftCardRequestPayload,
  SetGiftCardRequestAmount,
  SetGiftCardRequestIntegration,
  SetGiftCardRequestResetData,
  SetGiftCardRequestStepBack,
} from "./types";

const getGiftCardRequestList = (token: string) =>
  axios.get<IGiftCardRequest[]>("api/gift-card-requests/", {
    headers: { Authorization: `Bearer ${token}` },
  });

const getGiftCardIntegrationList = (countryId: string, token: string) => {
  console.log(countryId);
  return axios.get<IGiftCardIntegration[]>(
    `api/gift-card-integrations/?country=${countryId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const postGiftCardRequest = (
  token: string,
  payload: PostGiftCardRequestPayload
) => {
  return axios.post<string>("api/gift-card-requests/", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/
function* fetchGiftCardRequestListSaga() {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IGiftCardRequest[]> = yield call(
      getGiftCardRequestList,
      token
    );
    yield put(
      fetchGiftCardRequestListSuccess({
        giftCardRequestList: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchGiftCardRequestListFailure({
        error: e.message,
      })
    );
  }
}

function* fetchGiftCardIntegrationListSaga(
  action: FetchGiftCardIntegrationList
) {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IGiftCardIntegration[]> = yield call(
      getGiftCardIntegrationList,
      action.payload.countryId,
      token
    );
    yield put(
      fetchGiftCardIntegrationListSuccess({
        giftCardIntegrationList: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchGiftCardIntegrationListFailure({
        error: e.message,
      })
    );
  }
}

function* setGiftCardRequestIntegrationSaga(
  action: SetGiftCardRequestIntegration
) {
  yield call(setGiftCardRequestIntegration, action.payload);
}

function* setGiftCardRequestAmountSaga(action: SetGiftCardRequestAmount) {
  yield call(setGiftCardRequestAmount, action.payload);
}

function* setGiftCardRequestStepBackSaga(action: SetGiftCardRequestStepBack) {
  yield call(setGiftCardRequestStepBack, action.payload);
}

function* setGiftCardRequestResetDataSaga(action: SetGiftCardRequestResetData) {
  yield call(setGiftCardRequestResetData);
}

function* postGiftCardRequestSaga(action: PostGiftCardRequest) {
  try {
    const token: string = localStorage.getItem("token") || "";
    yield call(postGiftCardRequest, token, action.payload);
    yield put(postGiftCardRequestSuccess());
    yield put(getSelfRequest(action.navigate));
    action.navigate("/gift-card-request-success");
  } catch (e) {
    yield put(
      postGiftCardRequestFailure({
        error: e.message,
      })
    );
  }
}

function* fetchGiftCardFileSaga(action: FetchGiftCardFile) {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<any> = yield call(
      getGiftCardFile,
      action.payload,
      token
    );
    const blob = new Blob([response.data], { type: "application/pdf" });
    FileSaver.saveAs(blob, "gift-card");
    yield put(fetchGiftCardFileSuccess());
  } catch (e) {
    yield put(
      fetchGiftCardFileFailure({
        error: e.message,
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
  Allows concurrent increments.
*/
function* giftCardRequestSaga() {
  yield all([
    takeLatest(FETCH_GIFT_CARD_REQUEST_LIST, fetchGiftCardRequestListSaga),
  ]);
  yield all([
    takeLatest(
      FETCH_GIFT_CARD_INTEGRATION_LIST,
      fetchGiftCardIntegrationListSaga
    ),
  ]);
  yield all([
    takeLatest(
      SET_GIFT_CARD_REQUEST_INTEGRATION,
      setGiftCardRequestIntegrationSaga
    ),
  ]);
  yield all([
    takeLatest(SET_GIFT_CARD_REQUEST_AMOUNT, setGiftCardRequestAmountSaga),
  ]);
  yield all([
    takeLatest(SET_GIFT_CARD_REQUEST_STEP_BACK, setGiftCardRequestStepBackSaga),
  ]);
  yield all([
    takeLatest(
      SET_GIFT_CARD_REQUEST_RESET_DATA,
      setGiftCardRequestResetDataSaga
    ),
  ]);
  yield all([takeLatest(POST_GIFT_CARD_REQUEST, postGiftCardRequestSaga)]);
  yield all([takeLatest(FETCH_GIFT_CARD_FILE, fetchGiftCardFileSaga)]);
}

export default giftCardRequestSaga;
