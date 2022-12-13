import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Registration = () => {
    return (
        <div className="registration">
            <TextField id="outlined-basic" label="First name" variant="outlined" />
            <TextField id="outlined-basic" label="Last name" variant="outlined" />
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField id="outlined-basic" label="Password" variant="outlined" type="password" />
            <Button variant="contained">Sign up</Button>
        </div>
    );
};


export default Registration;
