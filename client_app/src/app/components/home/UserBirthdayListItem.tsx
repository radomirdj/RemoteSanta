import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import { IOrgUser } from "../../store/orgs/types";
import { getUserNextBirthday } from "../../utils/Utils";
import HomeIllustration from "./../../assets/illustrations/home-illustration.svg";

const UserBirthdayListItem = (user: IOrgUser) => {
  return (
    <Card sx={{ maxWidth: 944 }} className="card-item">
      <Grid container>
        <Grid item xs={1} className="card-grid-item">
          <img
            src={HomeIllustration}
            alt=""
            className="card-illustration-style"
          />
        </Grid>
        <Grid item xs={10} className="grid-description-style">
          <Typography className="card-description">
            {getUserNextBirthday(user.birthDate || "").toLocaleDateString(
              "en-US",
              {
                day: "numeric",
                year: "numeric",
                month: "short",
              }
            )}
            {" - "}
            <b>{user.firstName}'s Birthday!</b>
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserBirthdayListItem;
