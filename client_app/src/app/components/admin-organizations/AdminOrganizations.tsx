import React from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";

const AdminOrganizations = () => {
  return (
    <>
      <AppHeaderAdmin />
      <div className="background admin-organizations"></div>
      <AppFooter />
    </>
  );
};

export default AdminOrganizations;
