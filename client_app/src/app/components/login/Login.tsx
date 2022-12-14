import React, { useState } from "react";
import { loginRequest } from "../../store/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { getErrorSelector } from "../../store/auth/selectors";
import AppHeaderPublic from "../app-header-public/AppHeaderPublic";
import AppFooter from "../app-footer/AppFooter";

const Login = () => {
    const dispatch = useDispatch();
    const error = useSelector(getErrorSelector);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        dispatch(loginRequest({ email, password }));
    }



    return (
        <>
            <AppHeaderPublic />
            <div className="background login">
                {
                    // {error && <b className="error">{error}</b>}
                    // <br />
                    // <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                    // <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    // <Button variant="contained" onClick={login}>Login</Button>
                }
            </div>
            <AppFooter />
        </>

    );
};


export default Login;
