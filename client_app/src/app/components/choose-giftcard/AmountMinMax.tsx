import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
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
import { calculateAmountInIntegrationCurrencyLower } from "../../utils/Utils";

const AmountMinMax = (props: any) => {
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
  const [pointsToCurrencyMessage, setPointsToCurrencyMessage] =
    React.useState("");
  const constraintString = JSON.stringify(giftCardIntegration?.constraintJson);
  const constraintJson = JSON.parse(constraintString);
  const conversionRate =
    giftCardIntegration?.pointsToCurrencyConversionRate || 1;
  const integrationCurrencyMin = constraintJson["MIN"];
  const integrationCurrencyMax = constraintJson["MAX"];
  const integrationCurrency = giftCardIntegration?.currency || "";
  const minValue = Math.ceil(integrationCurrencyMin / conversionRate);
  const maxValue = Math.floor(integrationCurrencyMax / conversionRate);

  const onSubmit = (data: any) => {
    dispatch(
      setGiftCardRequestAmount({
        amount: Number(data.amount),
        amountInIntegrationCurrency: calculateAmountInIntegrationCurrencyLower(
          data.amount,
          conversionRate
        ),
        message: data.message,
      })
    );
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

  const pointsToCurrency = (points: any) => {
    const pointsInCurrency = calculateAmountInIntegrationCurrencyLower(
      points,
      conversionRate
    );
    setPointsToCurrencyMessage(
      "This is equal to " + pointsInCurrency + " " + integrationCurrency + "."
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={errors.amount ? true : false}
          id="outlined-basic"
          label="Amount in PTS"
          placeholder="PTS you want to spend"
          variant="outlined"
          className={errors.amount ? "amount-input-with-error" : "email-input"}
          type="number"
          {...register("amount", {
            required: true,
            min: minValue,
            max: maxValue,
            validate: enoughBalance,
            onChange: (e) => pointsToCurrency(e.target.value),
          })}
        />

        {errors.amount?.type === "required" && (
          <Typography className="choose-amount-error-fe">
            Amount is required.
          </Typography>
        )}

        {errors.amount?.type === "min" && (
          <Typography className="choose-amount-error-fe">
            This shop has a minimum amount of {minValue} PTS (
            {integrationCurrencyMin} {integrationCurrency}).
          </Typography>
        )}

        {errors.amount?.type === "max" && (
          <Typography className="choose-amount-error-fe">
            This shop has a maximum amount of {maxValue} PTS (
            {integrationCurrencyMax} {integrationCurrency}).
          </Typography>
        )}

        {errors.amount?.type === "validate" && (
          <Typography className="choose-amount-error-fe">
            The amount you specified is greater then the amount you have.
          </Typography>
        )}
        <span className="points-in-currency-style">
          {pointsToCurrencyMessage}
        </span>
        {props.hasMessage && (
          <TextField
            error={errors.message ? true : false}
            id="standard-multiline-static"
            label="Message"
            multiline
            rows={2}
            className={
              errors.message ? "comment-input-with-error" : "comment-input"
            }
            variant="outlined"
            {...register("message", {
              required: props.hasMessage,
            })}
          />
        )}
        {errors.message?.type === "required" && (
          <Typography className="comment-error-fe">
            Message is required.
          </Typography>
        )}
        <Grid container>
          <Grid item xs={6}>
            <Button
              variant="outlined"
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
    </>
  );
};

export default AmountMinMax;
