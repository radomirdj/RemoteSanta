import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const ChangePassword = () => {
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    return (
        <div className="change-password">
            <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <TextField id="outlined-basic" label="Confirm Password" variant="outlined" type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
            <Button variant="contained">Reset Password</Button>
        </div>

    );
};


export default ChangePassword;
