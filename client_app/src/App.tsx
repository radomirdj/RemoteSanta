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
import PublicRoute from "./app/components/publicRoute/PublicRoute";
import VerifyEmail from "./app/components/verify-email/VerifyEmail";
import ChangePasswordSuccess from "./app/components/change-password-success/ChangePasswordSuccess";
import ErrorPage from "./app/components/error-page/ErrorPage";
import MyGiftCards from "./app/components/my-gift-cards/MyGiftCards";
import Demo from "./app/components/demo/Demo";
import History from "./app/components/history/History";
import UserProfile from "./app/components/user-profile/UserProfile";
import ChooseGiftCard from "./app/components/choose-giftcard/ChooseGiftCard";
import GiftCardRequestSuccess from "./app/components/gift-card-request-success/GiftCardRequestSuccess";
import AdminRoute from "./app/components/adminRoute/AdminRoute";
import AdminGiftCardRequests from "./app/components/admin-gift-card-requests/AdminGiftCardRequests";
import AdminOrganizations from "./app/components/admin-organizations/AdminOrganizations";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="signup"
          element={
            <PublicRoute>
              <Registration />
            </PublicRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="change-password-success"
          element={
            <PublicRoute>
              <ChangePasswordSuccess />
            </PublicRoute>
          }
        />
        <Route
          path="change-password"
          element={
            <PublicRoute>
              <ChangePassword />
            </PublicRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <PublicRoute>
              <VerifyEmail />
            </PublicRoute>
          }
        />
        <Route path="error-page" element={<ErrorPage />} />
        <Route
          path="my-gift-cards"
          element={
            <PrivateRoute>
              <MyGiftCards />
            </PrivateRoute>
          }
        />
        <Route
          path="demo"
          element={
            <PrivateRoute>
              <Demo />
            </PrivateRoute>
          }
        />
        <Route
          path="history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
        <Route
          path="user-profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="choose-gift-card"
          element={
            <PrivateRoute>
              <ChooseGiftCard />
            </PrivateRoute>
          }
        />
        <Route
          path="gift-card-request-success"
          element={
            <PrivateRoute>
              <GiftCardRequestSuccess />
            </PrivateRoute>
          }
        />
        <Route
          path="admin-home"
          element={
            <AdminRoute>
              <AdminGiftCardRequests />
            </AdminRoute>
          }
        />
        <Route
          path="admin-organizations"
          element={
            <AdminRoute>
              <AdminOrganizations />
            </AdminRoute>
          }
        />
        <Route
          path=""
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/error-page" />} />
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
