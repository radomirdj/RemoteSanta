import { Avatar, Card, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserSelector } from "../../store/auth/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import AvatarMale from "./../../assets/avatars/avatar-male.svg";
import AvatarFemale from "./../../assets/avatars/avatar-female.svg";
import { useNavigate } from "react-router-dom";
import { getSelfRequest } from "../../store/auth/actions";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(getAuthUserSelector);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSelfRequest(navigate));
  }, [dispatch]);

  return (
    <>
      <AppHeaderPrivate />
      <div className="background user-profile">
        <Grid container className="grid-style">
          <Grid item xs={10} sm={6} md={4}>
            <Card className="user-profile-card">
              <form>
                <TextField
                  id="outlined-basic"
                  label="Firstname"
                  variant="outlined"
                  className="user-profile-input"
                  disabled
                  value={user.firstName}
                />
                <TextField
                  id="outlined-basic"
                  label="Lastname"
                  variant="outlined"
                  className="user-profile-input"
                  disabled
                  value={user.lastName}
                />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  className="user-profile-input"
                  disabled
                  value={user.email}
                />
                <TextField
                  id="outlined-basic"
                  label="Gender"
                  variant="outlined"
                  className="user-profile-input"
                  disabled
                  value={user.gender}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Basic example"
                    value={user.birthDate}
                    onChange={(newValue) => {
                      console.log();
                    }}
                    disabled
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </form>
            </Card>
          </Grid>
        </Grid>
      </div>
      <AppFooter />
    </>
  );
};

export default UserProfile;
