import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminOrganizationList } from "../../store/admin-organization/actions";
import { getAdminOrganizationListSelector } from "../../store/admin-organization/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  gridClasses,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import CustomPagination from "../custom-pagination/CustomPagination";
import ToolbarQuickFilter from "../ToolbarQuickFilter/ToolbarQuickFilter";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const AdminOrganizations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminOrganizationList = useSelector(getAdminOrganizationListSelector);
  const rowsPerPage = 7;

  useEffect(() => {
    dispatch(fetchAdminOrganizationList());
  }, [dispatch]);

  const orgDetails = (orgId: string) => {
    navigate(`/admin-organization-details/${orgId}`);
  };

  const detailsButton = (params: GridRenderCellParams) => {
    return (
      <Button
        variant="contained"
        onClick={() => orgDetails(params.id as string)}
        className="button-details"
        disableRipple
      >
        Details
      </Button>
    );
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 500 },
    {
      field: "details",
      headerName: "Details",
      width: 300,
      sortable: false,
      renderCell: detailsButton,
    },
  ];

  const rows: GridRowsProp = adminOrganizationList.map((adminOrganization) => {
    return {
      id: adminOrganization.id,
      name: adminOrganization.name,
      details: "",
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
      <div className="background admin-organizations">
        <Grid container className="grid-style">
          <Grid item xs={12}>
            <Typography className="organizations-title">
              Organizations
            </Typography>
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

export default AdminOrganizations;
