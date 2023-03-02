import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { clearError, signUpRequest } from "../../store/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { getErrorSelector } from "../../store/auth/selectors";
import {
  Card,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPublic from "../app-header-public/AppHeaderPublic";
import { useForm, Controller } from "react-hook-form";
import { createUTCDate, getPasswordRegex } from "./../../utils/Utils";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import PrivacyPolicy from "./../../assets/documents/PrivacyPolicy.pdf";
import TermsOfUse from "./../../assets/documents/Terms&Conditions.pdf";

const Registration = () => {
  const dispatch = useDispatch();
  const error = useSelector(getErrorSelector);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const queryParameters = new URLSearchParams(window.location.search);
  const code = queryParameters.get("code");

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: any) => {
    const birthDate = createUTCDate(
      data.birthDate.$y,
      data.birthDate.$M,
      data.birthDate.$D
    );

    dispatch(
      signUpRequest(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          code: code || "",
          password: data.password,
          birthDate,
          gender: data.gender,
        },
        navigate
      )
    );
  };

  const loginRedirect = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="background registration">
        <AppHeaderPublic />
        <Grid container className="grid-style">
          <Grid item xs={10} sm={6} md={4}>
            <Card className="registration-card">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Typography
                  className={
                    error
                      ? "registration-title-with-error"
                      : "registration-title"
                  }
                >
                  Sign up
                </Typography>
                {error && (
                  <div className="registration-error">
                    <ErrorIcon className="registration-error-icon" />
                    <Typography className="registration-error-message">
                      {error}
                    </Typography>
                  </div>
                )}

                <TextField
                  id="outlined-basic"
                  error={errors.firstName ? true : false}
                  label="Firstname"
                  variant="outlined"
                  className={
                    errors.firstName
                      ? "registration-input-with-error"
                      : "registration-input"
                  }
                  {...register("firstName", { required: true })}
                />

                {errors.firstName?.type === "required" && (
                  <Typography className="registration-error-fe">
                    Firstname is required.
                  </Typography>
                )}

                <TextField
                  id="outlined-basic"
                  error={errors.lastName ? true : false}
                  label="Lastname"
                  variant="outlined"
                  className={
                    errors.lastName
                      ? "registration-input-with-error"
                      : "registration-input"
                  }
                  {...register("lastName", { required: true })}
                />

                {errors.lastName?.type === "required" && (
                  <Typography className="registration-error-fe">
                    Lastname is required.
                  </Typography>
                )}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    control={control}
                    name="birthDate"
                    defaultValue={null}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <DatePicker
                        label="Date of birth"
                        disableFuture
                        value={field.value}
                        onChange={(date) => field.onChange(date)}
                        className={
                          errors.birthDate
                            ? "registration-date-with-error"
                            : "registration-input"
                        }
                        renderInput={(params: any) => <TextField {...params} />}
                      />
                    )}
                  />
                </LocalizationProvider>

                {errors.birthDate?.type === "required" && (
                  <Typography className="registration-error-fe">
                    Date of birth is required.
                  </Typography>
                )}

                <FormControl variant="outlined">
                  <InputLabel id="genderLabel">Gender</InputLabel>
                  <Select
                    labelId="genderLabel"
                    id="gender"
                    className={
                      errors.gender
                        ? "registration-gender-with-error"
                        : "registration-input"
                    }
                    label="Gender"
                    {...register("gender", { required: true })}
                  >
                    <MenuItem value={"FEMALE"}>Female</MenuItem>
                    <MenuItem value={"MALE"}>Male</MenuItem>
                    <MenuItem value={"OTHER"}>Other</MenuItem>
                  </Select>
                </FormControl>

                {errors.gender?.type === "required" && (
                  <Typography className="registration-error-fe">
                    Gender is required.
                  </Typography>
                )}
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-password">Password</InputLabel>
                  <OutlinedInput
                    error={errors.password ? true : false}
                    id="outlined-password"
                    className={
                      errors.password
                        ? "registration-input-with-error"
                        : "registration-input"
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
                    label="Password"
                    {...register("password", {
                      required: true,
                      pattern: getPasswordRegex(),
                    })}
                  />

                  {errors.password?.type === "required" && (
                    <Typography className="registration-error-fe">
                      Password is required.
                    </Typography>
                  )}

                  {errors.password?.type === "pattern" && (
                    <Typography className="registration-error-fe">
                      Password must contain at least 8 characters and at least 1
                      lowercase letter, 1 uppercase letter and 1 number.
                    </Typography>
                  )}
                </FormControl>
                <Button
                  variant="contained"
                  className="registration-button"
                  disableRipple
                  type="submit"
                >
                  Sign up
                </Button>
                <Typography className="registration-terms">
                  By signing up, you agree to our{" "}
                  <a href={TermsOfUse} target="_blank">
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a href={PrivacyPolicy} target="_blank">
                    Privacy Policy
                  </a>
                  .
                </Typography>
                <Divider />
                <Typography className="registration-have-account">
                  Already have an account?{" "}
                  <b className="registration-link" onClick={loginRedirect}>
                    Login
                  </b>
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

export default Registration;
