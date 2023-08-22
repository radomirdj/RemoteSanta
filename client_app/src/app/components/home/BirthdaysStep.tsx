import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import BirthdayIllustration from "./../../assets/illustrations/birthday-illustration.svg";

const BirthdaysStep = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #ffffff",
    borderRadius: "24px",
    p: 4,
  };

  return (
    <Card sx={style}>
      <Grid container>
        <Grid item xs={9}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            className="completement-step-title"
          >
            Birthdays
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <img
            src={BirthdayIllustration}
            alt=""
            className="completement-step-illustration"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            id="modal-modal-title"
            variant="body2"
            className="completement-step-text"
          >
            Let Remote Santa plan your fantastic birthday bash! Just share a few
            details for the perfect setup and watch the magic unfold.
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default BirthdaysStep;
