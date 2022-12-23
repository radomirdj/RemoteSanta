import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelfRequest, logout } from "../../store/auth/actions";
import { getAuthUserSelector } from "../../store/auth/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSelfRequest());
  }, [dispatch]);

  return (
    <>
      <AppHeaderPrivate />
      <div className="background home">
        {/* {user.firstName} , {user.lastName} , {user.email}*/}
      </div>
      <AppFooter />
    </>
  );
};

export default Home;
