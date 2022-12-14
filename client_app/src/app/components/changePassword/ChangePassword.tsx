import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordRequest } from "../../store/auth/actions";
import { getErrorSelector } from "../../store/auth/selectors";

const ChangePassword = () => {
    const [password, setPassword] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const error = useSelector(getErrorSelector);

    const changePassword = () => {
        dispatch(changePasswordRequest({ email: email, confirmationCode: confirmationCode, newPassword: password }));
    }

    return (
        <div className="change-password">
            {error && <b className="error">{error}</b>}
            <br />
            <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField id="outlined-basic" label="Confirmation Code" variant="outlined" value={confirmationCode} onChange={(e) => setConfirmationCode(e.target.value)} />
            <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" onClick={changePassword}>Reset Password</Button>
        </div>

    );
};


export default ChangePassword;
