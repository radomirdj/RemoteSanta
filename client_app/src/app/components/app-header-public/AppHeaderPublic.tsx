import React from "react";
import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import Logo from "./../../assets/logo.svg";
import LogoSmall from "./../../assets/logo-small.svg";
import LanguageIcon from "./../../assets/icons/language-icon.svg";
import { useNavigate } from "react-router-dom";

const AppHeaderPublic = () => {
  const navigate = useNavigate();

  const signUpRedirect = () => {
    navigate("/signup");
  };

  const loginRedirect = () => {
    navigate("/login");
  };

  return (
    <AppBar className="app-header-public">
      <Toolbar disableGutters className="toolbar-style">
        <Grid container className="grid-style">
          <Grid
            item
            md={8}
            sx={{ display: { xs: "none", sm: "none", md: "inline-flex" } }}
          >
            <img src={Logo} alt="" />
          </Grid>
          <Grid
            item
            xs={3}
            sm={4}
            sx={{
              display: { xs: "inline-flex", sm: "inline-flex", md: "none" },
            }}
          >
            <img src={LogoSmall} alt="" className="logo-small" />
          </Grid>
          <Grid item xs={1} sm={2} md={1} className="align-right">
            {window.location.pathname !== "/verify-email" && (
              <img src={LanguageIcon} alt="" className="header-icon" />
            )}
          </Grid>
          <Grid item xs={3} sm={2} md={1} className="align-right">
            {/*LABELS*/}
            {window.location.pathname === "/login" && (
              <Typography className="header-item" onClick={signUpRedirect}>
                Sign up
              </Typography>
            )}
            {/*LABELS*/}
            {window.location.pathname === "/signup" && (
              <Typography className="header-item" onClick={loginRedirect}>
                Sign in
              </Typography>
            )}
          </Grid>
          <Grid item xs={5} sm={4} md={2} className="align-center">
            {/*LABELS*/}
            {window.location.pathname !== "/verify-email" && (
              <Button
                variant="contained"
                className="header-button"
                disableRipple
              >
                Request Demo
              </Button>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeaderPublic;
