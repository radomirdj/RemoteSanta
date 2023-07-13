import { Button, Card, Grid, Tooltip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSelfRequest } from "../../store/auth/actions";
import { getAuthUserSelector } from "../../store/auth/selectors";
import { fetchClaimPointsEventList } from "../../store/claim-points-event/actions";
import { getClaimPointsEventListSelector } from "../../store/claim-points-event/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import GiftIconBlack from "../../assets/icons/gift-icon-black.svg";
import GiftCardIcon from "../../assets/icons/gift-card-black-icon.svg";
import SparkBlack from "../../assets/icons/spark-black.svg";
import UseYourPointsIllustration from "./../../assets/illustrations/use-your-points-illustration.svg";
import RecognizeTeamIllustration from "./../../assets/illustrations/recognize-team-illustration.svg";
import YourGiftCardsIllustration from "./../../assets/illustrations/your-gift-cards-illustration.svg";
import { getOrganizationUserListSelector } from "../../store/orgs/selectors";
import { fetchOrganizationUserList } from "../../store/orgs/actions";
import UserBirthdayListItem from "./UserBirthdayListItem";
import { IOrgUser } from "../../store/orgs/types";
import { getUserNextBirthday } from "../../utils/Utils";

const Home = () => {
  const dispatch = useDispatch();
  const claimPointsEventList = useSelector(getClaimPointsEventListSelector);
  const user = useSelector(getAuthUserSelector);
  const navigate = useNavigate();
  const orgUserList = useSelector(getOrganizationUserListSelector);

  useEffect(() => {
    dispatch(fetchClaimPointsEventList());
    dispatch(getSelfRequest(navigate));
    dispatch(fetchOrganizationUserList());
  }, [dispatch]);

  const compareByNextBirthday = (a: IOrgUser, b: IOrgUser) => {
    return (
      getUserNextBirthday(a.birthDate || "").getTime() -
      getUserNextBirthday(b.birthDate || "").getTime()
    );
  };

  const usersWithBirthday = orgUserList
    .filter((user) => user.birthDate)
    .sort(compareByNextBirthday)
    .slice(0, 10);

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

  const myTeamRedirect = () => {
    navigate("/my-team");
  };

  const myGiftCardsRedirect = () => {
    navigate("/my-gift-cards");
  };

  return (
    <>
      <AppHeaderPrivate />
      <div className="background home">
        <Grid container spacing={4} className="grid-style">
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="step-card">
              <Grid container>
                <Grid item xs={8}>
                  <Typography className="step-title">Use Points</Typography>
                  <Typography className="step-text">
                    Tailor the experience based on your needs and interests.
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <img
                    src={UseYourPointsIllustration}
                    alt=""
                    className="step-illustration"
                  />
                </Grid>
                <Grid item xs={12} className="step-grid-item-button">
                  <Button
                    onClick={chooseGiftCardRedirect}
                    className="use-points-button"
                  >
                    <img src={SparkBlack} alt="" className="step-icon-style" />{" "}
                    Use your points now
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="step-card">
              <Grid container>
                <Grid item xs={8}>
                  <Typography className="step-title">Recognize Team</Typography>
                  <Typography className="step-text">
                    Pick a perfect gift cards for your teammates.
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <img
                    src={RecognizeTeamIllustration}
                    alt=""
                    className="step-illustration-recognize"
                  />
                </Grid>
                <Grid item xs={12} className="step-grid-item-button">
                  <Button
                    onClick={myTeamRedirect}
                    className="use-points-button"
                  >
                    <img
                      src={GiftIconBlack}
                      alt=""
                      className="step-icon-style"
                    />{" "}
                    Send some presents
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="step-card">
              <Grid container>
                <Grid item xs={8}>
                  <Typography className="step-title">
                    Your Gift Cards
                  </Typography>
                  <Typography className="step-text">
                    Manage, send or reedem your gift cards.
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <img
                    src={YourGiftCardsIllustration}
                    alt=""
                    className="step-illustration"
                  />
                </Grid>
                <Grid item xs={12} className="step-grid-item-button">
                  <Button
                    onClick={myGiftCardsRedirect}
                    className="use-points-button"
                  >
                    <img
                      src={GiftCardIcon}
                      alt=""
                      className="step-icon-style"
                    />{" "}
                    See my gift cards
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Typography className="home-text">
              {" "}
              {user.org?.name}'s upcoming events
            </Typography>
          </Grid>

          {/* {filteredList.map((element, i) => {
            return (
              <Grid item xs={12} key={i}>
                <ClaimPointsEventItem {...element} />
              </Grid>
            );
          })} */}
          {usersWithBirthday.map((element, i) => {
            return (
              <Grid item xs={12} key={i}>
                <UserBirthdayListItem {...element} />
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
