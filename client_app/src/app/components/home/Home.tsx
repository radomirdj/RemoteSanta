import { Button, Grid, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSelfRequest } from "../../store/auth/actions";
import { getAuthUserSelector } from "../../store/auth/selectors";
import { fetchClaimPointsEventList } from "../../store/claim-points-event/actions";
import { getClaimPointsEventListSelector } from "../../store/claim-points-event/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import ClaimPointsEventItem from "./ClaimPointsEventItem";
import GiftIconBlack from "../../assets/icons/gift-icon-black.svg";

const Home = () => {
  const dispatch = useDispatch();
  const claimPointsEventList = useSelector(getClaimPointsEventListSelector);
  const user = useSelector(getAuthUserSelector);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchClaimPointsEventList());
    dispatch(getSelfRequest(navigate));
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
        <Grid container spacing={4} className="grid-style">
          <Grid item xs={12} sm={6}>
            <Typography className="home-title">
              Hello {user.firstName}
            </Typography>

            <Tooltip
              title={`${user.org?.country?.conversionRateToPoints} PTS is equal to 1 ${user.org?.country?.currencyString}`}
              placement="right"
              PopperProps={{
                sx: {
                  "& .MuiTooltip-tooltip": {
                    color: "black",
                    backgroundColor: "white",
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    height: "40px",
                    width: "200px",
                    borderRadius: "16px",
                    paddingTop: "20px",
                  },
                },
              }}
            >
              <Typography className="home-balance">
                Your balance is {user.userBalance?.pointsActive} points.
              </Typography>
            </Tooltip>
            <Typography className="home-text">
              {" "}
              {user.org?.name}'s upcoming events
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className="button-item">
            <Button
              onClick={chooseGiftCardRedirect}
              className="use-points-button"
            >
              <img src={GiftIconBlack} alt="" className="gift-icon-style" /> Use
              your points now
            </Button>
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
