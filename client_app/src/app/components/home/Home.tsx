import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthUserSelector } from "../../store/auth/selectors";
import { fetchClaimPointsEventList } from "../../store/claim-points-event/actions";
import { getClaimPointsEventListSelector } from "../../store/claim-points-event/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import ClaimPointsEventItem from "./ClaimPointsEventItem";

const Home = () => {
  const dispatch = useDispatch();
  const claimPointsEventList = useSelector(getClaimPointsEventListSelector);
  const user = useSelector(getAuthUserSelector);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchClaimPointsEventList());
  }, [dispatch]);

  const currentDate = new Date();
  const filteredList = claimPointsEventList.filter((claimPointsEvent) => {
    let validToDate = new Date(claimPointsEvent.validTo);
    if (
      currentDate > validToDate ||
      claimPointsEvent.claimPointsEventFulfillment
    )
      return false;
    return true;
  });

  const chooseGiftCardRedirect = () => {
    navigate("/choose-gift-card");
  };

  return (
    <>
      <AppHeaderPrivate />
      <div className="background home">
        {/*LABELS */}
        <Grid container spacing={4} className="grid-style">
          <Grid item xs={6}>
            <Typography className="home-title">
              Hello {user.firstName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="home-title-right">4000 PTS</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="home-text">Upcoming events</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="home-text-right">
              Use your points{" "}
              <u onClick={chooseGiftCardRedirect} className="home-link">
                now
              </u>
              .
            </Typography>
          </Grid>
          {filteredList.map((element, i) => {
            return (
              <Grid item xs={12} key={i}>
                <ClaimPointsEventItem {...element} />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <AppFooter />
    </>
  );
};

export default Home;
