import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AppFooter from "../app-footer/AppFooter";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import { deleteOrgUser, fetchOrgUser } from "../../store/orgs/actions";
import { getOrganizationUserSelector } from "../../store/orgs/selectors";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const UserManagerUserDetails = () => {
  const params = useParams();
  const userId = params.id as string;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getOrganizationUserSelector);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchOrgUser({ userId: userId }));
  }, [dispatch]);

  const goBack = () => {
    navigate(-1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDeleteUser = () => {
    dispatch(
      deleteOrgUser(
        {
          userId: user?.id || "",
        },
        navigate
      )
    );
  };

  return (
    <>
      <AppHeaderPrivate />
      <div className="background user-manager-user-details">
        <Card className="card-style">
          <Typography className="title-style">User Details</Typography>
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
                <span className="column-name">Reserved PTS</span>
              </Grid>
              <Grid item xs={8}>
                {user?.userBalance?.pointsReserved}
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
          <Grid container>
            <Grid item xs={6}>
              <Button
                disableRipple
                variant="contained"
                className="back-button"
                startIcon={<ChevronLeftIcon className="back-icon" />}
                onClick={goBack}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                disableRipple
                variant="contained"
                className="delete-button"
                startIcon={<DeleteOutlineIcon />}
                onClick={handleClickOpen}
              >
                Delete
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title" className="dialog-title">
                  Delete User
                </DialogTitle>
                <DialogContent>
                  <DialogContentText
                    id="alert-dialog-description"
                    className="dialog-text"
                  >
                    Are you sure you want to delete the user?
                    <div className="warning">
                      <ErrorIcon className="warning-icon" />
                      <Typography className="warning-message">
                        By deleting this user, the active points will be
                        transferred to the company.
                      </Typography>
                    </div>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    className="dialog-back-button"
                    variant="outlined"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={onDeleteUser}
                    autoFocus
                    className="dialog-confirm-button"
                    variant="contained"
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Card>
      </div>
      <AppFooter />
    </>
  );
};

export default UserManagerUserDetails;
function getOrgUserSelector(state: unknown): unknown {
  throw new Error("Function not implemented.");
}
