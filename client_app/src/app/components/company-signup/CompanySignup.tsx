import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { getEmailRegex, getPasswordRegex } from "../../utils/Utils";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderCompanySignup from "../app-header-public/AppHeaderCompanySignup";
import LogoSmall from "./../../assets/logo-small.svg";
import PrivacyPolicy from "./../../assets/documents/PrivacyPolicy.pdf";
import TermsOfUse from "./../../assets/documents/Terms&Conditions.pdf";
import { useDispatch, useSelector } from "react-redux";
import { selfSignUpRequest } from "../../store/self-signup/actions";
import { useNavigate } from "react-router-dom";
import { getErrorSelector } from "../../store/self-signup/selectors";
import ErrorIcon from "@mui/icons-material/Error";
import { countryList } from "../../enums/CountryList";

const CompanySignup = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const error = useSelector(getErrorSelector);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data.country);
    dispatch(
      selfSignUpRequest(
        {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          orgName: data.companyName,
          countryId: data.country
        },
        navigate
      )
    );
  };

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <AppHeaderCompanySignup />
      <div className="background company-signup">
        <Grid container className="grid-style">
          <Grid item xs={10} sm={6} md={4}>
            <Card className="company-signup-card">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Typography className="company-signup-title">
                  Welcome to{" "}
                  <img src={LogoSmall} alt="" className="logo-style" />
                </Typography>
                <Typography className="company-signup-helper-text">
                  Create Account
                </Typography>
                {error && (
                  <div className="signup-error">
                    <ErrorIcon className="signup-error-icon" />
                    <Typography className="signup-error-message">
                      {error}
                    </Typography>
                  </div>
                )}
                <TextField
                  error={errors.companyName ? true : false}
                  id="outlined-basic"
                  label="Company/Team Name"
                  variant="outlined"
                  className={
                    errors.companyName
                      ? "company-name-input-with-error"
                      : "company-name-input"
                  }
                  {...register("companyName", {
                    required: true
                  })}
                />

                {errors.companyName?.type === "required" && (
                  <Typography className="signup-error-fe">
                    Company/Team Name is required.
                  </Typography>
                )}
                <Grid container>
                  <Grid item xs={6} className="first-name-item">
                    <TextField
                      error={errors.firstName ? true : false}
                      id="outlined-basic"
                      label="Firstname"
                      variant="outlined"
                      className={
                        errors.firstName
                          ? "first-name-input-with-error"
                          : "first-name-input"
                      }
                      {...register("firstName", {
                        required: true
                      })}
                    />

                    {errors.firstName?.type === "required" && (
                      <Typography className="signup-error-fe">
                        Firstname is required.
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} className="last-name-item">
                    <TextField
                      error={errors.lastName ? true : false}
                      id="outlined-basic"
                      label="Lastname"
                      variant="outlined"
                      className={
                        errors.firstName
                          ? "last-name-input-with-error"
                          : "last-name-input"
                      }
                      {...register("lastName", {
                        required: true
                      })}
                    />

                    {errors.lastName?.type === "required" && (
                      <Typography className="signup-error-lastname-fe">
                        Lastname is required.
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <FormControl variant="outlined">
                  <InputLabel id="countryLabel">Your Country</InputLabel>
                  <Select
                    labelId="countryLabel"
                    id="country"
                    className={
                      errors.country
                        ? "country-input-with-error"
                        : "country-input"
                    }
                    label="Country"
                    {...register("country", { required: true })}
                  >
                    {countryList.map((country, i) => {
                      return (
                        <MenuItem value={country.id} key={country.id}>
                          {/* {country.countryName !== "Other" && (
                            <img
                              src={country.flag}
                              alt=""
                              style={{
                                marginRight: "8px",
                                height: "24px",
                                width: "40px",
                                verticalAlign: "sub",
                              }}
                            />
                          )}{" "} */}
                          {country.flagEmoji + " " + country.countryName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {errors.country?.type === "required" && (
                  <Typography className="signup-error-fe">
                    Country is required.
                  </Typography>
                )}
                <TextField
                  error={errors.email ? true : false}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  className={
                    errors.email ? "email-input-with-error" : "email-input"
                  }
                  {...register("email", {
                    required: true,
                    pattern: getEmailRegex()
                  })}
                />

                {errors.email?.type === "required" && (
                  <Typography className="signup-error-fe">
                    Email is required.
                  </Typography>
                )}

                {errors.email?.type === "pattern" && (
                  <Typography className="signup-error-fe">
                    Email should be an email.
                  </Typography>
                )}
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-password">Password</InputLabel>
                  <OutlinedInput
                    error={errors.password ? true : false}
                    id="outlined-password"
                    className={
                      errors.password
                        ? "password-input-with-error"
                        : "password-input"
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

                  {errors.password?.type === "required" && (
                    <Typography className="signup-error-fe">
                      Password is required.
                    </Typography>
                  )}

                  {errors.password?.type === "pattern" && (
                    <Typography className="signup-error-fe">
                      Password must contain at least 8 characters and at least 1
                      lowercase letter, 1 uppercase letter and 1 number.
                    </Typography>
                  )}
                </FormControl>
                <Button
                  variant="contained"
                  className="signup-button"
                  disableRipple
                  type="submit"
                >
                  Sign up
                </Button>
              </form>
              <Typography className="signup-terms">
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
            </Card>
          </Grid>
        </Grid>
      </div>
      <AppFooter />
    </>
  );
};

export default CompanySignup;
