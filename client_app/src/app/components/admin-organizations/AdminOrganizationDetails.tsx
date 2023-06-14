import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAdminOrganizationTransactionList } from "../../store/admin-organization-transaction/actions";
import { getAdminOrganizationTransactionListSelector } from "../../store/admin-organization-transaction/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  gridClasses,
} from "@mui/x-data-grid";
import styled from "@emotion/styled";
import { Box, Button, Grid, Typography } from "@mui/material";
import ToolbarQuickFilter from "../ToolbarQuickFilter/ToolbarQuickFilter";
import CustomPagination from "../custom-pagination/CustomPagination";
import { fetchAdminOrganization } from "../../store/admin-organization/actions";
import { getAdminOrganizationSelector } from "../../store/admin-organization/selectors";
import { Add } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const AdminOrganizationDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const adminOrganizationTransactionList = useSelector(
    getAdminOrganizationTransactionListSelector
  );
  const navigate = useNavigate();
  const organization = useSelector(getAdminOrganizationSelector);
  const orgId = params.id as string;
  const rowsPerPage = 7;

  useEffect(() => {
    dispatch(fetchAdminOrganizationTransactionList({ organizationId: orgId }));
    dispatch(fetchAdminOrganization({ organizationId: orgId }));
  }, [dispatch]);

  const goBack = () => {
    navigate(-1);
  };

  const adminToOrgRedirect = () => {
    navigate("/admin-to-org-transaction");
  };

  const orgToEmployeeRedirect = () => {
    navigate("/org-to-employee-transaction");
  };

  const adminInvitesRedirect = () => {
    navigate(`/admin-invites/${orgId}`);
  };

  const adminUsersRedirect = () => {
    navigate(`/admin-users/${orgId}`);
  };

  const columns: GridColDef[] = [
    { field: "type", headerName: "Type", width: 300 },
    { field: "createdAt", headerName: "Created At", width: 200 },
    { field: "event", headerName: "Event", width: 300 },
    { field: "amount", headerName: "Amount", width: 200 },
  ];

  const rows: GridRowsProp = adminOrganizationTransactionList.map(
    (adminOrganizationTransaction) => {
      return {
        type: adminOrganizationTransaction.type,
        createdAt: new Date(
          adminOrganizationTransaction.createdAt
        ).toLocaleDateString("en-US", {
          day: "numeric",
          year: "numeric",
          month: "short",
        }),
        event:
          adminOrganizationTransaction.event?.title &&
          adminOrganizationTransaction.event?.title
            ? adminOrganizationTransaction.event?.title +
              " - validTo: " +
              new Date(
                adminOrganizationTransaction.event?.validTo
                  ? adminOrganizationTransaction.event?.validTo
                  : ""
              ).toLocaleDateString("en-US", {
                day: "numeric",
                year: "numeric",
                month: "short",
              })
            : "",
        amount: adminOrganizationTransaction.totalAmount + " PTS",
        id: adminOrganizationTransaction.id,
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
      <div className="background admin-organization-details">
        <Grid container className="grid-style">
          <Grid item xs={6}>
            <Typography className="organization-title">
              {organization?.name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              disableRipple
              className="users-button"
              onClick={adminInvitesRedirect}
            >
              Invites
            </Button>
            <Button
              variant="contained"
              disableRipple
              className="users-button"
              onClick={adminUsersRedirect}
            >
              Users
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Typography className="balance-title">
              Balance: {organization?.balance} PTS
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Button
              variant="contained"
              disableRipple
              startIcon={<Add />}
              className="add-button"
              onClick={adminToOrgRedirect}
            >
              Admin to Org
            </Button>
            <Button
              variant="contained"
              disableRipple
              startIcon={<Add />}
              className="add-button"
              onClick={orgToEmployeeRedirect}
            >
              Org to Employees
            </Button>
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

export default AdminOrganizationDetails;
