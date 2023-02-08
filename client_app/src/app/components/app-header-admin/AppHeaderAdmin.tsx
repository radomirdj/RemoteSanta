import React from "react";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import Logo from "./../../assets/logo.svg";
import LogoSmall from "./../../assets/logo-small.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/actions";

const AppHeaderAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogout = () => {
    dispatch(logout(navigate));
  };

  const adminHomeRedirect = () => {
    navigate("/admin-home");
  };

  const adminOrganizationsRedirect = () => {
    navigate("/admin-organizations");
  };

  return (
    <AppBar className="app-header-admin">
      <Toolbar disableGutters className="toolbar-style">
        <Grid container className="grid-style">
          <Grid
            item
            md={6}
            sx={{ display: { xs: "none", sm: "none", md: "inline-flex" } }}
          >
            <img src={Logo} alt="" className="logo-style" />
          </Grid>
          <Grid
            item
            xs={1}
            sm={2}
            sx={{
              display: { xs: "inline-flex", sm: "inline-flex", md: "none" },
            }}
          >
            <img src={LogoSmall} alt="" className="logo-small" />
          </Grid>
          <Grid item xs={4} sm={4} md={2} className="align-right">
            {/*LABELS*/}
            <Typography
              className={
                window.location.pathname === "/admin-home"
                  ? "header-item-active"
                  : "header-item"
              }
              onClick={adminHomeRedirect}
            >
              Gift Card Requests
            </Typography>
          </Grid>
          <Grid item xs={5} sm={2} md={2} className="align-center">
            {/*LABELS*/}
            <Typography
              className={
                window.location.pathname === "/admin-organizations"
                  ? "header-item-active"
                  : "header-item"
              }
              onClick={adminOrganizationsRedirect}
            >
              Organizations
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={1} className="align-left">
            {/*LABELS*/}
            <Typography className="header-item" onClick={userLogout}>
              Logout
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeaderAdmin;
