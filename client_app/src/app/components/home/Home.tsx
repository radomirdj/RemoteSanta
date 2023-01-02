import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthUserSelector } from "../../store/auth/selectors";
import { fetchClaimPointsEventList } from "../../store/claim-points-event/actions";
import { getClaimPointsEventListSelector } from "../../store/claim-points-event/selectors";
import { IClaimPointEvent } from "../../store/claim-points-event/types";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import ClaimPointsEventItem from "./ClaimPointsEventItem";

const Home = () => {
  const dispatch = useDispatch();
  const claimPointsEventList = useSelector(getClaimPointsEventListSelector);
  const user = useSelector(getAuthUserSelector);
  const navigate = useNavigate();
  const [eventList, setEventList] =
    useState<IClaimPointEvent[]>(claimPointsEventList);

  console.log(claimPointsEventList);

  useEffect(() => {
    dispatch(fetchClaimPointsEventList());
  }, [dispatch]);

  useEffect(() => {
    let list = eventList;
    const currentDate = new Date();
    list.forEach((item, i) => {
      let validToDate = new Date(item.validTo);
      if (item.claimPointsEventFulfillment) {
        list.splice(i, 1);
      }
      if (currentDate > validToDate) {
        list.splice(i, 1);
      }
    });
    setEventList(list);
  }, [claimPointsEventList]);

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
              Use your points <u onClick={chooseGiftCardRedirect}>now</u>.
            </Typography>
          </Grid>
          {eventList.map((element, i) => {
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
