import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminGiftCardRequestList } from "../../store/admin-gift-card-requests/actions";
import { getAdminGiftCardRequestListSelector } from "../../store/admin-gift-card-requests/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";

const AdminGiftCardRequests = () => {
  const dispatch = useDispatch();
  const adminGiftCardRequestList = useSelector(
    getAdminGiftCardRequestListSelector
  );

  useEffect(() => {
    dispatch(fetchAdminGiftCardRequestList());
  }, [dispatch]);

  console.log(adminGiftCardRequestList);

  return (
    <>
      <AppHeaderAdmin />
      <div className="background admin-gift-card-requests"> </div>
      <AppFooter />
    </>
  );
};

export default AdminGiftCardRequests;
