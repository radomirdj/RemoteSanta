import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    return (
        <div className="forgot-password">
            <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button variant="contained" >Forgot Password</Button>
        </div>

    );
};


export default ForgotPassword;
