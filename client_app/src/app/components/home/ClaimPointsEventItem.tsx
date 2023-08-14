import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import { IClaimPointEvent } from "../../store/claim-points-event/types";
import DollarIllustration from "./../../assets/illustrations/dollar-illustration.svg";

const ClaimPointsEventItem = (claimPointsEventItem: IClaimPointEvent) => {
  return (
    <Card sx={{ maxWidth: 944 }} className="card-item">
      <Grid container>
        <Grid item xs={1} className="card-grid-item">
          <img
            src={DollarIllustration}
            alt=""
            className="card-illustration-style"
          />
        </Grid>
        <Grid item xs={7} className="grid-description-style">
          <Typography className="card-description">
            <b>{claimPointsEventItem.title}</b>
            <span className="card-description-text">
              {" "}
              - {claimPointsEventItem.description}
            </span>
          </Typography>
        </Grid>

        <Grid item xs={3} className="grid-points-style">
          {claimPointsEventItem.amount !== 0 && (
            <Typography className="card-points">
              {claimPointsEventItem.amount} PTS
            </Typography>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default ClaimPointsEventItem;
