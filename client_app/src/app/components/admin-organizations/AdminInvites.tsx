import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAdminInviteList } from "../../store/admin-organization/actions";
import { getAdminInviteListSelector } from "../../store/admin-organization/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  gridClasses,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ToolbarQuickFilter from "../ToolbarQuickFilter/ToolbarQuickFilter";
import CustomPagination from "../custom-pagination/CustomPagination";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import AddIcon from "@mui/icons-material/Add";

const AdminInvites = () => {
  const params = useParams();
  const orgId = params.id as string;
  const dispatch = useDispatch();
  const adminInviteList = useSelector(getAdminInviteListSelector);
  const rowsPerPage = 7;
  const navigate = useNavigate();

  const resendButton = (params: GridRenderCellParams) => {
    return (
      <IconButton className="resend-button" disableRipple>
        <ForwardToInboxIcon className="resend-icon" />
      </IconButton>
    );
  };

  const goBack = () => {
    navigate(-1);
  };

  const cancelButton = (params: GridRenderCellParams) => {
    return (
      <IconButton className="cancel-button" disableRipple>
        <DeleteOutlineIcon className="cancel-icon" />
      </IconButton>
    );
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", width: 550 },
    {
      field: "resend",
      headerName: "Resend",
      width: 125,
      sortable: false,
      renderCell: resendButton,
    },
    {
      field: "cancel",
      headerName: "Cancel",
      width: 125,
      sortable: false,
      renderCell: cancelButton,
    },
  ];

  const rows: GridRowsProp = adminInviteList.map((adminInvite) => {
    return {
      email: adminInvite.email,
      resend: "",
      cancel: "",
      id: adminInvite.id,
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

  useEffect(() => {
    dispatch(fetchAdminInviteList({ organizationId: orgId }));
  }, [dispatch, orgId]);
  return (
    <>
      <AppHeaderAdmin />
      <div className="background admin-invites">
        <Grid container className="grid-style">
          <Grid item xs={6}>
            <Typography className="invites-title">Invites</Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              disableRipple
              variant="contained"
              className="add-button"
              startIcon={<AddIcon className="add-icon" />}
            >
              Add new invite
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

export default AdminInvites;
