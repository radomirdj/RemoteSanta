import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { signUpRequest } from "../../store/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { getErrorSelector } from "../../store/auth/selectors";
import {
  Card,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography
} from "@mui/material";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPublic from "../app-header-public/AppHeaderPublic";
import { useForm, Controller } from "react-hook-form";
import { getEmailRegex, getPasswordRegex } from "./../../utils/Utils";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";

const Registration = () => {
  const dispatch = useDispatch();
  const error = useSelector(getErrorSelector);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control
  } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: any) => {
    const birthDate = new Date(
      Date.UTC(data.birthDate.$y, data.birthDate.$M, data.birthDate.$D, 0, 0, 0)
    );
    dispatch(
      signUpRequest(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          birthDate,
          gender: data.gender
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
                {/*LABELS */}
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
                {/*LABELS */}
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
                {/*LABELS */}
                {errors.firstName?.type === "required" && (
                  <Typography className="registration-error-fe">
                    Firstname is required.
                  </Typography>
                )}
                {/*LABELS */}
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
                {/*LABELS */}
                {errors.lastName?.type === "required" && (
                  <Typography className="registration-error-fe">
                    Lastname is required.
                  </Typography>
                )}
                {/*LABELS */}
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
                        onChange={date => field.onChange(date)}
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
                {/*LABELS */}
                {errors.birthDate?.type === "required" && (
                  <Typography className="registration-error-fe">
                    Date of birth is required.
                  </Typography>
                )}
                {/*LABELS */}
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
                {/*LABELS */}
                {errors.gender?.type === "required" && (
                  <Typography className="registration-error-fe">
                    Gender is required.
                  </Typography>
                )}
                {/*LABELS */}
                <TextField
                  error={errors.email ? true : false}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  className={
                    errors.email
                      ? "registration-input-with-error"
                      : "registration-input"
                  }
                  {...register("email", {
                    required: true,
                    pattern: getEmailRegex()
                  })}
                />
                {/*LABELS */}
                {errors.email?.type === "required" && (
                  <Typography className="registration-error-fe">
                    Email is required.
                  </Typography>
                )}
                {/*LABELS */}
                {errors.email?.type === "pattern" && (
                  <Typography className="registration-error-fe">
                    Email should be an email.
                  </Typography>
                )}
                <FormControl variant="outlined">
                  {/*LABELS */}
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
                      pattern: getPasswordRegex()
                    })}
                  />
                  {/*LABELS */}
                  {errors.password?.type === "required" && (
                    <Typography className="registration-error-fe">
                      Password is required.
                    </Typography>
                  )}
                  {/*LABELS */}
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
                <Typography
                  className="registration-have-account"
                  onClick={loginRedirect}
                >
                  Already have an account? <u>Login</u>
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
