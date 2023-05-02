import { combineReducers } from "redux";

import todoReducer from "./todo/reducer";
import messageReducer from "./basicMessage/reducer";
import authReducer from "./auth/reducer";
import giftCardRequestReducer from "./gift-card-request/reducer";
import claimPointsEventReducer from "./claim-points-event/reducer";
import adminGiftCardRequestReducer from "./admin-gift-card-requests/reducer";
import adminOrganizationReducer from "./admin-organization/reducer";
import adminOrganizationTransactionReducer from "./admin-organization-transaction/reducer";
import organizationReducer from "./orgs/reducer";
import userInviteReducer from "./user-invites/reducer";
import selfSignupReducer from "./self-signup/reducer";

const rootReducer = combineReducers({
  todo: todoReducer,
  message: messageReducer,
  auth: authReducer,
  giftCardRequest: giftCardRequestReducer,
  claimPointsEvent: claimPointsEventReducer,
  adminGiftCardRequest: adminGiftCardRequestReducer,
  adminOrganization: adminOrganizationReducer,
  adminOrganizationTransaction: adminOrganizationTransactionReducer,
  organization: organizationReducer,
  userInvite: userInviteReducer,
  selfSignup: selfSignupReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
