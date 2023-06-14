import { Card, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserSelector } from "../../store/auth/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import { useNavigate } from "react-router-dom";
import { getSelfRequest } from "../../store/auth/actions";
import { createBirthdayFromUTCString } from "../../utils/Utils";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(getAuthUserSelector);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSelfRequest(navigate));
  }, [dispatch]);

  if (user.birthDate) {
    const birthDate = new Date(user.birthDate || "");
    console.log(
      birthDate,
      user.birthDate,
      birthDate.getUTCDate(),
      birthDate.getUTCMonth() + 1,
      birthDate.getUTCHours()
    );
  }

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
                {user.birthDate && (
                  <TextField
                    id="outlined-basic"
                    label="Date of Birth"
                    variant="outlined"
                    className="user-profile-input"
                    disabled
                    value={createBirthdayFromUTCString(user.birthDate || "")}
                  />
                )}
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
