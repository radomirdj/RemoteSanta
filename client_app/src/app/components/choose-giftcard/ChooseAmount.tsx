import { Card, TextField, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { getAuthUserSelector } from "../../store/auth/selectors";

import { getGiftCardRequestIntegrationSelector } from "../../store/gift-card-request/selectors";
import AmountList from "./AmountList";
import AmountMinMax from "./AmountMinMax";

const ChooseAmount = () => {
  const user = useSelector(getAuthUserSelector);
  const giftCardIntegration = useSelector(
    getGiftCardRequestIntegrationSelector
  );

  const conversionRate =
    giftCardIntegration?.pointsToCurrencyConversionRate || 1;

  const pointsActive = user.userBalance?.pointsActive || 0;
  const userBalanceInCurrency = pointsActive * conversionRate;

  return (
    <>
      <Card className="choose-amount-card">
        <Typography className="choose-amount-title">Choose Amount</Typography>
        <Typography className="choose-amount-active-points">
          Your balance is {pointsActive} PTS. This is equal to{" "}
          {userBalanceInCurrency.toFixed(2)} {giftCardIntegration?.currency}.
        </Typography>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className="email-input"
          value={user.email}
          disabled
        />
        {giftCardIntegration?.constraintType === "MIN_MAX" && <AmountMinMax />}
        {giftCardIntegration?.constraintType === "LIST" && <AmountList />}
      </Card>
    </>
  );
};

export default ChooseAmount;
