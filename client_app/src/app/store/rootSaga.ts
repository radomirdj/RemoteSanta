import { all, fork } from "redux-saga/effects";

import todoSaga from "./todo/sagas";
import messageSaga from "./basicMessage/sagas";
import authSaga from "./auth/sagas";
import giftCardRequestSaga from "./gift-card-request/sagas";
import claimPointsEventSaga from "./claim-points-event/sagas";
import adminGiftCardRequestSaga from "./admin-gift-card-requests/sagas";
import adminOrganizationSaga from "./admin-organization/sagas";
import adminOrganizationTransactionSaga from "./admin-organization-transaction/sagas";
import organizationSaga from "./orgs/sagas";

export function* rootSaga() {
  yield all([
    fork(todoSaga),
    fork(messageSaga),
    fork(authSaga),
    fork(giftCardRequestSaga),
    fork(claimPointsEventSaga),
    fork(adminGiftCardRequestSaga),
    fork(adminOrganizationSaga),
    fork(adminOrganizationTransactionSaga),
    fork(organizationSaga),
  ]);
}
