import { Box, Button, Grid, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminGiftCardRequestList } from "../../store/admin-gift-card-requests/actions";
import { getAdminGiftCardRequestListSelector } from "../../store/admin-gift-card-requests/selectors";
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
import { useNavigate } from "react-router-dom";

const AdminGiftCardRequests = () => {
  const dispatch = useDispatch();
  const rowsPerPage = 7;
  const navigate = useNavigate();
  const adminGiftCardRequestList = useSelector(
    getAdminGiftCardRequestListSelector
  );

  useEffect(() => {
    dispatch(fetchAdminGiftCardRequestList());
  }, [dispatch]);

  const giftCardRequestDetails = (giftCardRequestId: string) => {
    navigate(`/admin-gift-card-request-details/${giftCardRequestId}`);
  };

  const detailsButton = (params: GridRenderCellParams) => {
    return (
      <Button
        variant="contained"
        onClick={() => giftCardRequestDetails(params.id as string)}
        className="button-details"
        disableRipple
      >
        Details
      </Button>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 400 },
    { field: "integration", headerName: "Integration", width: 200 },
    { field: "amount", headerName: "Amount", width: 200 },
    { field: "createdAt", headerName: "Created At", width: 200 },
    {
      field: "details",
      headerName: "Details",
      width: 200,
      sortable: false,
      renderCell: detailsButton,
    },
  ];

  const rows: GridRowsProp = adminGiftCardRequestList.map(
    (adminGiftCardRequest) => {
      return {
        id: adminGiftCardRequest.id,
        integration: adminGiftCardRequest.giftCardIntegration.title,
        amount: adminGiftCardRequest.amount + " PTS",
        createdAt: new Date(adminGiftCardRequest.createdAt)
          .toLocaleDateString()
          .replaceAll("/", "."),
        details: "",
      };
    }
  );

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
      <div className="background admin-gift-card-requests">
        <Grid container className="grid-style">
          <Grid item xs={12}>
            <Typography className="gift-card-requests-title">
              Gift Card Requests
            </Typography>
          </Grid>
          <Box className="box-style">
            <StripedDataGrid
              rows={rows}
              pagination
              pageSize={rowsPerPage}
              getRowId={(row: any) => row.id}
              rowsPerPageOptions={[rowsPerPage]}
              columns={columns}
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

export default AdminGiftCardRequests;
