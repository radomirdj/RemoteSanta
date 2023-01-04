import React from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";

const UserProfile = () => {
  return (
    <>
      <AppHeaderPrivate />
      <div className="background user-profile"></div>
      <AppFooter />
    </>
  );
};

export default UserProfile;
