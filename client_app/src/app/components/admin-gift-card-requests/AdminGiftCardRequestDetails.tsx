import React from "react";
import { useParams } from "react-router-dom";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";

const AdminGiftCardRequestDetails = () => {
  const params = useParams();
  const giftCardRequestId = params.id as string;

  return (
    <>
      <AppHeaderAdmin />
      <div className="background admin-gift-card-request-details"></div>
      <AppFooter />
    </>
  );
};

export default AdminGiftCardRequestDetails;
