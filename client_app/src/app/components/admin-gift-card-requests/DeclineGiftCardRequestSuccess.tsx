import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";
import DeclineIllustration from "./../../assets/illustrations/decline-gift-card-request-illustration.svg";

const DeclineGiftCardRequestSuccess = () => {
  const navigate = useNavigate();

  const loginRedirect = () => {
    navigate("/login");
  };

  const homeRedirect = () => {
    navigate("/admin-home");
  };

  return (
    <>
      <AppHeaderAdmin />
      <div className="background action-gift-card-request-success">
        <div className="gift-card-request-success-content">
          <Typography className="gift-card-request-success-title">
            You have successfully declined a gift card request.
          </Typography>
          <Typography
            className="gift-card-request-success-link"
            onClick={homeRedirect}
          >
            <u>Back to Home</u>
          </Typography>
          <img
            src={DeclineIllustration}
            alt=""
            className="success-illustration"
          />
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default DeclineGiftCardRequestSuccess;
