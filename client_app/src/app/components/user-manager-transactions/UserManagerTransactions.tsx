import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrganization,
  fetchOrganizationTransactionList,
} from "../../store/orgs/actions";
import {
  getOrganizationSelector,
  getOrganizationTransactionListSelector,
} from "../../store/orgs/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  gridClasses,
} from "@mui/x-data-grid";
import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";
import ToolbarQuickFilter from "../ToolbarQuickFilter/ToolbarQuickFilter";
import CustomPagination from "../custom-pagination/CustomPagination";

const UserManagerTransactions = () => {
  const dispatch = useDispatch();
  const organization = useSelector(getOrganizationSelector);
  const organizationTransactionList = useSelector(
    getOrganizationTransactionListSelector
  );
  const rowsPerPage = 7;

  useEffect(() => {
    dispatch(fetchOrganization());
    dispatch(fetchOrganizationTransactionList());
  }, [dispatch]);

  const columns: GridColDef[] = [
    { field: "type", headerName: "Type", width: 300 },
    { field: "createdAt", headerName: "Created At", width: 200 },
    { field: "event", headerName: "Event", width: 300 },
    { field: "amount", headerName: "Amount", width: 200 },
  ];

  const rows: GridRowsProp = organizationTransactionList.map(
    (organizationTransaction) => {
      return {
        type:
          organizationTransaction.type === "ADMIN_TO_ORG"
            ? "PAYMENT"
            : organizationTransaction.type,
        createdAt: new Date(
          organizationTransaction.createdAt
        ).toLocaleDateString("en-US", {
          day: "numeric",
          year: "numeric",
          month: "short",
        }),
        event: organizationTransaction.event?.title,
        amount: organizationTransaction.totalAmount + " PTS",
        id: organizationTransaction.id,
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
      <AppHeaderPrivate />
      <div className="background user-manager-transactions">
        <Grid container className="grid-style">
          <Grid item xs={6}>
            <Typography className="organization-title">
              {organization?.name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="balance-title">
              Company Balance: {organization?.balance} PTS
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

export default UserManagerTransactions;
