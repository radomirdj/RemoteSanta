import React, { useEffect } from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getErrorSelector,
  getOrganizationSelector,
  getOrganizationUserSelector,
} from "../../store/orgs/selectors";
import { fetchOrganization, fetchOrgUser } from "../../store/orgs/actions";
import { useForm } from "react-hook-form";
import ErrorIcon from "@mui/icons-material/Error";
import { getAuthUserSelector } from "../../store/auth/selectors";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const MyTeamSendPoints = () => {
  const params = useParams();
  const userId = params.id as string;
  const dispatch = useDispatch();
  const userOrg = useSelector(getOrganizationUserSelector);
  const organization = useSelector(getOrganizationSelector);
  const navigate = useNavigate();
  const [pointsToCurrencyMessage, setPointsToCurrencyMessage] =
    React.useState("");
  const error = useSelector(getErrorSelector);
  const userAuth = useSelector(getAuthUserSelector);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    dispatch(fetchOrgUser({ userId: userId }));
    if (userAuth.userRole === "USER_MANAGER") {
      dispatch(fetchOrganization());
    }
  }, [dispatch, userId]);

  const onSubmit = (data: any) => {
    console.log();
  };

  const pointsToCurrency = (points: any) => {
    const conversionRateToPoints =
      userOrg?.org?.country?.conversionRateToPoints || 1;
    const pointsInCurrency = (points * 1.0) / conversionRateToPoints;
    setPointsToCurrencyMessage(
      "This is equal to " +
        pointsInCurrency +
        " " +
        userOrg?.org?.country?.currencyString +
        "."
    );
  };

  const enoughBalance = (amount: number) => {
    if (userAuth.userBalance?.pointsActive) {
      if (amount <= userAuth.userBalance?.pointsActive) {
        return true;
      }
    }
    return false;
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <AppHeaderPrivate />
      <div className="background my-team-send-points">
        <Card className="card-style">
          <Typography className="title-style">
            Send points to {userOrg?.firstName}
          </Typography>
          {userAuth.userRole === "USER_MANAGER" && (
            <Card className="child-card">
              <Grid container className="grid-container">
                <Grid item xs={4}>
                  <span className="column-name">Fullname</span>
                </Grid>
                <Grid item xs={8}>
                  {userOrg?.firstName} {userOrg?.lastName}
                </Grid>
              </Grid>
              <Grid container className="grid-container">
                <Grid item xs={4}>
                  <span className="column-name">Active PTS</span>
                </Grid>
                <Grid item xs={8}>
                  {userOrg?.userBalance?.pointsActive}
                </Grid>
              </Grid>
              <Grid container className="grid-container">
                <Grid item xs={4}>
                  <span className="column-name">Email</span>
                </Grid>
                <Grid item xs={8}>
                  {userOrg?.email}
                </Grid>
              </Grid>
            </Card>
          )}
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
              label="Amount"
              variant="outlined"
              className={
                errors.amount ? "amount-input-with-error" : "amount-input"
              }
              type="number"
              {...register("amount", {
                required: true,
                min: 1,
                validate: enoughBalance,
                onChange: (e) => pointsToCurrency(e.target.value),
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
            {errors.amount?.type === "validate" && (
              <Typography className="amount-error-fe">
                The amount you specified is greater then the amount you have.
              </Typography>
            )}
            <Typography className="points-in-currency-style">
              {pointsToCurrencyMessage}
            </Typography>
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
                required: true,
              })}
            />

            {errors.message?.type === "required" && (
              <Typography className="comment-error-fe">
                Message is required.
              </Typography>
            )}
            <Grid container>
              <Grid item xs={6}>
                <Button
                  disableRipple
                  variant="contained"
                  className="back-button"
                  startIcon={<ChevronLeftIcon className="back-icon" />}
                  onClick={goBack}
                >
                  Back
                </Button>
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
          </form>
        </Card>
      </div>
      <AppFooter />
    </>
  );
};

export default MyTeamSendPoints;
