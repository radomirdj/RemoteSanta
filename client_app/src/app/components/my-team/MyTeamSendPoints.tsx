import React, { useEffect } from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getErrorSelector,
  getOpenDialogSendPointsSelector,
  getOrganizationSelector,
  getOrganizationUserSelector,
  getPendingSelector,
} from "../../store/orgs/selectors";
import {
  fetchOrganization,
  fetchOrgUser,
  peerSendPointsToUser,
  sendPointsToUser,
  setCloseDialogSendPoints,
  setOpenDialogSendPoints,
} from "../../store/orgs/actions";
import { useForm } from "react-hook-form";
import ErrorIcon from "@mui/icons-material/Error";
import { getAuthUserSelector } from "../../store/auth/selectors";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SparkBlack from "../../assets/icons/spark-black.svg";
import { UserRole } from "../../enums/UserRole";
import { ISendPointsData } from "../../store/admin-organization/types";
import { getSelfRequest } from "../../store/auth/actions";

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
  const open = useSelector(getOpenDialogSendPointsSelector);
  const [selectedRole, setSelectedRole] = React.useState("");
  const pointsActive = userAuth.userBalance?.pointsActive || 0;
  const [sendPointsData, setSendPointsData] = React.useState<ISendPointsData>();
  const conversionRateToPoints =
    userOrg?.org?.country?.conversionRateToPoints || 1;
  const pointsInCurrencyUser = (pointsActive * 1.0) / conversionRateToPoints;
  const pending = useSelector(getPendingSelector);

  const pointsInCurrencyOrganization = organization?.balance
    ? (organization?.balance * 1.0) / conversionRateToPoints
    : 0;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    dispatch(fetchOrgUser({ userId: userId }));
    if (userRole === UserRole.USER_MANAGER) {
      dispatch(fetchOrganization());
    }
    dispatch(getSelfRequest(navigate));
  }, [dispatch, userId]);

  const onSubmit = (data: any) => {
    setSendPointsData(data);
    dispatch(setOpenDialogSendPoints());
  };

  const onConfirm = () => {
    if (selectedRole === "user_manager") {
      dispatch(
        sendPointsToUser(
          {
            userId: userOrg?.id || "",
            sendPointsData: {
              amount: Number(sendPointsData?.amount) || 0,
              message: sendPointsData?.message || "",
            },
          },
          navigate
        )
      );
    } else {
      dispatch(
        peerSendPointsToUser(
          {
            userId: userOrg?.id || "",
            sendPointsData: {
              amount: Number(sendPointsData?.amount) || 0,
              message: sendPointsData?.message || "",
            },
          },
          navigate
        )
      );
    }
  };

  const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value);
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

  const enoughUserBalance = (amount: number) => {
    if (userAuth.userBalance?.pointsActive) {
      if (amount <= userAuth.userBalance?.pointsActive) {
        return true;
      }
    }
    return false;
  };

  const enoughCompanyBalance = (amount: number) => {
    if (organization?.balance) {
      if (amount <= organization?.balance) {
        return true;
      }
    }
    return false;
  };

  const enoughBalance = (amount: number) => {
    if (userRole === UserRole.BASIC_USER || selectedRole === "basic_user") {
      return enoughUserBalance(amount);
    }
    if (selectedRole === "user_manager") {
      return enoughCompanyBalance(amount);
    }
    return true;
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleClose = () => {
    dispatch(setCloseDialogSendPoints());
  };

  return (
    <>
      <AppHeaderPrivate />
      <div className="background my-team-send-points">
        <Card className="card-style">
          <Typography className="title-style">
            Send points to {userOrg?.firstName}
          </Typography>
          <Typography
            className={
              userAuth.userRole === UserRole.USER_MANAGER
                ? "active-amount-manager"
                : "active-amount"
            }
          >
            Your balance is {pointsActive} PTS {"("}
            {pointsInCurrencyUser.toFixed(2)}{" "}
            {userAuth?.org?.country?.currencyString}
            {")"}.
          </Typography>
          {userAuth.userRole === "USER_MANAGER" && (
            <Typography className="active-amount">
              {organization?.name}'s balance is {organization?.balance} PTS{" "}
              {"("}
              {pointsInCurrencyOrganization.toFixed(2)}{" "}
              {userAuth?.org?.country?.currencyString}
              {")"}.
            </Typography>
          )}
          {userAuth.userRole === "USER_MANAGER" && (
            <Card className="child-card">
              <Grid container className="grid-container">
                <Grid item xs={4}>
                  <span className="column-name">Fullname</span>
                </Grid>
                <Grid item xs={8}>
                  <span className="column-value">
                    {userOrg?.firstName} {userOrg?.lastName}
                  </span>
                </Grid>
              </Grid>
              <Grid container className="grid-container">
                <Grid item xs={4}>
                  <span className="column-name">Active PTS</span>
                </Grid>
                <Grid item xs={8}>
                  <span className="column-value">
                    {" "}
                    {userOrg?.userBalance?.pointsActive}
                  </span>
                </Grid>
              </Grid>
              <Grid container className="grid-container">
                <Grid item xs={4}>
                  <span className="column-name">Email</span>
                </Grid>
                <Grid item xs={8}>
                  <span className="column-value"> {userOrg?.email} </span>
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
            {userAuth.userRole === "USER_MANAGER" && (
              <div>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    className={
                      errors.userRole ? "role-input-with-error" : "role-input"
                    }
                  >
                    <FormControlLabel
                      value="basic_user"
                      checked={selectedRole === "basic_user"}
                      control={<Radio />}
                      {...register("userRole", {
                        required: true,
                        onChange: handleChangeRole,
                      })}
                      label={String(`Send as ${userAuth.firstName}`)}
                    />
                    <FormControlLabel
                      value="user_manager"
                      checked={selectedRole === "user_manager"}
                      control={<Radio />}
                      {...register("userRole", {
                        required: true,
                        onChange: handleChangeRole,
                      })}
                      label={String(`Send as ${organization?.name}`)}
                    />
                  </RadioGroup>
                </FormControl>
                {errors.userRole?.type === "required" && (
                  <Typography className="role-error-fe">
                    User role is required.
                  </Typography>
                )}
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
                The amount you specified is greater then your amount.
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
                  variant="outlined"
                  className="back-button"
                  startIcon={<ChevronLeftIcon className="back-icon" />}
                  onClick={goBack}
                >
                  Back
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  disableRipple
                  variant="contained"
                  className="send-points-button"
                  type="submit"
                >
                  <img src={SparkBlack} alt="" className="gift-icon-style" />{" "}
                  Send Points
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title" className="dialog-title">
                    Send Points Confirmation
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      id="alert-dialog-description"
                      className="dialog-text"
                    >
                      Please confirm sending points to {userOrg?.firstName}.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleClose}
                      className="dialog-back-button"
                      variant="outlined"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={onConfirm}
                      autoFocus
                      className="dialog-confirm-button"
                      variant="contained"
                      disabled={pending ? true : false}
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </form>
        </Card>
      </div>
      <AppFooter />
    </>
  );
};

export default MyTeamSendPoints;
