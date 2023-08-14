import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
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

const AmountList = (props: any) => {
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
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

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
        message: data.message,
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
            MenuProps={MenuProps}
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

export default AmountList;
