import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { loginRequest } from "../../store/auth/actions";
import { useDispatch } from "react-redux";

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        dispatch(loginRequest({ email, password }));
    }

    return (
        <div className="login">
            <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" onClick={login}>Login</Button>
        </div>

    );
};


export default Login;
