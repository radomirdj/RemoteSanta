import React, { useState } from "react";
import { loginRequest } from "../../store/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { getErrorSelector } from "../../store/auth/selectors";
import AppHeaderPublic from "../app-header-public/AppHeaderPublic";
import AppFooter from "../app-footer/AppFooter";
import { Button, Card, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(getErrorSelector);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const login = () => {
        dispatch(loginRequest({ email, password }));
    }

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
                {
                    // {error && <b className="error">{error}</b>}
                }
                <Grid container className="grid-style">
                    <Grid item xs={10} sm={6} md={4} lg={4} xl={3}>
                        <Card className="login-card">
                            {/*LABELS */}
                            <Typography className="login-title">Sign in</Typography>
                            {/*LABELS */}
                            <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} className="email-input" />
                            <FormControl variant="outlined" >
                                {/*LABELS */}
                                <InputLabel htmlFor="outlined-password">Password</InputLabel>
                                <OutlinedInput
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
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormControl>
                            {/*LABELS */}
                            <Typography className="login-forgot-password" onClick={forgotPasswordRedirect}>Forgot Password?</Typography>
                            {/*LABELS */}
                            <Button variant="contained" onClick={login} className="login-button" disableRipple> Sign in</Button>
                            {/*LABELS */}
                            <Typography className="login-no-account" onClick={signUpRedirect}>Don't have an account? <u>Register now</u></Typography>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <AppFooter />
        </>

    );
};


export default Login;
