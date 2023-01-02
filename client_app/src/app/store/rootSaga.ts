import { all, fork } from "redux-saga/effects";

import todoSaga from "./todo/sagas";
import messageSaga from "./basicMessage/sagas";
import authSaga from "./auth/sagas";
import giftCardRequestSaga from "./gift-card-request/sagas";
import claimPointsEventSaga from "./claim-points-event/sagas";

export function* rootSaga() {
  yield all([fork(todoSaga), fork(messageSaga), fork(authSaga), fork(giftCardRequestSaga), fork(claimPointsEventSaga)]);
}
