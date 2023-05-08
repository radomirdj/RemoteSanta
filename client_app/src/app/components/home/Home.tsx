import { Grid, Tooltip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSelfRequest } from "../../store/auth/actions";
import { getAuthUserSelector } from "../../store/auth/selectors";
import { fetchClaimPointsEventList } from "../../store/claim-points-event/actions";
import { getClaimPointsEventListSelector } from "../../store/claim-points-event/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import ClaimPointsEventItem from "./ClaimPointsEventItem";
import CompletementSteps from "./CompletementSteps";

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
          <CompletementSteps />
          <Grid item xs={12} sm={6}>
            <Typography className="home-title">
              Hello {user.firstName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip
              title={`${user.org?.country?.conversionRateToPoints} PTS is equal to 1 ${user.org?.country?.currencyString}`}
              placement="left"
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
              <Typography className="home-title-right">
                {user.userBalance?.pointsActive} PTS
              </Typography>
            </Tooltip>
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
