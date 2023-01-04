import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPublic from "../app-header-public/AppHeaderPublic";

const ErrorPage = () => {
  const navigate = useNavigate();

  const loginRedirect = () => {
    navigate("/login");
  };

  return (
    <>
      <AppHeaderPublic />
      <div className="background error-page">
        {/*LABELS */}
        <div className="error-page-content">
          <Typography className="error-page-title">
            Oops! 404 Page not found
          </Typography>
          <Typography className="error-page-small-text">
            The page you are looking for was moved, removed, renamed or might
            never existed.
          </Typography>
          <Typography
            className="error-page-small-text-link"
            onClick={loginRedirect}
          >
            <u>Back to Home</u>
          </Typography>
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default ErrorPage;
