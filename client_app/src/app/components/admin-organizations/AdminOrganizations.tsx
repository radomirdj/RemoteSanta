import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminOrganizationList } from "../../store/admin-organization/actions";
import { getAdminOrganizationListSelector } from "../../store/admin-organization/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";

const AdminOrganizations = () => {
  const dispatch = useDispatch();
  const adminOrganizationList = useSelector(getAdminOrganizationListSelector);

  useEffect(() => {
    dispatch(fetchAdminOrganizationList());
  }, [dispatch]);

  console.log(adminOrganizationList);

  return (
    <>
      <AppHeaderAdmin />
      <div className="background admin-organizations"></div>
      <AppFooter />
    </>
  );
};

export default AdminOrganizations;
