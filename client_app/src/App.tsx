import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./app/components/login/Login";
import Registration from "./app/components/registration/Registration";
import Home from "./app/components/home/Home";
// import { getSelfRequest } from "./app/store/auth/actions";
// import { getAuthUserSelector } from "./app/store/auth/selectors";
import ChangePassword from "./app/components/changePassword/ChangePassword";
import ForgotPassword from "./app/components/forgotPassword/ForgotPassword";
import PrivateRoute from "./app/components/privateRoute/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Registration />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route
          path=""
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
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
