import React from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import { Button, Card, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getErrorSelector } from "../../store/orgs/selectors";
import ErrorIcon from "@mui/icons-material/Error";
import { postPurchasePoints } from "../../store/self-signup/actions";
import { useNavigate } from "react-router-dom";

const UserManagerPurchasePoints = () => {
  const error = useSelector(getErrorSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    dispatch(
      postPurchasePoints(
        {
          purchasePoints: Number(data.amount),
        },
        navigate
      )
    );
  };

  return (
    <>
      <AppHeaderPrivate />
      <div className="background user-manager-purchase-points">
        <Card className="card-style">
          <Typography className="title-style">Purchase Points</Typography>
          <Typography className="text-style">
            Discover a seamless way to boost motivation! Here, you can easily
            buy points and receive an invoice. Your team will automatically
            receive points on birthdays and signup bonuses. Our tip: You might
            find 25 USD per employee to be the sweet spot for best outcomes.{" "}
            <br />1 USD is equal to 100 PTS.
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
              label="Preffered Amount "
              variant="outlined"
              placeholder="USD"
              className={
                errors.amount ? "amount-input-with-error" : "amount-input"
              }
              type="number"
              {...register("amount", {
                required: true,
                min: 1,
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
