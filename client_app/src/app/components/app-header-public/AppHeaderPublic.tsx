import React from "react";
import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import Logo from './../../assets/logo.svg';
import LogoSmall from './../../assets/logo-small.svg';
import LanguageIcon from './../../assets/icons/language-icon.svg';

const AppHeaderPublic = () => {



    return (
        <AppBar className="app-header-public">
            <Toolbar disableGutters className="toolbar-style">
                <Grid container className="grid-style">
                    <Grid item md={8} sx={{ display: { xs: 'none', sm: 'none', md: 'inline-flex' } }}>
                        <img src={Logo} alt="" />
                    </Grid>
                    <Grid item xs={3} sm={4} sx={{ display: { xs: 'inline-flex', sm: 'inline-flex', md: 'none' } }}>
                        <img src={LogoSmall} alt="" className="logo-small" />
                    </Grid>
                    <Grid item xs={1} sm={2} md={1} className="align-right">
                        <img src={LanguageIcon} alt="" className="header-icon" />
                    </Grid>
                    <Grid item xs={3} sm={2} md={1} className="align-right" >
                        {/*LABELS*/}
                        <Typography className="header-item" >Sign up</Typography>
                    </Grid>
                    <Grid item xs={5} sm={4} md={2} className="align-center">
                        {/*LABELS*/}
                        <Button variant="contained" className="header-button" disableRipple>Request Demo</Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppHeaderPublic;
