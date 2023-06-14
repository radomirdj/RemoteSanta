import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthUserSelector } from "../../store/auth/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import NoGiftCardsIllustration from "./../../assets/illustrations/no-gift-cards-illustration.svg";
import GiftIconBlack from "../../assets/icons/gift-icon-black.svg";

const NoGiftCards = () => {
  const user = useSelector(getAuthUserSelector);
  const navigate = useNavigate();

  const chooseGiftCardRedirect = () => {
    navigate("/choose-gift-card");
  };
  return (
    <>
      <AppHeaderPrivate />
      <div className="background no-gift-cards">
        <div className="no-gift-cards-content">
          <Typography className="no-gift-cards-title">
            You don't have any gift cards yet. Use your points and grab the
            things you love.
          </Typography>
          <Typography className="no-gift-cards-points">
            Your balance is {user.userBalance?.pointsActive} points.
          </Typography>
          <Grid item xs={12} sm={3} className="button-item">
            <Button
              onClick={chooseGiftCardRedirect}
              className="use-points-button"
            >
              <img src={GiftIconBlack} alt="" className="gift-icon-style" /> Use
              your points now
            </Button>
          </Grid>
          <img
            src={NoGiftCardsIllustration}
            alt=""
            className="no-gift-cards-illustration"
          />
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default NoGiftCards;
