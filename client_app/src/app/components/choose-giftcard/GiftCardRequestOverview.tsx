import { ChevronLeft } from "@mui/icons-material";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
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
  getGiftCardRequestMessageSelector,
  getPendingSelector,
  getStepperPagetSelector,
} from "../../store/gift-card-request/selectors";

const GiftCardRequestOverview = (props: any) => {
  const activeStep = useSelector(getStepperPagetSelector);
  const giftCardIntegration = useSelector(
    getGiftCardRequestIntegrationSelector
  );
  const giftCardRequestAmount = useSelector(getGiftCardRequestAmountSelector);
  const giftCardRequestMessage = useSelector(getGiftCardRequestMessageSelector);
  const giftCardRequestAmountInIntegrationCurrency = useSelector(
    getGiftCardRequestAmountInIntegrationCurrencySelector
  );
  const integrationCurrency = giftCardIntegration?.currency || "";
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
          sendToUserId: props.sendToUserId,
          message: giftCardRequestMessage || "",
        },
        navigate
      )
    );
  };

  return (
    <>
      <Card className="overview-card">
        <Typography className="overview-title">Overview</Typography>
        <Card
          className={
            giftCardRequestMessage !== ""
              ? "overview-child-card"
              : "overview-child-card-no-message"
          }
        >
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
              <Typography className="overview-amount">
                {props.sendToEmail}
              </Typography>
            </Grid>
            <Grid item xs={5} className="grid-item">
              <img
                src={giftCardIntegration?.image}
                alt=""
                className={
                  giftCardRequestMessage !== ""
                    ? "image-style"
                    : "image-style-no-message"
                }
              />
            </Grid>
            {giftCardRequestMessage !== "" && (
              <Grid item xs={12}>
                <Typography className="overview-message">Message</Typography>
                <Box className="message-child-card">
                  <Typography className="overview-message-text">
                    {giftCardRequestMessage}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Card>
        <Grid container className="button-container">
          <Grid item xs={6}>
            <Button
              variant="outlined"
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
