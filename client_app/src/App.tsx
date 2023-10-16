import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./app/components/login/Login";
import Registration from "./app/components/registration/Registration";
import Home from "./app/components/home/Home";
import ChangePassword from "./app/components/changePassword/ChangePassword";
import ForgotPassword from "./app/components/forgotPassword/ForgotPassword";
import PrivateRoute from "./app/components/privateRoute/PrivateRoute";
import PublicRoute from "./app/components/publicRoute/PublicRoute";
import VerifyEmail from "./app/components/verify-email/VerifyEmail";
import ChangePasswordSuccess from "./app/components/change-password-success/ChangePasswordSuccess";
import ErrorPage from "./app/components/error-page/ErrorPage";
import MyGiftCards from "./app/components/my-gift-cards/MyGiftCards";
import UserProfile from "./app/components/user-profile/UserProfile";
import GiftCardRequestSuccess from "./app/components/gift-card-request-success/GiftCardRequestSuccess";
import AdminRoute from "./app/components/adminRoute/AdminRoute";
import AdminGiftCardRequests from "./app/components/admin-gift-card-requests/AdminGiftCardRequests";
import AdminOrganizations from "./app/components/admin-organizations/AdminOrganizations";
import AdminOrganizationDetails from "./app/components/admin-organizations/AdminOrganizationDetails";
import AdminGiftCardRequestDetails from "./app/components/admin-gift-card-requests/AdminGiftCardRequestDetails";
import AdminToOrgTransaction from "./app/components/admin-organizations/AdminToOrgTransaction";
import OrgToEmployeeTransaction from "./app/components/admin-organizations/OrgToEmployeeTransaction";
import AdminInvites from "./app/components/admin-organizations/AdminInvites";
import AdminUsers from "./app/components/admin-organizations/AdminUsers";
import FulFillGiftCardRequestSuccess from "./app/components/admin-gift-card-requests/FulfillGiftCardRequestSuccess";
import DeclineGiftCardRequestSuccess from "./app/components/admin-gift-card-requests/DeclineGiftCardRequestSuccess";
import UserManagerRoute from "./app/components/userManagerRoute/UserManagerRoute";
import UserManagerTransactions from "./app/components/user-manager-transactions/UserManagerTransactions";
import UserManagerInvites from "./app/components/user-manager-invites/UserManagerInvites";
import UserManagerUsers from "./app/components/user-manager-users/UserManagerUsers";
import AdminUserDetails from "./app/components/admin-organizations/AdminUserDetails";
import UserManagerUserDetails from "./app/components/user-manager-users/UserManagerUserDetails";
import AdminUserSendPoints from "./app/components/admin-organizations/AdminUserSendPoints";
import CompanySignup from "./app/components/company-signup/CompanySignup";
import CompanySignupVerifyEmail from "./app/components/company-signup/CompanySignupVerifyEmail";
import InviteSingleCoworker from "./app/components/home/InviteSingleCoworker";
import InviteGroupCoworker from "./app/components/home/InviteGroupCoworker";
import MyTeam from "./app/components/my-team/MyTeam";
import MyTeamSendPoints from "./app/components/my-team/MyTeamSendPoints";
import MyTeamSendPointsSuccess from "./app/components/my-team/MyTeamSendPointsSuccess";
import ChooseGiftCardPersonal from "./app/components/choose-giftcard/ChooseGiftCardPersonal";
import ChooseGiftCardPeerToPeer from "./app/components/choose-giftcard/ChooseGiftCardPeerToPeer";
import UserManagerPurchasePoints from "./app/components/user-manager-purchase-points/UserManagerPurchasePoints";
import UserManagerPurchasePointsSuccess from "./app/components/user-manager-purchase-points/UserManagerPurchasePointsSuccess";

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
        <Route
          path="company-signup-verify-email"
          element={
            <PublicRoute>
              <CompanySignupVerifyEmail />
            </PublicRoute>
          }
        />
        <Route
          path="company-signup"
          element={
            <PublicRoute>
              <CompanySignup />
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
          path="my-team"
          element={
            <PrivateRoute>
              <MyTeam />
            </PrivateRoute>
          }
        />
        <Route
          path="my-team-send-points/:id"
          element={
            <PrivateRoute>
              <MyTeamSendPoints />
            </PrivateRoute>
          }
        />
        <Route
          path="my-team-send-points-success"
          element={
            <PrivateRoute>
              <MyTeamSendPointsSuccess />
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
          path="invite-single-coworker"
          element={
            <PrivateRoute>
              <InviteSingleCoworker />
            </PrivateRoute>
          }
        />
        <Route
          path="invite-group-coworker"
          element={
            <PrivateRoute>
              <InviteGroupCoworker />
            </PrivateRoute>
          }
        />
        <Route
          path="choose-gift-card-personal"
          element={
            <PrivateRoute>
              <ChooseGiftCardPersonal />
            </PrivateRoute>
          }
        />{" "}
        <Route
          path="choose-gift-card-peer-to-peer"
          element={
            <PrivateRoute>
              <ChooseGiftCardPeerToPeer />
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
          path="admin-organization-details/:id"
          element={
            <AdminRoute>
              <AdminOrganizationDetails />
            </AdminRoute>
          }
        />
        <Route
          path="admin-to-org-transaction"
          element={
            <AdminRoute>
              <AdminToOrgTransaction />
            </AdminRoute>
          }
        />
        <Route
          path="admin-users/:id"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />
        <Route
          path="admin-user-details/:id"
          element={
            <AdminRoute>
              <AdminUserDetails />
            </AdminRoute>
          }
        />
        <Route
          path="admin-user-send-points/:id"
          element={
            <AdminRoute>
              <AdminUserSendPoints />
            </AdminRoute>
          }
        />
        <Route
          path="admin-invites/:id"
          element={
            <AdminRoute>
              <AdminInvites />
            </AdminRoute>
          }
        />
        <Route
          path="org-to-employee-transaction"
          element={
            <AdminRoute>
              <OrgToEmployeeTransaction />
            </AdminRoute>
          }
        />
        <Route
          path="admin-gift-card-request-details/:id"
          element={
            <AdminRoute>
              <AdminGiftCardRequestDetails />
            </AdminRoute>
          }
        />
        <Route
          path="fulfill-gift-card-request-sucess"
          element={
            <AdminRoute>
              <FulFillGiftCardRequestSuccess />
            </AdminRoute>
          }
        />
        <Route
          path="decline-gift-card-request-sucess"
          element={
            <AdminRoute>
              <DeclineGiftCardRequestSuccess />
            </AdminRoute>
          }
        />
        <Route
          path="user-manager-transactions"
          element={
            <UserManagerRoute>
              <UserManagerTransactions />
            </UserManagerRoute>
          }
        />
        <Route
          path="user-manager-purchase-points"
          element={
            <UserManagerRoute>
              <UserManagerPurchasePoints />
            </UserManagerRoute>
          }
        />
        <Route
          path="user-manager-purchase-points-success"
          element={
            <UserManagerRoute>
              <UserManagerPurchasePointsSuccess />
            </UserManagerRoute>
          }
        />
        <Route
          path="user-manager-invites"
          element={
            <UserManagerRoute>
              <UserManagerInvites />
            </UserManagerRoute>
          }
        />
        <Route
          path="user-manager-users"
          element={
            <UserManagerRoute>
              <UserManagerUsers />
            </UserManagerRoute>
          }
        />
        <Route
          path="user-manager-user-details/:id"
          element={
            <UserManagerRoute>
              <UserManagerUserDetails />
            </UserManagerRoute>
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
