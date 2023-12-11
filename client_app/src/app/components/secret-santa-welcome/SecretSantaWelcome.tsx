import React, { useEffect, useMemo } from "react";
import AppFooter from "../app-footer/AppFooter";
import Logo from "./../../assets/logo.svg";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { secretSantaTrial } from "../../store/orgs/actions";

const SecretSantaWelcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const homeRedirect = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(secretSantaTrial());
  }, []);

  return (
    <>
      <div className="background secret-santa-welcome">
        <img
          src={Logo}
          alt=""
          className="secret-santa-logo"
          onClick={homeRedirect}
        />
        <Grid container className="grid-style">
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}>
            <Typography className="secret-santa-title">
              Thank You for Joining Secret Santa Fun!
            </Typography>
            <Typography className="secret-santa-text">
              Keep an eye on your inbox to discover who your Secret Santa
              recipient is and make their holiday extra special! Here's a sneak
              peek of what to expect:
            </Typography>
            <Typography className="secret-santa-text-bold">
              1. Discover Your Secret Santa <br />
              2. Location-based Gift Card Offers <br />
              3. Present Reveal Party
            </Typography>
          </Grid>
        </Grid>
      </div>
      <AppFooter />
    </>
  );
};

export default SecretSantaWelcome;
