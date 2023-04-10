import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganization } from "../../store/orgs/actions";
import { getOrganizationSelector } from "../../store/orgs/selectors";
import {
  cancelUserInvite,
  fetchUserInviteList,
  postUserInvite,
  setCloseDialog,
  setCloseModal,
  setOpenDialog,
  setOpenModal,
} from "../../store/user-invites/actions";
import {
  getErrorSelector,
  getOpenDialogSelector,
  getOpenModalSelector,
  getUserInviteListSelector,
} from "../../store/user-invites/selectors";
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ToolbarQuickFilter from "../ToolbarQuickFilter/ToolbarQuickFilter";
import CustomPagination from "../custom-pagination/CustomPagination";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { getEmailRegex } from "../../utils/Utils";
import { UserRole } from "../../enums/UserRole";
import ErrorIcon from "@mui/icons-material/Error";

const UserManagerInvites = () => {
  const dispatch = useDispatch();
  const organization = useSelector(getOrganizationSelector);
  const userInviteList = useSelector(getUserInviteListSelector);
  const error = useSelector(getErrorSelector);
  const rowsPerPage = 7;
  const open = useSelector(getOpenModalSelector);
  const handleOpenSendInvite = () => {
    resetField("email");
    clearErrors();
    dispatch(setOpenModal());
  };
  const handleCloseSendInvite = () => {
    clearErrors();
    dispatch(setCloseModal());
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
    clearErrors,
  } = useForm();
  const openDialog = useSelector(getOpenDialogSelector);
  const [idToCancel, setIdToCancel] = React.useState("");
  const handleOpenCancelInvite = (id: string) => {
    setIdToCancel(id);
    dispatch(setOpenDialog());
  };
  const handleCloseCancelInvite = () => dispatch(setCloseDialog());

  useEffect(() => {
    dispatch(fetchOrganization());
    dispatch(fetchUserInviteList({ organizationId: organization?.id || "" }));
  }, [dispatch]);

  const onSubmitInvite = (data: any) => {
    dispatch(
      postUserInvite({
        orgId: organization?.id || "",
        inviteData: { email: data.email, userRole: data.userRole },
      })
    );
  };

  const onCancelInvite = () => {
    dispatch(
      cancelUserInvite({
        inviteId: idToCancel,
        organizationId: organization?.id || "",
      })
    );
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

  const rows: GridRowsProp = userInviteList
    .filter((userInvite) => userInvite.status === "ACTIVE")
    .map((userInvite) => {
      return {
        email: userInvite.email,
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
              onClick={handleOpenSendInvite}
              startIcon={<AddIcon />}
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
        </Grid>
        <Dialog
          open={openDialog}
          onClose={handleCloseCancelInvite}
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
              onClick={handleCloseCancelInvite}
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

export default UserManagerInvites;
