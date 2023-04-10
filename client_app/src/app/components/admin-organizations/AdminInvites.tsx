import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  cancelAdminInvite,
  fetchAdminInviteList,
  fetchAdminOrganization,
  postAdminInvite,
  setCloseDialog,
  setCloseModal,
  setOpenDialog,
  setOpenModal,
} from "../../store/admin-organization/actions";
import {
  getAdminInviteListSelector,
  getAdminOrganizationSelector,
  getErrorSelector,
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
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ToolbarQuickFilter from "../ToolbarQuickFilter/ToolbarQuickFilter";
import CustomPagination from "../custom-pagination/CustomPagination";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { getEmailRegex } from "../../utils/Utils";
import {
  getOpenDialogSelector,
  getOpenModalSelector,
} from "../../store/user-invites/selectors";
import { UserRole } from "../../enums/UserRole";
import ErrorIcon from "@mui/icons-material/Error";

const AdminInvites = () => {
  const params = useParams();
  const orgId = params.id as string;
  const dispatch = useDispatch();
  const error = useSelector(getErrorSelector);
  const adminInviteList = useSelector(getAdminInviteListSelector);
  const rowsPerPage = 7;
  const navigate = useNavigate();
  const open = useSelector(getOpenModalSelector);
  const handleOpenSendInvite = () => {
    clearErrors();
    resetField("email");
    dispatch(setOpenModal());
  };
  const handleCloseSendInvite = () => {
    clearErrors();
    resetField("email");
    dispatch(setCloseModal());
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    resetField,
  } = useForm();
  const organization = useSelector(getAdminOrganizationSelector);
  const openDialog = useSelector(getOpenDialogSelector);
  const [idToCancel, setIdToCancel] = React.useState("");
  const handleOpenCancelInvite = (id: string) => {
    setIdToCancel(id);
    dispatch(setOpenDialog());
  };
  const handleCloseCancelInivte = () => {
    dispatch(setCloseDialog());
  };

  useEffect(() => {
    dispatch(fetchAdminInviteList({ organizationId: orgId }));
    dispatch(fetchAdminOrganization({ organizationId: orgId }));
  }, [dispatch, orgId]);

  const onSubmitInvite = (data: any) => {
    dispatch(
      postAdminInvite({
        orgId: orgId,
        inviteData: { email: data.email, userRole: data.userRole },
      })
    );
  };

  const onCancelInvite = () => {
    dispatch(
      cancelAdminInvite({
        inviteId: idToCancel,
        orgId: orgId,
      })
    );
  };

  const goBack = () => {
    navigate(-1);
  };

  const cancelButton = (params: GridRenderCellParams) => {
    return (
      <IconButton
        className="cancel-button"
        disableRipple
        onClick={() => handleOpenCancelInvite(params.id as string)}
      >
        <DeleteOutlineIcon className="cancel-icon" />
      </IconButton>
    );
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", width: 550 },
    {
      field: "cancel",
      headerName: "Cancel",
      width: 125,
      sortable: false,
      renderCell: cancelButton,
    },
  ];

  const rows: GridRowsProp = adminInviteList
    .filter((adminInvite) => adminInvite.status === "ACTIVE")
    .map((adminInvite) => {
      return {
        email: adminInvite.email,
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

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const userRoles = [
    { value: UserRole.BASIC_USER, label: "Basic User" },
    { value: UserRole.USER_MANAGER, label: "User Manager" },
  ];

  return (
    <>
      <AppHeaderAdmin />
      <div className="background admin-invites">
        <Grid container className="grid-style">
          <Grid item xs={6}>
            <Typography className="invites-title">
              Invites - {organization?.name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              disableRipple
              variant="contained"
              className="add-button"
              onClick={handleOpenSendInvite}
              startIcon={<AddIcon className="add-icon" />}
            >
              Add new invite
            </Button>
            <Modal
              open={open}
              onClose={handleCloseSendInvite}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Card sx={style}>
                <Typography
                  className={
                    error ? "send-invite-title-error" : "send-invite-title"
                  }
                >
                  Send an invite
                </Typography>
                {error && (
                  <div className="invite-error">
                    <ErrorIcon className="invite-error-icon" />
                    <Typography className="invite-error-message">
                      {error}
                    </Typography>
                  </div>
                )}
                <form onSubmit={handleSubmit(onSubmitInvite)}>
                  <TextField
                    error={errors.email ? true : false}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    className={
                      errors.email ? "email-input-with-error" : "email-input"
                    }
                    {...register("email", {
                      required: true,
                      pattern: getEmailRegex(),
                    })}
                  />
                  {errors.email?.type === "required" && (
                    <Typography className="invite-error-fe">
                      Email is required.
                    </Typography>
                  )}
                  {errors.email?.type === "pattern" && (
                    <Typography className="invite-error-fe">
                      Email should be an email.
                    </Typography>
                  )}
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="userRoleLabel" className="user-role-label">
                      User Role
                    </InputLabel>
                    <Select
                      labelId="userRoleLabel"
                      label="User Role"
                      id="role"
                      className={
                        errors.userRole
                          ? "user-role-input-with-error"
                          : "user-role-input"
                      }
                      {...register("userRole", { required: true })}
                      MenuProps={MenuProps}
                    >
                      {userRoles.map((role, i) => {
                        return (
                          <MenuItem value={role.value} key={role.value}>
                            {role.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  {errors.userRole?.type === "required" && (
                    <Typography className="invite-error-fe">
                      User role is required.
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    className="send-invite-button"
                    disableRipple
                    type="submit"
                  >
                    Send invite
                  </Button>
                </form>
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
        <Dialog
          open={openDialog}
          onClose={handleCloseCancelInivte}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className="dialog-title">
            Cancel invite
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              className="dialog-text"
            >
              Are you sure you want to cancel the invite?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseCancelInivte}
              className="dialog-back-button"
              variant="outlined"
            >
              Back
            </Button>
            <Button
              onClick={onCancelInvite}
              autoFocus
              className="dialog-confirm-button"
              variant="contained"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <AppFooter />
    </>
  );
};

export default AdminInvites;
