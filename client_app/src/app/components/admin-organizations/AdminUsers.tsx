import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAdminOrganization,
  fetchAdminUserList,
} from "../../store/admin-organization/actions";
import {
  getAdminOrganizationSelector,
  getAdminUserListSelector,
} from "../../store/admin-organization/selectors";
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
import UserDetailsIcon from "../../assets/icons/user-details.svg";
import GiftIconBlack from "../../assets/icons/gift-icon-black.svg";

const AdminUsers = () => {
  const params = useParams();
  const orgId = params.id as string;
  const dispatch = useDispatch();
  const adminUserList = useSelector(getAdminUserListSelector);
  const rowsPerPage = 7;
  const navigate = useNavigate();
  const organization = useSelector(getAdminOrganizationSelector);

  useEffect(() => {
    dispatch(fetchAdminUserList({ organizationId: orgId }));
    dispatch(fetchAdminOrganization({ organizationId: orgId }));
  }, [dispatch, orgId]);

  const goBack = () => {
    navigate(-1);
  };

  const adminUserDetailsRedirect = (userId: string) => {
    navigate(`/admin-user-details/${userId}`);
  };

  const adminSendPointsRedirect = (userId: string) => {
    navigate(`/admin-user-send-points/${userId}`);
  };

  const detailsButton = (params: GridRenderCellParams) => {
    return (
      <Button
        variant="contained"
        className="button-details"
        disableRipple
        onClick={() => adminUserDetailsRedirect(params.id as string)}
      >
        <img src={UserDetailsIcon} alt="" />
      </Button>
    );
  };

  const sendPoints = (params: GridRenderCellParams) => {
    return (
      <Button
        variant="contained"
        className="button-send-points"
        disableRipple
        onClick={() => adminSendPointsRedirect(params.id as string)}
      >
        <img src={GiftIconBlack} alt="" />
      </Button>
    );
  };

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "Firstname", width: 200 },
    { field: "lastName", headerName: "Lastname", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "userRole", headerName: "Role", width: 200 },
    {
      field: "sendPoints",
      headerName: "Send Points",
      width: 150,
      sortable: false,
      renderCell: sendPoints,
    },
    {
      field: "details",
      headerName: "Details",
      width: 150,
      sortable: false,
      renderCell: detailsButton,
    },
  ];

  const rows: GridRowsProp = adminUserList.map((adminUser) => {
    return {
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      email: adminUser.email,
      userRole: adminUser.userRole,
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
            <Typography className="users-title">
              Users - {organization?.name}
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
