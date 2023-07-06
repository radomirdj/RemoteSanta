import { ChevronLeft } from "@mui/icons-material";
import { Button, Card, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthUserSelector } from "../../store/auth/selectors";
import {
  postGiftCardRequest,
  setGiftCardRequestStepBack,
} from "../../store/gift-card-request/actions";
import {
  getGiftCardRequestAmountInIntegrationCurrencySelector,
  getGiftCardRequestAmountSelector,
  getGiftCardRequestIntegrationSelector,
  getPendingSelector,
  getStepperPagetSelector,
} from "../../store/gift-card-request/selectors";

const GiftCardRequestOverview = () => {
  const activeStep = useSelector(getStepperPagetSelector);
  const giftCardIntegration = useSelector(
    getGiftCardRequestIntegrationSelector
  );
  const giftCardRequestAmount = useSelector(getGiftCardRequestAmountSelector);
  const giftCardRequestAmountInIntegrationCurrency = useSelector(
    getGiftCardRequestAmountInIntegrationCurrencySelector
  );
  const integrationCurrency = giftCardIntegration?.currency || "";
  const user = useSelector(getAuthUserSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pending = useSelector(getPendingSelector);

  const onBack = () => {
    dispatch(setGiftCardRequestStepBack({ currentStep: activeStep }));
  };

  const onSubmit = () => {
    dispatch(
      postGiftCardRequest(
        {
          giftCardIntegrationId: giftCardIntegration?.id || "",
          amount: giftCardRequestAmount,
          giftCardIntegrationCurrencyAmount:
            giftCardRequestAmountInIntegrationCurrency,
        },
        navigate
      )
    );
  };

  return (
    <>
      <Card className="overview-card">
        <Typography className="overview-title">Overview</Typography>
        <Card className="overview-child-card">
          <Grid container className="grid-style-overview">
            <Grid item xs={7} className="grid-item">
              <Typography className="overview-brand-title">
                {giftCardIntegration?.title}
              </Typography>
              <Typography className="overview-points">
                {giftCardRequestAmount} PTS ={" "}
                {giftCardRequestAmountInIntegrationCurrency}{" "}
                {integrationCurrency}
              </Typography>
              <Typography className="overview-amount">{user.email}</Typography>
            </Grid>
            <Grid item xs={5} className="grid-item">
              <img
                src={giftCardIntegration?.image}
                alt=""
                className="image-style"
              />
            </Grid>
          </Grid>
        </Card>
        <Grid container className="button-container">
          <Grid item xs={6}>
            <Button
              variant="contained"
              className="overview-back-button"
              disableRipple
              onClick={onBack}
              startIcon={<ChevronLeft className="back-button-icon" />}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              className="overview-confirm-button"
              disableRipple
              disabled={pending ? true : false}
              type="submit"
              onClick={onSubmit}
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default GiftCardRequestOverview;
