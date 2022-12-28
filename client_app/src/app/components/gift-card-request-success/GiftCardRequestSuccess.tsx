import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import SuccessIllustration from "./../../assets/illustrations/gift-card-request-success-illustration.svg";

const GiftCardRequestSuccess = () => {
  const navigate = useNavigate();

  const homeRedirect = () => {
    navigate("/");
  };

  return (
    <>
      <AppHeaderPrivate />
      <div className="background gift-card-request-success">
        {/*LABELS */}
        <div className="gift-card-request-success-content">
          <Typography className="gift-card-request-success-title">
            You have successfully created a gift card request. Your gift card
            will be available soon.
          </Typography>
          <Typography
            className="gift-card-request-success-link"
            onClick={homeRedirect}
          >
            <u>Back to Home</u>
          </Typography>
          <img
            src={SuccessIllustration}
            alt=""
            className="success-illustration"
          />
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default GiftCardRequestSuccess;
