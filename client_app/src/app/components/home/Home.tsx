import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelfRequest } from "../../store/auth/actions";
import { getAuthUserSelector } from "../../store/auth/selectors";

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(getAuthUserSelector);

    useEffect(() => {
        dispatch(getSelfRequest());
    }, [dispatch]);

    const logout = () => {

    }

    return (
        <div className="home">
            {user.firstName} , {user.lastName} , {user.email}
            <Button variant="contained" onClick={logout}>Logout</Button>
        </div>

    );
};


export default Home;