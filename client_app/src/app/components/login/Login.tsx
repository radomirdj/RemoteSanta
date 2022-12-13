import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Login = () => {
    return (
        <div className="login">
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField id="outlined-basic" label="Password" variant="outlined" type="password" />
            <Button variant="contained">Login</Button>
        </div>

    );
};


export default Login;
