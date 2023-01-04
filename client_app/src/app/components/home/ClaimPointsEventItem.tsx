import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import { IClaimPointEvent } from "../../store/claim-points-event/types";
import DollarIllustration from "./../../assets/illustrations/dollar-illustration.svg";

const ClaimPointsEventItem = (claimPointsEventItem: IClaimPointEvent) => {
  return (
    <Card sx={{ maxWidth: 944 }} className="card-item">
      <Grid container>
        <Grid item xs={2} className="card-grid-item">
          <img
            src={DollarIllustration}
            alt=""
            className="card-illustration-style"
          />
        </Grid>
        <Grid item xs={6} className="grid-description-style">
          <Typography className="card-description">
            {claimPointsEventItem.description}
          </Typography>
        </Grid>
        <Grid item xs={3} className="grid-points-style">
          <Typography className="card-points">
            {claimPointsEventItem.amount} PTS
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ClaimPointsEventItem;
