import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAdminInviteList } from "../../store/admin-organization/actions";
import { getAdminInviteListSelector } from "../../store/admin-organization/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";

const AdminInvites = () => {
  const params = useParams();
  const orgId = params.id as string;
  const dispatch = useDispatch();
  const adminInviteList = useSelector(getAdminInviteListSelector);

  useEffect(() => {
    dispatch(fetchAdminInviteList({ organizationId: orgId }));
  }, [dispatch, orgId]);
  return (
    <>
      <AppHeaderAdmin />
      <div className="background admin-invites"></div>
      <AppFooter />
    </>
  );
};

export default AdminInvites;
