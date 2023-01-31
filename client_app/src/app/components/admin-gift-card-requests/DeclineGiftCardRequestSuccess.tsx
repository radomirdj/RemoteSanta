import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPublic from "../app-header-public/AppHeaderPublic";

const DeclineGiftCardRequestSuccess = () => {
  const navigate = useNavigate();

  const loginRedirect = () => {
    navigate("/login");
  };

  return (
    <>
      <AppHeaderPublic />
      <div className="background action-gift-card-request-success"></div>
      <AppFooter />
    </>
  );
};

export default DeclineGiftCardRequestSuccess;
