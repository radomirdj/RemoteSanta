import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import SuccessIllustration from "./../../assets/illustrations/my-team-send-points-success-illustration.svg";

const MyTeamSendPointsSuccess = () => {
  const navigate = useNavigate();

  const homeRedirect = () => {
    navigate("/my-team");
  };

  return (
    <>
      <AppHeaderPrivate />
      <div className="background my-team-send-points-success">
        <div className="my-team-send-points-success-content">
          <Typography className="my-team-send-points-success-title">
            Mission accomplished! Points sent to your colleague. Let the good
            times roll!
          </Typography>
          <Typography
            className="my-team-send-points-success-link"
            onClick={homeRedirect}
          >
            <u>Back to Team</u>
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

export default MyTeamSendPointsSuccess;
