import { Box, Button, Card, Grid, Tab, Tabs, Typography } from "@mui/material";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSelfRequest } from "../../store/auth/actions";
import { getAuthUserSelector } from "../../store/auth/selectors";
import { fetchGiftCardRequestList } from "../../store/gift-card-request/actions";
import { getGiftCardRequestListSelector } from "../../store/gift-card-request/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import MyGiftCardItem from "./MyGiftCardItem";
import NoGiftCards from "./NoGiftCards";
import GiftIconBlack from "../../assets/icons/gift-icon-black.svg";

const MyGiftCards = () => {
  const dispatch = useDispatch();
  const giftCardRequestListAll = useSelector(getGiftCardRequestListSelector);
  const navigate = useNavigate();
  const user = useSelector(getAuthUserSelector);
  const [tabIndex, setTabIndex] = React.useState("one");

  //remove declined gift cards from the from the list
  const myGiftCardRequestList = giftCardRequestListAll.filter(
    (giftCardRequest) =>
      giftCardRequest.status !== "DECLINED" &&
      giftCardRequest.ownerId === user.id &&
      giftCardRequest.createdById === user.id
  );

  const sentGiftCardRequestList = giftCardRequestListAll.filter(
    (giftCardRequest) =>
      giftCardRequest.status !== "DECLINED" &&
      giftCardRequest.ownerId !== user.id &&
      giftCardRequest.createdById === user.id
  );

  const receivedGiftCardRequestList = giftCardRequestListAll.filter(
    (giftCardRequest) =>
      giftCardRequest.status !== "DECLINED" &&
      giftCardRequest.ownerId === user.id &&
      giftCardRequest.createdById !== user.id
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    dispatch(fetchGiftCardRequestList());
    dispatch(getSelfRequest(navigate));
  }, [dispatch]);

  const chooseGiftCardRedirect = () => {
    navigate("/choose-gift-card");
  };

  return (
    <>
      <AppHeaderPrivate />
      {myGiftCardRequestList.length > 0 && (
        <div className="background my-gift-cards">
          <Grid container spacing={4} className="grid-style">
            <Grid item xs={12} sm={6} className="grid-item">
              <Typography className="my-gift-cards-text">
                Your balance is {user.userBalance?.pointsActive} points.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} className="button-item">
              <Button
                onClick={chooseGiftCardRedirect}
                className="use-points-button"
              >
                <img src={GiftIconBlack} alt="" className="gift-icon-style" />{" "}
                Use your points now
              </Button>
            </Grid>
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={tabIndex}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="primary"
                className="tabs-style"
              >
                <Tab value="one" label="My" disableRipple />
                <Tab value="two" label="Sent" disableRipple />
                <Tab value="three" label="Received" disableRipple />
              </Tabs>
            </Box>
            {tabIndex === "three" && myGiftCardRequestList.length === 0 && (
              <NoGiftCards />
            )}
            {tabIndex === "one" &&
              myGiftCardRequestList.length > 0 &&
              myGiftCardRequestList.map((element, i) => {
                return (
                  <Grid item xs={12} sm={6} md={3} key={i}>
                    <MyGiftCardItem {...element} />
                  </Grid>
                );
              })}
            {tabIndex === "two" && sentGiftCardRequestList.length === 0 && (
              <NoGiftCards />
            )}
            {tabIndex === "two" &&
              sentGiftCardRequestList.length > 0 &&
              sentGiftCardRequestList.map((element, i) => {
                return (
                  <Grid item xs={12} sm={6} md={3} key={i}>
                    <MyGiftCardItem {...element} />
                  </Grid>
                );
              })}
            {tabIndex === "three" &&
              receivedGiftCardRequestList.length === 0 && <NoGiftCards />}
            {tabIndex === "three" &&
              receivedGiftCardRequestList.length > 0 &&
              receivedGiftCardRequestList.map((element, i) => {
                return (
                  <Grid item xs={12} sm={6} md={3} key={i}>
                    <MyGiftCardItem {...element} />
                  </Grid>
                );
              })}
          </Grid>
        </div>
      )}
      <AppFooter />
    </>
  );
};

export default MyGiftCards;
