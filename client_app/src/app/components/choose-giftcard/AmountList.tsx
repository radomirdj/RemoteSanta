import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
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
import { calculatePointsFromIntegrationCurrencyUpper } from "../../utils/Utils";

const AmountList = () => {
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
  const conversionRate =
    giftCardIntegration?.pointsToCurrencyConversionRate || 1;
  const amountArrayBasic = JSON.parse(
    JSON.stringify(giftCardIntegration?.constraintJson || "")
  );
  const integrationCurrency = giftCardIntegration?.currency || "";

  const amountArray = amountArrayBasic.map((amount: number) => ({
    amountInCurrency: amount,
    amountInPoints: calculatePointsFromIntegrationCurrencyUpper(
      amount,
      conversionRate
    ),
  }));

  const onBack = () => {
    dispatch(setGiftCardRequestStepBack({ currentStep: activeStep }));
  };

  const onSubmit = (data: any) => {
    dispatch(
      setGiftCardRequestAmount({
        amount: calculatePointsFromIntegrationCurrencyUpper(
          data.amount,
          conversionRate
        ),
        amountInIntegrationCurrency: Number(data.amount),
      })
    );
  };

  const enoughBalance = (amount: number) => {
    const pointsAmount = calculatePointsFromIntegrationCurrencyUpper(
      amount,
      conversionRate
    );
    if (user.userBalance?.pointsActive) {
      if (pointsAmount <= user.userBalance?.pointsActive) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl variant="outlined">
          <InputLabel id="amountLabel">Amount</InputLabel>
          <Select
            labelId="amountLabel"
            id="amount"
            className={
              errors.amount ? "amount-input-list-with-error" : "email-input"
            }
            label="Amount"
            {...register("amount", {
              required: true,
              validate: enoughBalance,
            })}
            defaultValue={amountArray[0].amountInCurrency}
          >
            {amountArray.map((amountObject: any, i: string) => {
              return (
                <MenuItem value={amountObject.amountInCurrency} key={i}>
                  <Grid container>
                    <Grid item xs={3}>
                      <b>
                        {amountObject.amountInCurrency} {integrationCurrency}
                      </b>
                    </Grid>

                    <Grid item xs={6}>
                      {"*"}
                      <span style={{ fontSize: "12px" }}>
                        {amountObject.amountInPoints} PTS
                      </span>
                    </Grid>
                  </Grid>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {errors.amount?.type === "required" && (
          <Typography className="choose-amount-error-fe">
            Amount is required.
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
    </>
  );
};

export default AmountList;
