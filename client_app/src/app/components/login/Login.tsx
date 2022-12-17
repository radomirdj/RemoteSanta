import React from "react";
import { loginRequest } from "../../store/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { getErrorSelector } from "../../store/auth/selectors";
import AppHeaderPublic from "../app-header-public/AppHeaderPublic";
import AppFooter from "../app-footer/AppFooter";
import { Button, Card, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ErrorIcon from '@mui/icons-material/Error';
import { useForm } from "react-hook-form";
import { getEmailRegex, getPasswordRegex } from "./../../utils/Utils";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(getErrorSelector);
    const [showPassword, setShowPassword] = React.useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit = (data: any) => {
        dispatch(loginRequest(data));
    };

    const signUpRedirect = () => {
        navigate("/signup");
    }

    const forgotPasswordRedirect = () => {
        navigate("/forgot-password");
    }

    return (
        <>
            <AppHeaderPublic />
            <div className="background login">
                <Grid container className="grid-style">
                    <Grid item xs={10} sm={6} md={4} lg={4} xl={3}>
                        <Card className="login-card">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/*LABELS */}
                                <Typography className="login-title">Sign in</Typography>
                                {/*LABELS */}
                                {error && <div className="login-error"><ErrorIcon className="login-error-icon" /><Typography className="login-error-message">{error}</Typography></div>
                                }
                                <TextField error={error || errors.email ? true : false}
                                    id="outlined-basic" label="Email"
                                    variant="outlined"
                                    className={errors.email ? "email-input-with-error" : "email-input"}
                                    {...register("email", { required: true, pattern: getEmailRegex() })} />
                                {/*LABELS */}
                                {errors.email?.type === "required" && <Typography className="login-error-fe">Email is required.</Typography>}
                                {/*LABELS */}
                                {errors.email?.type === "pattern" && <Typography className="login-error-fe">Email should be an email.</Typography>}
                                <FormControl variant="outlined" >
                                    {/*LABELS */}
                                    <InputLabel htmlFor="outlined-password">Password</InputLabel>
                                    <OutlinedInput
                                        error={error || errors.password ? true : false}
                                        id="outlined-password"
                                        type={showPassword ? 'text' : 'password'}
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
                                        {...register("password", { required: true, pattern: getPasswordRegex() })}
                                    />
                                    {/*LABELS */}
                                    {errors.password?.type === "required" && <Typography className="login-error-fe">Password is required.</Typography>}
                                    {/*LABELS */}
                                    {errors.password?.type === "pattern" && <Typography className="login-error-fe">Password must contain at least 8 characters and at least 1 lowerace letter, 1 uppercase letter and 1 number.</Typography>}
                                </FormControl>
                                {/*LABELS */}
                                <Typography className="login-forgot-password" onClick={forgotPasswordRedirect}>Forgot Password?</Typography>
                                {/*LABELS */}
                                <Button variant="contained" className="login-button" disableRipple type="submit" > Sign in</Button>
                                {/*LABELS */}
                                <Typography className="login-no-account" onClick={signUpRedirect} >Don't have an account? <u>Register now</u></Typography>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <AppFooter />
        </>

    );
};


export default Login;
