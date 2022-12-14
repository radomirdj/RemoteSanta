import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordRequest } from "../../store/auth/actions";
import { getErrorSelector } from "../../store/auth/selectors";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const error = useSelector(getErrorSelector);

    const forgotPassword = () => {
        dispatch(forgotPasswordRequest({ email }));
    }

    return (
        <div className="forgot-password">
            {error && <b className="error">{error}</b>}
            <br />
            <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button variant="contained" onClick={forgotPassword}>Forgot Password</Button>
        </div>

    );
};


export default ForgotPassword;
