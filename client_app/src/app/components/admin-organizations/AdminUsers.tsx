import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAdminUserList } from "../../store/admin-organization/actions";
import { getAdminUserListSelector } from "../../store/admin-organization/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";
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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const AdminUsers = () => {
  const params = useParams();
  const orgId = params.id as string;
  const dispatch = useDispatch();
  const adminUserList = useSelector(getAdminUserListSelector);
  const rowsPerPage = 7;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAdminUserList({ organizationId: orgId }));
  }, [dispatch, orgId]);

  const goBack = () => {
    navigate(-1);
  };

  const detailsButton = (params: GridRenderCellParams) => {
    return (
      <Button variant="contained" className="button-details" disableRipple>
        Details
      </Button>
    );
  };

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "Firstname", width: 250 },
    { field: "lastName", headerName: "Lastname", width: 250 },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "details",
      headerName: "Details",
      width: 200,
      sortable: false,
      renderCell: detailsButton,
    },
  ];

  const rows: GridRowsProp = adminUserList.map((adminUser) => {
    return {
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      email: adminUser.email,
      details: "",
      id: adminUser.id,
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
      <AppHeaderAdmin />
      <div className="background admin-users">
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
          <Grid item xs={12}>
            <Button
              disableRipple
              variant="text"
              className="back-button"
              startIcon={<ChevronLeftIcon className="back-icon" />}
              onClick={goBack}
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </div>
      <AppFooter />
    </>
  );
};

export default AdminUsers;
