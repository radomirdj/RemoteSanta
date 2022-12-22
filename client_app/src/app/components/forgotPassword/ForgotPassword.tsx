import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordRequest } from "../../store/auth/actions";
import { getErrorSelector } from "../../store/auth/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPublic from "../app-header-public/AppHeaderPublic";
import ErrorIcon from "@mui/icons-material/Error";
import { getEmailRegex } from "../../utils/Utils";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(getErrorSelector);
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();

  const getConfirmationCode = (data: any) => {
    dispatch(forgotPasswordRequest({ email: data.email }, navigate));
  };

  const loginRedirect = () => {
    navigate("/login");
  };

  return (
    <>
      <AppHeaderPublic />
      <div className="background forgot-password">
        <Grid container className="grid-style">
          <Grid item xs={10} sm={6} md={4}>
            <Card className="forgot-password-card">
              <form onSubmit={handleSubmit(getConfirmationCode)}>
                {/*LABELS */}
                <Typography
                  className={
                    error
                      ? "forgot-password-title-with-error"
                      : "forgot-password-title"
                  }
                >
                  Forgot Password
                </Typography>
                {error && (
                  <div className="forgot-password-error">
                    <ErrorIcon className="forgot-password-error-icon" />
                    <Typography className="forgot-password-error-message">
                      {error}
                    </Typography>
                  </div>
                )}
                <TextField
                  error={errors.email ? true : false}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  className={
                    errors.email
                      ? "forgot-password-input-with-error"
                      : "forgot-password-input"
                  }
                  {...register("email", {
                    required: true,
                    pattern: getEmailRegex()
                  })}
                />
                {/*LABELS */}
                {errors.email?.type === "required" && (
                  <Typography className="forgot-password-error-fe">
                    Email is required.
                  </Typography>
                )}
                {/*LABELS */}
                {errors.email?.type === "pattern" && (
                  <Typography className="forgot-password-error-fe">
                    Email should be an email.
                  </Typography>
                )}
                <Button
                  variant="contained"
                  className="get-confirmation-code-button"
                  disableRipple
                  type="submit"
                >
                  Get Confirmation Code
                </Button>
                <Typography
                  className="forgot-password-login"
                  onClick={loginRedirect}
                >
                  or <u>Login</u>
                </Typography>
              </form>
            </Card>
          </Grid>
        </Grid>
      </div>
      <AppFooter />
    </>
  );
};

export default ForgotPassword;
