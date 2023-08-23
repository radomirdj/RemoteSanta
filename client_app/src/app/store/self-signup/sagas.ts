import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  getCompletementStepList,
  postCompletementStep,
  postPersonalDetailsStep,
  postSignupBonusStep,
  selfSignupOrgUser,
} from "../../services/api-service";

import {
  fetchCompletementSteps,
  fetchCompletementStepsFailure,
  fetchCompletementStepsSuccess,
  postCompletementStepsFailure,
  postCompletementStepsSuccess,
  postPersonalDetailsFailure,
  postPersonalDetailsSuccess,
  postSignupBonusFailure,
  postSignupBonusSuccess,
  selfSignUpFailure,
  selfSignUpSuccess,
  setCloseModalStep,
} from "./actions";
import {
  FETCH_COMPLETEMENT_STEPS_REQUEST,
  POST_COMPLETEMENT_STEPS_REQUEST,
  POST_PERSONAL_DETAILS_REQUEST,
  POST_SIGNUP_BONUS_REQUEST,
  SELF_SIGN_UP_REQUEST,
  SET_OPEN_MODAL_STEP,
} from "./actionTypes";
import {
  ICompletementStep,
  PostCompletementSteps,
  PostPersonalDetails,
  PostSignupBonus,
  SelfSignUpRequest,
} from "./types";
import { fetchOrganizationUserList } from "../orgs/actions";

/*
  Worker Saga: Fired on FETCH_MESSAGE_REQUEST action
*/
function* selfSignUpSaga(action: SelfSignUpRequest) {
  try {
    yield call(selfSignupOrgUser, action.payload);
    yield put(selfSignUpSuccess());
    action.navigate("/company-signup-verify-email");
  } catch (e) {
    console.log("function*signUpSaga -> e", e);
    yield put(
      selfSignUpFailure({
        error: e.response.data.message,
      })
    );
  }
}

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/
function* fetchCompletementStepsSaga() {
  try {
    const token: string = localStorage.getItem("token") || "";
    const response: AxiosResponse<ICompletementStep[]> = yield call(
      getCompletementStepList,
      token
    );
    yield put(
      fetchCompletementStepsSuccess({
        completementsSteps: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchCompletementStepsFailure({
        error: e.message,
      })
    );
  }
}

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/
function* postCompletementStepsSaga(action: PostCompletementSteps) {
  try {
    const token: string = localStorage.getItem("token") || "";
    yield call(postCompletementStep, action.payload, token);
    yield put(postCompletementStepsSuccess());
    yield put(fetchCompletementSteps());
    action.navigate("/");
  } catch (e) {
    console.log("function*signUpSaga -> e", e);
    yield put(
      postCompletementStepsFailure({
        error: e.response.data.message,
      })
    );
  }
}

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/
function* postPersonalDetailsSaga(action: PostPersonalDetails) {
  try {
    const token: string = localStorage.getItem("token") || "";
    yield call(postPersonalDetailsStep, action.payload, token);
    yield put(postPersonalDetailsSuccess());
    yield put(fetchCompletementSteps());
    yield put(fetchOrganizationUserList());
  } catch (e) {
    console.log("function*signUpSaga -> e", e);
    yield put(
      postPersonalDetailsFailure({
        error: e.response.data.message,
      })
    );
  }
}

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/
function* postSignupBonusSaga(action: PostSignupBonus) {
  try {
    const token: string = localStorage.getItem("token") || "";
    yield call(postSignupBonusStep, action.payload, token);
    yield put(postSignupBonusSuccess());
    yield put(fetchCompletementSteps());
  } catch (e) {
    console.log("function*signUpSaga -> e", e);
    yield put(
      postSignupBonusFailure({
        error: e.response.data.message,
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_MESSAGE_REQUEST` action.
  Allows concurrent increments.
*/
function* selfSignupSaga() {
  yield all([takeLatest(SELF_SIGN_UP_REQUEST, selfSignUpSaga)]);
  yield all([
    takeLatest(FETCH_COMPLETEMENT_STEPS_REQUEST, fetchCompletementStepsSaga),
  ]);
  yield all([
    takeLatest(POST_COMPLETEMENT_STEPS_REQUEST, postCompletementStepsSaga),
  ]);
  yield all([
    takeLatest(POST_PERSONAL_DETAILS_REQUEST, postPersonalDetailsSaga),
  ]);
  yield all([takeLatest(POST_SIGNUP_BONUS_REQUEST, postSignupBonusSaga)]);
}

export default selfSignupSaga;
