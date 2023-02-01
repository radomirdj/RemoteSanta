import React from "react";
import { useSelector } from "react-redux";
import { getAuthUserSelector } from "../../store/auth/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";

const UserManagerTransactions = () => {
  const user = useSelector(getAuthUserSelector);

  return (
    <>
      <AppHeaderPrivate />
      <div className="background user-manager-transactions"></div>
      <AppFooter />
    </>
  );
};

export default UserManagerTransactions;
