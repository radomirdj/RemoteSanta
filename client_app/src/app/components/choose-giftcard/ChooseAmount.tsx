import { Card, TextField, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { getAuthUserSelector } from "../../store/auth/selectors";

import { getGiftCardRequestIntegrationSelector } from "../../store/gift-card-request/selectors";
import AmountList from "./AmountList";
import AmountMinMax from "./AmountMinMax";
import { UserRole } from "../../enums/UserRole";

const ChooseAmount = (props: any) => {
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
        <Typography
          className={
            user.userRole === UserRole.USER_MANAGER
              ? "choose-amount-active-points"
              : "choose-amount-active-points-with-margin"
          }
        >
          Your balance is {pointsActive} PTS. This is equal to{" "}
          {userBalanceInCurrency.toFixed(2)} {giftCardIntegration?.currency}.
        </Typography>
        {user.userRole === UserRole.USER_MANAGER && (
          <Typography className="send-gift-card-as">
            You’re sending gift card as {user.firstName}.
          </Typography>
        )}
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className="email-input"
          value={props.sendToEmail}
          disabled
        />
        {giftCardIntegration?.constraintType === "MIN_MAX" && (
          <AmountMinMax hasMessage={props.hasMessage} />
        )}
        {giftCardIntegration?.constraintType === "LIST" && (
          <AmountList hasMessage={props.hasMessage} />
        )}
      </Card>
    </>
  );
};

export default ChooseAmount;
