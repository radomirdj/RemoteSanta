import React from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";

const UserManagerUsers = () => {
  return (
    <>
      <AppHeaderPrivate />
      <div className="background user-manager-users"></div>
      <AppFooter />
    </>
  );
};

export default UserManagerUsers;
