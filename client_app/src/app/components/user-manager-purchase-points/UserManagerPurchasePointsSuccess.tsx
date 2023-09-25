import React from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import { Typography } from "@mui/material";
import SuccessIllustration from "./../../assets/illustrations/my-team-send-points-success-illustration.svg";
import { useNavigate } from "react-router-dom";

const UserManagerPurchasePointsSuccess = () => {
  const navigate = useNavigate();

  const homeRedirect = () => {
    navigate("/");
  };

  return (
    <>
      <AppHeaderPrivate />
      <div className="background user-manager-purchase-points-success">
        <div className="user-manager-purchase-points-success-content">
          <Typography className="user-manager-purchase-points-success-title">
            Thank you! The points you acquired have been successfully processed!
          </Typography>
          <div className="user-manager-purchase-points-success-div-text">
            <Typography className="user-manager-purchase-points-success-text">
              Remote Santa Magic is about to land in your inbox! We want to
              inform you that payment instructions and an invoice will be sent
              to your email address in the next few hours. There's a bit of
              manual work involved from our end, but please know that we're
              fully committed to making it a smooth process for you.
            </Typography>
          </div>
          <Typography
            className="user-manager-purchase-points-success-link"
            onClick={homeRedirect}
          >
            <u>Back to Home</u>
          </Typography>
          <img
            src={SuccessIllustration}
            alt=""
            className="user-manager-purchase-points-success-illustration"
          />
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default UserManagerPurchasePointsSuccess;
