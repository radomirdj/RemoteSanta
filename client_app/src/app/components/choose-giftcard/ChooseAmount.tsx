import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserSelector } from "../../store/auth/selectors";
import {
  setGiftCardRequestAmount,
  setGiftCardRequestStepBack,
} from "../../store/gift-card-request/actions";
import {
  getGiftCardRequestIntegrationSelector,
  getStepperPagetSelector,
} from "../../store/gift-card-request/selectors";

const ChooseAmount = () => {
  const user = useSelector(getAuthUserSelector);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const activeStep = useSelector(getStepperPagetSelector);
  const giftCardIntegration = useSelector(
    getGiftCardRequestIntegrationSelector
  );
  const constraintString = JSON.stringify(giftCardIntegration?.constraintJson);
  const constraintJson = JSON.parse(constraintString);

  const onSubmit = (data: any) => {
    dispatch(setGiftCardRequestAmount({ amount: Number(data.amount) }));
  };

  const onBack = () => {
    dispatch(setGiftCardRequestStepBack({ currentStep: activeStep }));
  };

  const enoughBalance = (amount: number) => {
    if (user.userBalance?.pointsActive) {
      if (amount <= user.userBalance?.pointsActive) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <Card className="choose-amount-card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography className="choose-amount-title">Choose Amount</Typography>
          <Typography className="choose-amount-active-points">
            Your balance is {user.userBalance?.pointsActive} PTS.
          </Typography>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            className="email-input"
            value={user.email}
            disabled
          />
          <TextField
            error={errors.amount ? true : false}
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            className={
              errors.amount ? "amount-input-with-error" : "email-input"
            }
            type="number"
            {...register("amount", {
              required: true,
              min: constraintJson["MIN"],
              max: constraintJson["MAX"],
              validate: enoughBalance,
            })}
          />

          {errors.amount?.type === "required" && (
            <Typography className="choose-amount-error-fe">
              Amount is required.
            </Typography>
          )}

          {errors.amount?.type === "min" && (
            <Typography className="choose-amount-error-fe">
              The minimum amount is 500 PTS.
            </Typography>
          )}

          {errors.amount?.type === "max" && (
            <Typography className="choose-amount-error-fe">
              The maximum amount is 100000 PTS.
            </Typography>
          )}

          {errors.amount?.type === "validate" && (
            <Typography className="choose-amount-error-fe">
              The amount you specified is greater then the amount you have.
            </Typography>
          )}
          <Grid container>
            <Grid item xs={6}>
              <Button
                variant="contained"
                className="choose-amount-back-button"
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
                className="choose-amount-next-button"
                disableRipple
                type="submit"
                endIcon={<ChevronRight className="next-button-icon" />}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </>
  );
};

export default ChooseAmount;
