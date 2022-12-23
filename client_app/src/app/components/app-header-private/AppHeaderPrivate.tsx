import React from "react";
import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Logo from "./../../assets/logo.svg";
import LogoSmall from "./../../assets/logo-small.svg";
import AvatarMale from "./../../assets/avatars/avatar-male.svg";
import AvatarFemale from "./../../assets/avatars/avatar-female.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserSelector } from "../../store/auth/selectors";
import { logout } from "../../store/auth/actions";

const AppHeaderPrivate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getAuthUserSelector);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const userLogout = () => {
    dispatch(logout());
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const homeRedirect = () => {
    navigate("/");
  };

  const myGiftCardsRedirect = () => {
    navigate("/my-gift-cards");
  };

  const demoRedirect = () => {
    navigate("/demo");
  };

  const userProfileRedirect = () => {
    navigate("/user-profile");
  };

  const historyRedirect = () => {
    navigate("/history");
  };

  return (
    <AppBar className="app-header-private">
      <Toolbar disableGutters className="toolbar-style">
        <Grid container className="grid-style">
          <Grid
            item
            md={7}
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
          <Grid item xs={2} sm={2} md={1} className="align-right">
            {/*LABELS*/}
            <Typography className="header-item" onClick={homeRedirect}>
              Home
            </Typography>
          </Grid>
          <Grid item xs={3} sm={2} md={2} className="align-center">
            {/*LABELS*/}
            <Typography className="header-item" onClick={myGiftCardsRedirect}>
              My Gift Cards
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={1} className="align-left">
            {/*LABELS*/}
            <Typography className="header-item" onClick={demoRedirect}>
              Demo
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={1} className="align-left">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="Remy Sharp"
                src={user.gender === "FEMALE" ? AvatarFemale : AvatarMale}
              />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/*LABELS*/}
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={userProfileRedirect}>
                  Profile
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={historyRedirect}>
                  History
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={userLogout}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeaderPrivate;
