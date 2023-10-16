import { Typography } from "@mui/material";

import UnlockGiftCardsIllustration from "./../../assets/illustrations/unlock-gift-cards-illustration.svg";

const UnlockGiftCards = (props: any) => {
  return (
    <>
      <div className="unlock-gift-cards">
        <div className="unlock-gift-cards-content">
          <Typography className="unlock-gift-cards-title">
            To unlock the gift card list in this country, please purchase
            points! Explore fantastic offers and find the perfect presents for
            yourself or your colleagues.
          </Typography>
          <img
            src={UnlockGiftCardsIllustration}
            alt=""
            className="unlock-gift-cards-illustration"
          />
        </div>
      </div>
    </>
  );
};

export default UnlockGiftCards;
