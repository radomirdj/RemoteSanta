import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import SignupBonusIllustration from "./../../assets/illustrations/signup-bonus-illustration.svg";

const AutomaticPointsDeliveryStep = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #ffffff",
    borderRadius: "24px",
    p: 6,
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
            Signup Bonus Points
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <img
            src={SignupBonusIllustration}
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
            Extend a warm welcome with signup bonus points for your employees as
            they join the app. Our recommended range is around 5-10 USD per
            employee.
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AutomaticPointsDeliveryStep;
