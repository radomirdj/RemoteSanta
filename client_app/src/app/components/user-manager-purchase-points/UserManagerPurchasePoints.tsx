import React from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import {
  Button,
  Card,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getErrorSelector } from "../../store/orgs/selectors";
import ErrorIcon from "@mui/icons-material/Error";
import { postPurchasePoints } from "../../store/self-signup/actions";
import { useNavigate } from "react-router-dom";
import { USD_TO_POINTS_CONVERSION_RATE } from "../../utils/Const";

const UserManagerPurchasePoints = () => {
  const error = useSelector(getErrorSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit
  } = useForm();

  const onSubmit = (data: any) => {
    setError("amount", {
      type: "defaultError"
    });
    // dispatch(
    //   postPurchasePoints(
    //     {
    //       purchasePoints: Number(data.amount) * USD_TO_POINTS_CONVERSION_RATE,
    //     },
    //     navigate
    //   )
    // );
  };

  return (
    <>
      <AppHeaderPrivate />
      <div className="background user-manager-purchase-points">
        <Card className="card-style">
          <Typography className="title-style">Purchase Points</Typography>
          <Typography className="text-style">
            Purchase points for employee rewards.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="amount-error">
                <ErrorIcon className="amount-error-icon" />
                <Typography className="amount-error-message">
                  {error}
                </Typography>
              </div>
            )}
            <TextField
              error={errors.amount ? true : false}
              id="outlined-basic"
              label="Preffered Amount"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                )
              }}
              className={
                errors.amount ? "amount-input-with-error" : "amount-input"
              }
              type="number"
              {...register("amount", {
                required: true,
                min: 1
              })}
            />

            {errors.amount?.type === "required" && (
              <Typography className="amount-error-fe">
                Amount is required.
              </Typography>
            )}
            {errors.amount?.type === "min" && (
              <Typography className="amount-error-fe">
                The minimum amount is 1 PTS.
              </Typography>
            )}
            {errors.amount?.type === "defaultError" && (
              <Typography className="amount-error-fe">
                PURCHASE POINTS IS DISABLED.
              </Typography>
            )}
            <Button
              variant="contained"
              className="purchase-points-button"
              disableRipple
              type="submit"
            >
              Purchase Points
            </Button>
          </form>
        </Card>
      </div>
      <AppFooter />
    </>
  );
};

export default UserManagerPurchasePoints;
