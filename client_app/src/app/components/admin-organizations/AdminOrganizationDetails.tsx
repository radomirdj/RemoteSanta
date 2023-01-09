import React from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";

const AdminOrganizationDetails = () => {
  return (
    <>
      <AppHeaderAdmin />
      <div className="background admin-organization-details"></div>
      <AppFooter />
    </>
  );
};

export default AdminOrganizationDetails;
