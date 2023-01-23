import React from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";

const AdminUsers = () => {
  return (
    <>
      <AppHeaderAdmin />
      <div className="background admin-users"></div>
      <AppFooter />
    </>
  );
};

export default AdminUsers;
