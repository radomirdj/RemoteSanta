import React from "react";
import { AppBar, Grid, Toolbar } from "@mui/material";
import Logo from "./../../assets/logo.svg";

const AppHeaderPublic = () => {
  return (
    <AppBar className="app-header-public">
      <Toolbar disableGutters className="toolbar-style">
        <Grid container className="grid-style">
          <Grid item md={8} sx={{ display: { xs: "inline-flex" } }}>
            <img src={Logo} alt="" className="logo-style" />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeaderPublic;
