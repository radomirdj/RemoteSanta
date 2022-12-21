import {
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmailToResetPasswordSelector,
  getErrorSelector,
} from "../../store/auth/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPublic from "../app-header-public/AppHeaderPublic";
import ErrorIcon from "@mui/icons-material/Error";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getPasswordRegex } from "../../utils/Utils";
import {
  changePasswordRequest,
  forgotPasswordRequest,
} from "../../store/auth/actions";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const error = useSelector(getErrorSelector);
  const emailToResetPassword = useSelector(getEmailToResetPasswordSelector);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const resetPassword = (data: any) => {
    dispatch(
      changePasswordRequest({
        email: emailToResetPassword || "",
        confirmationCode: data.confirmationCode,
        newPassword: data.newPassword,
      })
    );
    navigate("/change-password-success");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const getConfirmationCode = (data: any) => {
    dispatch(forgotPasswordRequest({ email: emailToResetPassword || "" }));
  };

  return (
    <>
      <AppHeaderPublic />
      <div className="background change-password">
        <Grid container className="grid-style">
          <Grid item xs={10} sm={6} md={4} lg={4} xl={3}>
            <Card className="change-password-card">
              <form onSubmit={handleSubmit(resetPassword)}>
                {/*LABELS */}
                <Typography
                  className={
                    error
                      ? "change-password-title-with-error"
                      : "change-password-title"
                  }
                >
                  Reset Password
                  <Typography
                    className="change-password-resend-email"
                    onClick={getConfirmationCode}
                  >
                    Didn't get an email? <u>Resend</u>
                  </Typography>
                </Typography>
                {error && (
                  <div className="change-password-error">
                    <ErrorIcon className="change-password-error-icon" />
                    <Typography className="change-password-error-message">
                      {error}
                    </Typography>
                  </div>
                )}
                <TextField
                  error={errors.confirmationCode ? true : false}
                  id="outlined-basic"
                  label="Confirmation Code"
                  variant="outlined"
                  className={
                    errors.confirmationCode
                      ? "change-password-input-with-error"
                      : "change-password-input"
                  }
                  {...register("confirmationCode", {
                    required: true,
                  })}
                />
                {/*LABELS */}
                {errors.confirmationCode?.type === "required" && (
                  <Typography className="change-password-error-fe">
                    Confirmation code is required.
                  </Typography>
                )}
                <FormControl variant="outlined">
                  {/*LABELS */}
                  <InputLabel htmlFor="outlined-password">
                    New Password
                  </InputLabel>
                  <OutlinedInput
                    error={errors.newPassword ? true : false}
                    id="outlined-password"
                    className={
                      errors.newPassword
                        ? "change-password-input-with-error"
                        : "change-password-input"
                    }
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="New Password"
                    {...register("newPassword", {
                      required: true,
                      pattern: getPasswordRegex(),
                    })}
                  />
                  {/*LABELS */}
                  {errors.newPassword?.type === "required" && (
                    <Typography className="change-password-error-fe">
                      Password is required.
                    </Typography>
                  )}
                  {/*LABELS */}
                  {errors.newPassword?.type === "pattern" && (
                    <Typography className="change-password-error-fe">
                      Password must contain at least 8 characters and at least 1
                      lowercase letter, 1 uppercase letter and 1 number.
                    </Typography>
                  )}
                </FormControl>
                <Button
                  variant="contained"
                  className="change-password-button"
                  disableRipple
                  type="submit"
                >
                  Reset Password
                </Button>
              </form>
            </Card>
          </Grid>
        </Grid>
      </div>
      <AppFooter />
    </>
  );
};

export default ChangePassword;
