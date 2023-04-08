import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";
import {
  adminSendPointsToUser,
  fetchAdminUser,
} from "../../store/admin-organization/actions";
import {
  getAdminUserSelector,
  getErrorSelector,
} from "../../store/admin-organization/selectors";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import GiftIconBlack from "../../assets/icons/gift-icon-black.svg";
import { getOpenDialogSendPointsSelector } from "../../store/orgs/selectors";
import {
  setCloseDialogSendPoints,
  setOpenDialogSendPoints,
} from "../../store/orgs/actions";
import { ISendPointsData } from "../../store/admin-organization/types";
import ErrorIcon from "@mui/icons-material/Error";

const AdminUserSendPoints = () => {
  const params = useParams();
  const userId = params.id as string;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getAdminUserSelector);
  const error = useSelector(getErrorSelector);
  const [sendPointsData, setSendPointsData] = React.useState<ISendPointsData>();
  const open = useSelector(getOpenDialogSendPointsSelector);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const goBack = () => {
    navigate(-1);
  };

  const onSubmit = (data: any) => {
    setSendPointsData(data);
    dispatch(setOpenDialogSendPoints());
  };

  const onConfirm = () => {
    dispatch(
      adminSendPointsToUser(
        {
          userId: user?.id || "",
          orgId: user?.org?.id || "",
          sendPointsData: {
            amount: Number(sendPointsData?.amount) || 0,
            message: sendPointsData?.message || "",
          },
        },
        navigate
      )
    );
  };

  useEffect(() => {
    dispatch(fetchAdminUser({ userId: userId }));
  }, [dispatch, userId]);

  const handleClose = () => {
    dispatch(setCloseDialogSendPoints());
  };

  return (
    <>
      <AppHeaderAdmin />
      <div className="background admin-user-send-points">
        <Card className="card-style">
          <Typography className="title-style">Send some points</Typography>
          <Card className="child-card">
            <Grid container className="grid-container">
              <Grid item xs={4}>
                <span className="column-name">Fullname</span>
              </Grid>
              <Grid item xs={8}>
                {user?.firstName} {user?.lastName}
              </Grid>
            </Grid>
            <Grid container className="grid-container">
              <Grid item xs={4}>
                <span className="column-name">Active PTS</span>
              </Grid>
              <Grid item xs={8}>
                {user?.userBalance?.pointsActive}
              </Grid>
            </Grid>
            <Grid container className="grid-container">
              <Grid item xs={4}>
                <span className="column-name">Email</span>
              </Grid>
              <Grid item xs={8}>
                {user?.email}
              </Grid>
            </Grid>
          </Card>
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
              <Grid item xs={6}>
                <Button
                  disableRipple
                  variant="contained"
                  className="send-points-button"
                  type="submit"
                >
                  <img src={GiftIconBlack} alt="" className="gift-icon-style" />{" "}
                  Send Points
                </Button>
              </Grid>
            </Grid>
          </form>
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
                Please confirm sending points to user.
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
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      </div>
      <AppFooter />
    </>
  );
};

export default AdminUserSendPoints;