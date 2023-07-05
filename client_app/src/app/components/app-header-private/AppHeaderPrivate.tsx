import React from "react";
import {
  AppBar,
  Avatar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Logo from "./../../assets/logo.svg";
import AvatarMale from "./../../assets/avatars/avatar-male.svg";
import AvatarFemale from "./../../assets/avatars/avatar-female.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserSelector } from "../../store/auth/selectors";
import { logout } from "../../store/auth/actions";
import { UserRole } from "../../enums/UserRole";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

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
            md={user.userRole === UserRole.USER_MANAGER ? 5 : 7}
            sx={{ display: { xs: "none", sm: "none", md: "inline-flex" } }}
          >
            <img
              src={Logo}
              alt=""
              className="logo-style"
              onClick={homeRedirect}
            />
          </Grid>

          <Grid item xs={3} sm={2} md={1} className="align-right">
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
          <Grid item xs={3} sm={2} md={1} className="align-left">
            <Typography
              className={
                window.location.pathname === "/demo"
                  ? "header-item-active"
                  : "header-item"
              }
              onClick={demoRedirect}
            >
              Video Tour
            </Typography>
          </Grid>
          {user.userRole === UserRole.USER_MANAGER && (
            <Grid
              item
              sm={2}
              md={2}
              className="align-left"
              sx={{ display: { xs: "none", sm: "inline-flex" } }}
            >
              <Button
                disableRipple
                onClick={handleOpenManagerMenu}
                variant="outlined"
                className="user-manager-button"
                startIcon={<AutoAwesomeIcon />}
              >
                My Company
              </Button>
              <Menu
                sx={{ mt: "45px", width: "600px" }}
                id="menu-appbar-manager"
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
                <MenuItem onClick={userManagerTransactionsRedirect}>
                  <Typography textAlign="center">Balance</Typography>
                </MenuItem>
                <MenuItem onClick={userManagerInvitesRedirect}>
                  <Typography textAlign="center">Invites</Typography>
                </MenuItem>
                <MenuItem onClick={userManagerUsersRedirect}>
                  <Typography textAlign="center">Users</Typography>
                </MenuItem>
              </Menu>
            </Grid>
          )}
          <Grid item xs={3} sm={2} md={1} className="align-left">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="Remy Sharp"
                src={user.gender === "FEMALE" ? AvatarFemale : AvatarMale}
              />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar-user"
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
              <MenuItem onClick={userProfileRedirect}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={userLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeaderPrivate;
