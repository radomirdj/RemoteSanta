import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import rootReducer from "./rootReducer";
import { rootSaga } from "./rootSaga";
import { EnvConst } from "../const/EnvConst";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Mount it on the Store
const store =
  process.env.NODE_ENV === EnvConst.DEVELOPMENT
    ? createStore(rootReducer, applyMiddleware(sagaMiddleware, logger))
    : createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Run the saga
sagaMiddleware.run(rootSaga);

export default store;
