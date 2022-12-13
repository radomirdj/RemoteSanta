import React, { useRef, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { signUpRequest } from "../../store/auth/actions";
import { useDispatch } from "react-redux";

const Registration = () => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const register = () => {
        dispatch(signUpRequest({ firstName, lastName, email, password }));
    }

    return (
        <div className="registration">
            <TextField id="outlined-basic" label="First name" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <TextField id="outlined-basic" label="Last name" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" onClick={register}>Sign up</Button>
        </div>
    );
};


export default Registration;
