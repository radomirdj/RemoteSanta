import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganizationUserList } from "../../store/orgs/actions";
import { getOrganizationUserListSelector } from "../../store/orgs/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  gridClasses,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { Box, Button, Grid, Typography } from "@mui/material";
import ToolbarQuickFilter from "../ToolbarQuickFilter/ToolbarQuickFilter";
import CustomPagination from "../custom-pagination/CustomPagination";
import { useNavigate } from "react-router-dom";

const UserManagerUsers = () => {
  const dispatch = useDispatch();
  const orgUserList = useSelector(getOrganizationUserListSelector);
  const rowsPerPage = 7;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrganizationUserList());
  }, [dispatch]);

  const userManagerUserDetailsRedirect = (userId: string) => {
    navigate(`/user-manager-user-details/${userId}`);
  };

  const detailsButton = (params: GridRenderCellParams) => {
    return (
      <Button
        variant="contained"
        className="button-details"
        disableRipple
        onClick={() => userManagerUserDetailsRedirect(params.id as string)}
      >
        Details
      </Button>
    );
  };

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "Firstname", width: 250 },
    { field: "lastName", headerName: "Lastname", width: 250 },
    { field: "email", headerName: "Email", width: 300 },
  ];

  const rows: GridRowsProp = orgUserList.map((orgUser) => {
    return {
      firstName: orgUser.firstName,
      lastName: orgUser.lastName,
      email: orgUser.email,
      id: orgUser.id,
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
      <div className="background user-manager-users">
        <Grid container className="grid-style">
          <Grid item xs={12}>
            <Typography className="users-title">Users</Typography>
          </Grid>
          <Box className="box-style">
            <StripedDataGrid
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

export default UserManagerUsers;
