import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  getOrganization,
  getOrganizationTransactionList,
  getOrganizationUserList,
  getOrgUser,
  orgDeleteUser,
  postSecretSantaTrial,
  sendPointsToUserPeerToPeer,
  sendPointsToUserUserManager,
} from "../../services/api-service";
import {
  deleteOrgUserFailure,
  deleteOrgUserSuccess,
  fetchOrganizationFailure,
  fetchOrganizationSuccess,
  fetchOrganizationTransactionListFailure,
  fetchOrganizationTransactionListSuccess,
  fetchOrganizationUserListFailure,
  fetchOrganizationUserListSuccess,
  fetchOrgUserFailure,
  fetchOrgUserSuccess,
  peerSendPointsToUserFailure,
  peerSendPointsToUserSuccess,
  secretSantaTrialFailure,
  secretSantaTrialSuccess,
  sendPointsToUserFailure,
  sendPointsToUserSuccess,
  setCloseDialogSendPoints,
} from "./actions";
import {
  DELETE_ORG_USER,
  FETCH_ORGANIZATION,
  FETCH_ORG_TRANSACTION_LIST,
  FETCH_ORG_USER,
  FETCH_ORG_USER_LIST,
  PEER_SEND_POINTS_TO_USER,
  SECRET_SANTA_TRIAL,
  SEND_POINTS_TO_USER,
} from "./actionTypes";
import {
  DeleteOrgUser,
  FetchOrganization,
  FetchOrganizationTransactionList,
  FetchOrganizationUserList,
  FetchOrgUser,
  IOrganization,
  IOrgTransaction,
  IOrgUser,
  SecretSantaTrial,
  SendPointsToUser,
} from "./types";

function* fetchOrganizationSaga(action: FetchOrganization) {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IOrganization> = yield call(
      getOrganization,
      token
    );
    yield put(
      fetchOrganizationSuccess({
        organization: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchOrganizationFailure({
        error: e.message,
      })
    );
  }
}

function* fetchOrganizationTransactionListSaga(
  action: FetchOrganizationTransactionList
) {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IOrgTransaction[]> = yield call(
      getOrganizationTransactionList,
      token
    );
    yield put(
      fetchOrganizationTransactionListSuccess({
        organizationTransactionList: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchOrganizationTransactionListFailure({
        error: e.message,
      })
    );
  }
}

function* fetchOrganizationUserListSaga(action: FetchOrganizationUserList) {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IOrgUser[]> = yield call(
      getOrganizationUserList,
      token
    );
    yield put(
      fetchOrganizationUserListSuccess({
        orgUserList: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchOrganizationUserListFailure({
        error: e.message,
      })
    );
  }
}

function* fetchOrgUserSaga(action: FetchOrgUser) {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<IOrgUser> = yield call(
      getOrgUser,
      action.payload,
      token
    );
    yield put(
      fetchOrgUserSuccess({
        user: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchOrgUserFailure({
        error: e.message,
      })
    );
  }
}

function* deleteOrgUserSaga(action: DeleteOrgUser) {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<string> = yield call(
      orgDeleteUser,
      action.payload,
      token
    );
    yield put(deleteOrgUserSuccess());
    action.navigate("/my-team");
  } catch (e) {
    yield put(
      deleteOrgUserFailure({
        error: e.message,
      })
    );
  }
}

function* sendPointsToUserSaga(action: SendPointsToUser) {
  try {
    const token: string = localStorage.getItem("token") || "";
    yield call(sendPointsToUserUserManager, action.payload, token);
    yield put(sendPointsToUserSuccess());
    yield put(setCloseDialogSendPoints());
    action.navigate(`/my-team`);
  } catch (e) {
    console.log("function*signUpSaga -> e", e);
    yield put(
      sendPointsToUserFailure({
        error: e.response.data.message,
      })
    );
  }
}

function* secretSantaTrialSaga(action: SecretSantaTrial) {
  try {
    const token: string = localStorage.getItem("token") || "";
    yield call(postSecretSantaTrial, token);
    yield put(secretSantaTrialSuccess());
  } catch (e) {
    console.log("function*signUpSaga -> e", e);
    yield put(
      secretSantaTrialFailure({
        error: e.response.data.message,
      })
    );
  }
}

function* peerSendPointsToUserSaga(action: SendPointsToUser) {
  try {
    const token: string = localStorage.getItem("token") || "";
    yield call(sendPointsToUserPeerToPeer, action.payload, token);
    yield put(peerSendPointsToUserSuccess());
    yield put(setCloseDialogSendPoints());
    action.navigate(`/my-team-send-points-success`);
  } catch (e) {
    console.log("function*signUpSaga -> e", e);
    yield put(
      peerSendPointsToUserFailure({
        error: e.response.data.message,
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
  Allows concurrent increments.
*/
function* OrganizationSaga() {
  yield all([
    takeLatest(FETCH_ORGANIZATION, fetchOrganizationSaga),
    takeLatest(
      FETCH_ORG_TRANSACTION_LIST,
      fetchOrganizationTransactionListSaga
    ),
    takeLatest(FETCH_ORG_USER_LIST, fetchOrganizationUserListSaga),
    takeLatest(FETCH_ORG_USER, fetchOrgUserSaga),
    takeLatest(DELETE_ORG_USER, deleteOrgUserSaga),
    takeLatest(SEND_POINTS_TO_USER, sendPointsToUserSaga),
    takeLatest(PEER_SEND_POINTS_TO_USER, peerSendPointsToUserSaga),
    takeLatest(SECRET_SANTA_TRIAL, secretSantaTrialSaga),
  ]);
}

export default OrganizationSaga;
