import React from "react";
import { AppBar, Button, Grid, Link, Toolbar, Typography } from "@mui/material";
import Logo from "./../../assets/logo.svg";
import LogoSmall from "./../../assets/logo-small.svg";
import { useNavigate } from "react-router-dom";

const AppHeaderCompanySignup = () => {
  const navigate = useNavigate();

  const loginRedirect = () => {
    navigate("/login");
  };

  const calendlyRedirect = () => {
    window.open(
      "https://calendly.com/radomir-remotesanta/remote-santa-demo",
      "_blank"
    );
  };

  return (
    <AppBar className="app-header-company-signup">
      <Toolbar disableGutters className="toolbar-style">
        <Grid container className="grid-style">
          <Grid
            item
            xs={2}
            md={8}
            sx={{ display: { xs: "none", sm: "none", md: "inline-flex" } }}
          >
            <img src={Logo} alt="" className="logo-style" />
          </Grid>
          <Grid
            item
            xs={2}
            md={8}
            sx={{ display: { xs: "inline-glex", md: "none" } }}
          >
            <img src={LogoSmall} alt="" className="logo-style" />
          </Grid>
          <Grid
            item
            xs={4}
            md={2}
            sx={{ display: { xs: "inline-flex" } }}
            className="login-item"
          >
            <Button
              variant="outlined"
              onClick={loginRedirect}
              disableRipple
              className="login-button"
            >
              Login
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            md={2}
            sx={{ display: { xs: "inline-flex" } }}
            className="demo-item"
          >
            <Button
              variant="contained"
              onClick={calendlyRedirect}
              disableRipple
              className="demo-button"
            >
              Request Demo
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeaderCompanySignup;
