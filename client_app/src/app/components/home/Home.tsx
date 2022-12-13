import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelfRequest, logout } from "../../store/auth/actions";
import { getAuthUserSelector } from "../../store/auth/selectors";

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(getAuthUserSelector);

    useEffect(() => {
        dispatch(getSelfRequest());
    }, [dispatch]);

    const userLogout = () => {
        dispatch(logout());
    }

    return (
        <div className="home">
            {user.firstName} , {user.lastName} , {user.email}
            <Button variant="contained" onClick={userLogout}>Logout</Button>
        </div>

    );
};


export default Home;
