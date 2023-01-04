import { combineReducers } from "redux";

import todoReducer from "./todo/reducer";
import messageReducer from "./basicMessage/reducer";
import authReducer from "./auth/reducer";
import giftCardRequestReducer from "./gift-card-request/reducer";
import claimPointsEventReducer from "./claim-points-event/reducer";
import adminGiftCardRequestReducer from "./admin-gift-card-requests/reducer";

const rootReducer = combineReducers({
  todo: todoReducer,
  message: messageReducer,
  auth: authReducer,
  giftCardRequest: giftCardRequestReducer,
  claimPointsEvent: claimPointsEventReducer,
  adminGiftCardRequest: adminGiftCardRequestReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
