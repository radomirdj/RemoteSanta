import React from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";

const OrgToEmployeeTransaction = () => {
  return (
    <>
      <AppHeaderAdmin />
      <div className="background org-to-employee-transaction"></div>
      <AppFooter />
    </>
  );
};

export default OrgToEmployeeTransaction;
