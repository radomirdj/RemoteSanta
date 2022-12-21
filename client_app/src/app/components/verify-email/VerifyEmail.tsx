import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPublic from "../app-header-public/AppHeaderPublic";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const loginRedirect = () => {
    navigate("/login");
  };

  return (
    <>
      <AppHeaderPublic />
      <div className="background verify-email">
        {/*LABELS */}
        <div className="verify-email-content">
          <Typography className="verify-email-small-text">
            Thank you for registering!
          </Typography>
          <Typography className="verify-email-title">
            Verify your email address
          </Typography>
          <Typography className="verify-email-small-text">
            Check your email & click the link to activate your account
          </Typography>
          <Typography
            className="verify-email-small-text-link"
            onClick={loginRedirect}
          >
            <u>Back to Login</u>
          </Typography>
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default VerifyEmail;
