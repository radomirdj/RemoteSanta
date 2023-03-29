import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import { fetchOrgUser } from "../../store/orgs/actions";
import { getOrganizationUserSelector } from "../../store/orgs/selectors";
import { Card, Grid, Typography } from "@mui/material";

const UserManagerSendPoints = () => {
  const params = useParams();
  const userId = params.id as string;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getOrganizationUserSelector);

  useEffect(() => {
    dispatch(fetchOrgUser({ userId: userId }));
  }, [dispatch]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <AppHeaderPrivate />
      <div className="background user-manager-send-points">
        <Card className="card-style">
          <Typography className="title-style">Send some points</Typography>
          <Card className="child-card">
            <Grid container className="grid-container">
              <Grid item xs={4}>
                <span className="column-name">Fullname</span>
              </Grid>
              <Grid item xs={8}>
                {user?.firstName} {user?.lastName}
              </Grid>
            </Grid>
            <Grid container className="grid-container">
              <Grid item xs={4}>
                <span className="column-name">Active PTS</span>
              </Grid>
              <Grid item xs={8}>
                {user?.userBalance?.pointsActive}
              </Grid>
            </Grid>
            <Grid container className="grid-container">
              <Grid item xs={4}>
                <span className="column-name">Email</span>
              </Grid>
              <Grid item xs={8}>
                {user?.email}
              </Grid>
            </Grid>
          </Card>
        </Card>
      </div>
      <AppFooter />
    </>
  );
};

export default UserManagerSendPoints;
