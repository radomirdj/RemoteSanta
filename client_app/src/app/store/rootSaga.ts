import { all, fork } from "redux-saga/effects";

import todoSaga from "./todo/sagas";
import messageSaga from "./basicMessage/sagas";
import authSaga from "./auth/sagas";

export function* rootSaga() {
  yield all([fork(todoSaga), fork(messageSaga), fork(authSaga)]);
}
