import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { getAuthUserSelector } from "../../store/auth/selectors";

const ChooseAmount = () => {
  const user = useSelector(getAuthUserSelector);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {};

  console.log(user);

  return (
    <>
      <Card className="choose-amount-card">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*LABELS */}
          <Typography className="choose-amount-title">Choose Amount</Typography>
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
              min: 500,
              max: 100000,
            })}
          />
          {/*LABELS */}
          {errors.amount?.type === "required" && (
            <Typography className="choose-amount-error-fe">
              Amount is required.
            </Typography>
          )}
          {/*LABELS */}
          {errors.amount?.type === "min" && (
            <Typography className="choose-amount-error-fe">
              The minimum amount is 500 PTS.
            </Typography>
          )}
          {/*LABELS */}
          {errors.amount?.type === "max" && (
            <Typography className="choose-amount-error-fe">
              The maximum amount is 100000 PTS.
            </Typography>
          )}
          <Grid container>
            <Grid item xs={6}>
              <Button
                variant="contained"
                className="choose-amount-back-button"
                disableRipple
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
