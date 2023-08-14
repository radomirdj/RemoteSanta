import { Box, Button, Grid, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  gridClasses,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizationUserListSelector } from "../../store/orgs/selectors";
import { useNavigate } from "react-router-dom";
import { fetchOrganizationUserList } from "../../store/orgs/actions";
import SparkBlack from "../../assets/icons/spark-black.svg";
import SparkGray from "../../assets/icons/spark-gray.svg";
import GiftCardBlack from "../../assets/icons/gift-card-black-icon.svg";
import GiftCardGray from "../../assets/icons/gift-card-gray-icon.svg";
import ToolbarQuickFilter from "../ToolbarQuickFilter/ToolbarQuickFilter";
import CustomPagination from "../custom-pagination/CustomPagination";
import { getAuthUserSelector } from "../../store/auth/selectors";
import UserDetailsIcon from "../../assets/icons/user-details.svg";
import { UserRole } from "../../enums/UserRole";

const MyTeam = () => {
  const dispatch = useDispatch();
  const orgUserList = useSelector(getOrganizationUserListSelector);
  const rowsPerPage = 7;
  const navigate = useNavigate();
  const userAuth = useSelector(getAuthUserSelector);

  useEffect(() => {
    dispatch(fetchOrganizationUserList());
  }, [dispatch]);

  const userManagerSendPointsRedirect = (userId: string) => {
    navigate(`/my-team-send-points/${userId}`);
  };

  const chooseGiftCardsPeerToPeerRedirect = (
    userId: string,
    countryId: string
  ) => {
    navigate(
      `/choose-gift-card-peer-to-peer?userId=${userId}&countryId=${countryId}`
    );
  };

  const userManagerUserDetailsRedirect = (userId: string) => {
    navigate(`/user-manager-user-details/${userId}`);
  };

  const sendPoints = (params: GridRenderCellParams) => {
    return (
      <Button
        variant="contained"
        className={
          userAuth.userRole === UserRole.USER_MANAGER
            ? "button-send-points"
            : params.id === userAuth.id
            ? "button-disabled"
            : "button-send-points"
        }
        disableRipple
        disabled={
          userAuth.userRole === UserRole.USER_MANAGER
            ? false
            : params.id === userAuth.id
            ? true
            : false
        }
        onClick={() => userManagerSendPointsRedirect(params.id as string)}
      >
        <img
          src={
            userAuth.userRole === UserRole.USER_MANAGER
              ? SparkBlack
              : params.id === userAuth.id
              ? SparkGray
              : SparkBlack
          }
          alt=""
        />
      </Button>
    );
  };

  const sendGiftCards = (params: GridRenderCellParams) => {
    return (
      <Button
        variant="contained"
        className={
          params.id === userAuth.id
            ? "button-disabled"
            : "button-send-gift-cards"
        }
        disableRipple
        disabled={params.id === userAuth.id ? true : false}
        onClick={() =>
          chooseGiftCardsPeerToPeerRedirect(
            params.id as string,
            params.row.countryId as string
          )
        }
      >
        <img
          src={params.id === userAuth.id ? GiftCardGray : GiftCardBlack}
          alt=""
        />
      </Button>
    );
  };

  const detailsButton = (params: GridRenderCellParams) => {
    return (
      <Button
        variant="contained"
        className="button-details"
        disableRipple
        onClick={() => userManagerUserDetailsRedirect(params.id as string)}
      >
        <img src={UserDetailsIcon} alt="" />
      </Button>
    );
  };

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "Firstname", width: 200 },
    { field: "lastName", headerName: "Lastname", width: 200 },
    { field: "email", headerName: "Email", width: 400 },
    {
      field: "sendPoints",
      headerName: "Send Points",
      width: 150,
      sortable: false,
      renderCell: sendPoints,
    },
    {
      field: "sendGiftCards",
      headerName: "Send Gift Cards",
      width: 150,
      sortable: false,
      renderCell: sendGiftCards,
    },
    {
      field: "details",
      headerName: "User Details",
      width: 150,
      sortable: false,
      renderCell: detailsButton,
    },
  ];

  const rows: GridRowsProp = orgUserList.map((orgUser) => {
    return {
      firstName: orgUser.firstName,
      lastName: orgUser.lastName,
      email: orgUser.email,
      id: orgUser.id,
      countryId: orgUser.countryId,
    };
  });

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: "#EDEEC4",
      "&:hover:none, &.Mui-hovered": {
        "@media (hover: none)": {
          backgroundColor: "#EDEEC4",
        },
      },
    },
    [`& .${gridClasses.row}.odd`]: {
      backgroundColor: "#ffffff",
      "&:hover:none, &.Mui-hovered": {
        "@media (hover: none)": {
          backgroundColor: "#ffffff",
        },
      },
    },
  }));

  return (
    <>
      <AppHeaderPrivate />
      <div className="background my-team">
        <Grid
          container
          className={
            userAuth.userRole === UserRole.USER_MANAGER
              ? "grid-style-manager"
              : "grid-style"
          }
        >
          <Grid item xs={12}>
            <Typography className="my-team-title">My Team</Typography>
          </Grid>
          <Box className="box-style">
            <StripedDataGrid
              columnVisibilityModel={{
                details:
                  userAuth.userRole === UserRole.USER_MANAGER ? true : false,
              }}
              rows={rows}
              pagination
              pageSize={rowsPerPage}
              rowsPerPageOptions={[rowsPerPage]}
              columns={columns}
              getRowId={(row: any) => row.id}
              disableDensitySelector
              disableColumnSelector
              disableColumnFilter
              disableColumnMenu
              disableSelectionOnClick
              components={{
                Toolbar: ToolbarQuickFilter,
                Pagination: CustomPagination,
              }}
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              className="data-grid"
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
              }
            />
          </Box>
        </Grid>
      </div>
      <AppFooter />
    </>
  );
};

export default MyTeam;
