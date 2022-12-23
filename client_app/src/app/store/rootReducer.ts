import { combineReducers } from "redux";

import todoReducer from "./todo/reducer";
import messageReducer from "./basicMessage/reducer";
import authReducer from "./auth/reducer";
import giftCardRequestReducer from "./gift-card-request/reducer";

const rootReducer = combineReducers({
  todo: todoReducer,
  message: messageReducer,
  auth: authReducer,
  giftCardRequest: giftCardRequestReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
