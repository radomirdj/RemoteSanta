import { ChevronLeft } from "@mui/icons-material";
import { Button, Card, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserSelector } from "../../store/auth/selectors";
import { setGiftCardRequestStepBack } from "../../store/gift-card-request/actions";
import {
  getGiftCardRequestAmountSelector,
  getGiftCardRequestIntegrationSelector,
  getStepperPagetSelector,
} from "../../store/gift-card-request/selectors";

const GiftCardRequestOverview = () => {
  const activeStep = useSelector(getStepperPagetSelector);
  const giftCardIntegration = useSelector(
    getGiftCardRequestIntegrationSelector
  );
  const giftCardRequestAmount = useSelector(getGiftCardRequestAmountSelector);
  const user = useSelector(getAuthUserSelector);
  const dispatch = useDispatch();

  const onBack = () => {
    dispatch(setGiftCardRequestStepBack({ currentStep: activeStep }));
  };

  return (
    <>
      <Card className="overview-card">
        {/*LABELS */}
        <Typography className="overview-title">Overview</Typography>
        <Card className="overview-child-card">
          <Grid container className="grid-style">
            <Grid item xs={12} sm={7} className="grid-item">
              <Typography className="overview-brand-title">
                {giftCardIntegration?.title}
              </Typography>
              <Typography className="overview-amount">
                {giftCardRequestAmount} PTS
              </Typography>
              <Typography className="overview-amount">{user.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={5} className="grid-item">
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
              type="submit"
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
