import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";
import { Card } from "@mui/material";

const AdminUserDetails = () => {
  const params = useParams();
  const userId = params.id as string;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <AppHeaderAdmin />
      <div className="background admin-user-details">
        <Card className="card-style"></Card>
      </div>
      <AppFooter />
    </>
  );
};

export default AdminUserDetails;
