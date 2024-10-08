import React from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import { Typography } from "@mui/material";
import SuccessIllustration from "./../../assets/illustrations/purchase-points-success-illustration.svg";
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
            Thank you for your purchase!
            <br /> We appreciate your support. Enjoy our app to the fullest and
            empower your team to be more proactive and engaged!
          </Typography>
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
