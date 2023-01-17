import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { fetchAdminOrganizationTransactionList } from "../../store/admin-organization-transaction/actions";
import { getAdminOrganizationTransactionListSelector } from "../../store/admin-organization-transaction/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";

const AdminOrganizationDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const adminOrganizationTransactionList = useSelector(
    getAdminOrganizationTransactionListSelector
  );
  const orgId = params.id as string;

  console.log(adminOrganizationTransactionList);

  useEffect(() => {
    dispatch(fetchAdminOrganizationTransactionList({ organizationId: orgId }));
  }, [dispatch]);

  console.log(params);
  return (
    <>
      <AppHeaderAdmin />
      <div className="background admin-organization-details"></div>
      <AppFooter />
    </>
  );
};

export default AdminOrganizationDetails;
