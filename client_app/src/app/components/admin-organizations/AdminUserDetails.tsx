import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";
import { Button, Card, Divider, Typography } from "@mui/material";
import { fetchAdminUser } from "../../store/admin-organization/actions";
import { getAdminUserSelector } from "../../store/admin-organization/selectors";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const AdminUserDetails = () => {
  const params = useParams();
  const userId = params.id as string;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getAdminUserSelector);

  const goBack = () => {
    navigate(-1);
  };

  console.log(user);

  useEffect(() => {
    dispatch(fetchAdminUser({ userId: userId }));
  }, [dispatch]);

  return (
    <>
      <AppHeaderAdmin />
      <div className="background admin-user-details">
        <Card className="card-style">
          <Typography className="title-style">User Details</Typography>
          <Typography className="info-style">
            Fullname: {user?.firstName} {user?.lastName}
          </Typography>
          <Typography className="info-style">
            Active points: {user?.userBalance?.pointsActive}
          </Typography>
          <Typography className="info-style">
            Reserved points: {user?.userBalance?.pointsReserved}
          </Typography>
          <Typography className="info-style">Email: {user?.email}</Typography>
          <div className="warning">
            <ErrorIcon className="warning-icon" />
            <Typography className="warning-message">
              By deleting this user, the active points will be transferred to
              the company.
            </Typography>
          </div>
          <div className="delete-div">
            <Button
              disableRipple
              variant="contained"
              className="delete-button"
              startIcon={<DeleteOutlineIcon />}
            >
              Delete
            </Button>
          </div>
          <div className="back-div">
            <Button
              disableRipple
              variant="text"
              className="back-button"
              startIcon={<ChevronLeftIcon className="back-icon" />}
              onClick={goBack}
            >
              Back
            </Button>
          </div>
        </Card>
      </div>
      <AppFooter />
    </>
  );
};

export default AdminUserDetails;
