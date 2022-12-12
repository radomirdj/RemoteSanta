import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";

import {
  getPendingSelector,
  getMessageSelector,
  getErrorSelector
} from "./app/store/basicMessage/selectors";
import { fetchTodoRequest } from "./app/store/todo/actions";
import { fetchMessageRequest } from "./app/store/basicMessage/actions";
import store from "./app/store";

const App = () => {
  const dispatch = useDispatch();
  const pending = useSelector(getPendingSelector);
  const message = useSelector(getMessageSelector);
  const error = useSelector(getErrorSelector);

  useEffect(() => {
    dispatch(fetchTodoRequest());
    dispatch(fetchMessageRequest());
  }, [dispatch]);

  return (
    <div className="test">
      <div style={{ padding: "15px" }}>
        {pending ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error</div>
        ) : (
          <b style={{ marginBottom: "20px" }} >{message}</b>
        )}
      </div>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
