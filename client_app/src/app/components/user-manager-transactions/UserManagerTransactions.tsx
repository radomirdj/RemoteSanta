import React from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";

const UserManagerTransactions = () => {
  return (
    <>
      <AppHeaderPrivate />
      <div className="background user-manager-transactions"></div>
      <AppFooter />
    </>
  );
};

export default UserManagerTransactions;
