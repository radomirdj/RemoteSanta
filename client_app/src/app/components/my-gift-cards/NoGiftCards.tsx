import { Typography } from "@mui/material";
import React from "react";
import NoGiftCardsIllustration from "./../../assets/illustrations/no-gift-cards-illustration.svg";

const NoGiftCards = () => {
  return (
    <>
      <div className="no-gift-cards">
        <div className="no-gift-cards-content">
          <Typography className="no-gift-cards-title">
            You don't have any gift cards yet. Use your points and grab the
            things you love.
          </Typography>
          <img
            src={NoGiftCardsIllustration}
            alt=""
            className="no-gift-cards-illustration"
          />
        </div>
      </div>
    </>
  );
};

export default NoGiftCards;
