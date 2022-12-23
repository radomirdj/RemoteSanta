import React from "react";
import { AppBar, Grid, Toolbar } from "@mui/material";

const AppHeaderPrivate = () => {
  return (
    <AppBar className="app-header-private">
      <Toolbar disableGutters className="toolbar-style">
        <Grid container className="grid-style"></Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeaderPrivate;
