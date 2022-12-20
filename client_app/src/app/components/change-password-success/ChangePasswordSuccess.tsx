import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPublic from "../app-header-public/AppHeaderPublic";

const ChangePasswordSuccess = () => {
  const navigate = useNavigate();

  const loginRedirect = () => {
    navigate("/login");
  };

  return (
    <>
      <AppHeaderPublic />
      <div className="background change-password-success">
        {/*LABELS */}
        <div className="change-password-success-content">
          <Typography className="change-password-success-title">
            Your password is successfully changed
          </Typography>
          <Typography
            className="change-password-success-link"
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

export default ChangePasswordSuccess;
