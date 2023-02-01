import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganization } from "../../store/orgs/actions";
import { getOrganizationSelector } from "../../store/orgs/selectors";
import { fetchUserInviteList } from "../../store/user-invites/actions";
import { getUserInviteListSelector } from "../../store/user-invites/selectors";
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
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import ToolbarQuickFilter from "../ToolbarQuickFilter/ToolbarQuickFilter";
import CustomPagination from "../custom-pagination/CustomPagination";
import AddIcon from "@mui/icons-material/Add";

const UserManagerInvites = () => {
  const dispatch = useDispatch();
  const organization = useSelector(getOrganizationSelector);
  const userInviteList = useSelector(getUserInviteListSelector);
  const rowsPerPage = 7;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(fetchOrganization());
    dispatch(fetchUserInviteList({ organizationId: organization?.id || "" }));
  }, [dispatch]);

  const resendButton = (params: GridRenderCellParams) => {
    return (
      <IconButton className="resend-button" disableRipple>
        <ForwardToInboxIcon className="resend-icon" />
      </IconButton>
    );
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

  const rows: GridRowsProp = userInviteList.map((userInvite) => {
    return {
      email: userInvite.email,
      resend: "",
      cancel: "",
      id: userInvite.id,
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #ffffff",
    borderRadius: "24px",
    p: 4,
  };

  return (
    <>
      <AppHeaderPrivate />
      <div className="background user-manager-invites">
        <Grid container className="grid-style">
          <Grid item xs={6}>
            <Typography className="invites-title">Invites</Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              disableRipple
              variant="contained"
              className="add-button"
              onClick={handleOpen}
              startIcon={<AddIcon />}
            >
              Add new invite
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Card sx={style}>
                <Typography variant="h5">Send an invite</Typography>
              </Card>
            </Modal>
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

export default UserManagerInvites;
