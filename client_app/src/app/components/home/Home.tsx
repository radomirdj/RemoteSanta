import { Button, Card, Grid, Tooltip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSelfRequest } from "../../store/auth/actions";
import { getAuthUserSelector } from "../../store/auth/selectors";
import { fetchClaimPointsEventList } from "../../store/claim-points-event/actions";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import GiftIconBlack from "../../assets/icons/gift-icon-black.svg";
import GiftCardIcon from "../../assets/icons/gift-card-black-icon.svg";
import SparkBlack from "../../assets/icons/spark-black.svg";
import UseYourPointsIllustration from "./../../assets/illustrations/use-your-points-illustration.svg";
import RecognizeTeamIllustration from "./../../assets/illustrations/recognize-team-illustration.svg";
import YourGiftCardsIllustration from "./../../assets/illustrations/your-gift-cards-illustration.svg";
import {
  getOrganizationSelector,
  getOrganizationUserListSelector,
} from "../../store/orgs/selectors";
import {
  fetchOrganization,
  fetchOrganizationUserList,
} from "../../store/orgs/actions";
import UserBirthdayListItem from "./UserBirthdayListItem";
import { IOrgUser } from "../../store/orgs/types";
import { getUserNextBirthday } from "../../utils/Utils";
import CompletementSteps from "./CompletementSteps";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(getAuthUserSelector);
  const navigate = useNavigate();
  const orgUserList = useSelector(getOrganizationUserListSelector);
  const organization = useSelector(getOrganizationSelector);

  useEffect(() => {
    dispatch(getSelfRequest(navigate));
    dispatch(fetchOrganizationUserList());
    dispatch(fetchOrganization());
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

  const chooseGiftCardRedirect = () => {
    navigate("/choose-gift-card-personal");
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
          <CompletementSteps />
          <Grid item xs={12}>
            <Typography className="home-title">
              Hello {user.firstName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
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
                    height: "32px",
                    width: "200px",
                    borderRadius: "16px",
                    paddingTop: "16px",
                  },
                },
              }}
            >
              <Typography className="home-balance">
                Your balance is {user.userBalance?.pointsActive} points.
              </Typography>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6}>
            {user.userRole === "USER_MANAGER" && (
              <Tooltip
                title="Manage balance, purchase points, and recognize employees in the My Company menu."
                placement="top"
                PopperProps={{
                  sx: {
                    "& .MuiTooltip-tooltip": {
                      color: "black",
                      backgroundColor: "white",
                      fontFamily: "Montserrat",
                      fontSize: "16px",
                      height: "73px",
                      width: "300px",
                      borderRadius: "16px",
                      paddingTop: "16px",
                    },
                  },
                }}
              >
                <Typography className="home-company-balance">
                  Company's balance is {organization?.balance} points.
                </Typography>
              </Tooltip>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="step-card">
              <Grid container>
                <Grid item xs={8} sm={7}>
                  <Typography className="step-title">
                    Use Your Points
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={5}>
                  <img
                    src={UseYourPointsIllustration}
                    alt=""
                    className="step-illustration-home"
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
                <Grid item xs={8} sm={7}>
                  <Typography className="step-title">Recognize Team</Typography>
                </Grid>
                <Grid item xs={4} sm={5}>
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
                    Send presents
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="step-card">
              <Grid container>
                <Grid item xs={8} sm={7}>
                  <Typography className="step-title">
                    Your Gift Cards
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={5}>
                  <img
                    src={YourGiftCardsIllustration}
                    alt=""
                    className="step-illustration-gift-cards"
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
                    Check your gift cards
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          {usersWithBirthday.length > 0 && (
            <Grid item xs={12}>
              <Typography className="home-text">
                {" "}
                {user.org?.name}'s upcoming events
              </Typography>
            </Grid>
          )}
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
