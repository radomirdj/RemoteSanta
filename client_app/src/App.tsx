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
import Login from "./app/components/login/Login";
import Registration from "./app/components/registration/Registration";
import Home from "./app/components/home/Home";
import { getSelfRequest } from "./app/store/auth/actions";
import { getAuthUserSelector } from "./app/store/auth/selectors";
import ChangePassword from "./app/components/changePassword/ChangePassword";
import ForgotPassword from "./app/components/forgotPassword/ForgotPassword";


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
    <div className="login">
      <div style={{ padding: "15px" }}>
        {pending ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error</div>
        ) : (
          <b style={{ marginBottom: "20px" }} >{message}</b>
        )}
        <br />
        <br />
        <br />
        <Login />
        <br />
        <br />
        <br />
        <Registration />
        <br />
        <br />
        <br />
        <Home />
        <br />
        <br />
        <br />
        <ForgotPassword />
        <br />
        <br />
        <br />
        <ChangePassword />
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
