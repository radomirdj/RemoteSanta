import { combineReducers } from "redux";

import todoReducer from "./todo/reducer";
import messageReducer from "./basicMessage/reducer";

const rootReducer = combineReducers({
  todo: todoReducer,
  message: messageReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
