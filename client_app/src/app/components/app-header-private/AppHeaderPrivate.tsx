import React from "react";
import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Logo from "./../../assets/logo.svg";
import LogoSmall from "./../../assets/logo-small.svg";
import UserManager from "./../../assets/icons/user-manager.svg";
import AvatarMale from "./../../assets/avatars/avatar-male.svg";
import AvatarFemale from "./../../assets/avatars/avatar-female.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserSelector } from "../../store/auth/selectors";
import { logout } from "../../store/auth/actions";
import { UserRole } from "../../enums/UserRole";

const AppHeaderPrivate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getAuthUserSelector);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElManager, setAnchorElManager] =
    React.useState<null | HTMLElement>(null);

  const userLogout = () => {
    dispatch(logout(navigate));
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenManagerMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElManager(event.currentTarget);
  };

  const handleCloseManagerMenu = () => {
    setAnchorElManager(null);
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

  const userManagerTransactionsRedirect = () => {
    navigate("/user-manager-transactions");
  };

  const userManagerInvitesRedirect = () => {
    navigate("/user-manager-invites");
  };

  const userManagerUsersRedirect = () => {
    navigate("/user-manager-users");
  };

  return (
    <AppBar className="app-header-private">
      <Toolbar disableGutters className="toolbar-style">
        <Grid container className="grid-style">
          <Grid
            item
            md={user.userRole === UserRole.USER_MANAGER ? 6 : 7}
            sx={{ display: { xs: "none", sm: "none", md: "inline-flex" } }}
          >
            <img src={Logo} alt="" />
          </Grid>
          <Grid
            item
            xs={3}
            sm={user.userRole === UserRole.USER_MANAGER ? 6 : 7}
            sx={{
              display: { xs: "inline-flex", sm: "inline-flex", md: "none" },
            }}
          >
            <img src={LogoSmall} alt="" className="logo-small" />
          </Grid>
          <Grid item xs={2} sm={2} md={1} className="align-right">
            {/*LABELS*/}
            <Typography
              className={
                window.location.pathname === "/"
                  ? "header-item-active"
                  : "header-item"
              }
              onClick={homeRedirect}
            >
              Home
            </Typography>
          </Grid>
          <Grid item xs={3} sm={2} md={2} className="align-center">
            {/*LABELS*/}
            <Typography
              className={
                window.location.pathname === "/my-gift-cards"
                  ? "header-item-active"
                  : "header-item"
              }
              onClick={myGiftCardsRedirect}
            >
              My Gift Cards
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={1} className="align-left">
            {/*LABELS*/}
            <Typography
              className={
                window.location.pathname === "/demo"
                  ? "header-item-active"
                  : "header-item"
              }
              onClick={demoRedirect}
            >
              Demo
            </Typography>
          </Grid>
          {user.userRole === UserRole.USER_MANAGER && (
            <Grid item xs={2} sm={2} md={1} className="align-left">
              <IconButton
                onClick={handleOpenManagerMenu}
                sx={{ p: 0 }}
                disableRipple
              >
                <img src={UserManager} alt="" className="user-manager-icon" />
              </IconButton>
              <Menu
                sx={{ mt: "45px", width: "600px" }}
                id="menu-appbar"
                anchorEl={anchorElManager}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElManager)}
                onClose={handleCloseManagerMenu}
              >
                {/*LABELS*/}
                <MenuItem onClick={handleCloseManagerMenu}>
                  <Typography
                    textAlign="center"
                    onClick={userManagerTransactionsRedirect}
                  >
                    Transactions
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={userManagerInvitesRedirect}
                  >
                    Invites
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={userManagerUsersRedirect}
                  >
                    Users
                  </Typography>
                </MenuItem>
              </Menu>
            </Grid>
          )}
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
                <Typography textAlign="center">Language</Typography>
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
