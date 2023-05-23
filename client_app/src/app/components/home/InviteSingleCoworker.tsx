import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getEmailRegex } from "../../utils/Utils";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelUserInvite,
  fetchUserInviteList,
  postUserInvite,
  setCloseDialog,
  setOpenDialog,
} from "../../store/user-invites/actions";
import { fetchOrganization } from "../../store/orgs/actions";
import { getOrganizationSelector } from "../../store/orgs/selectors";
import { UserRole } from "../../enums/UserRole";
import {
  getErrorSelector,
  getOpenDialogSelector,
  getUserInviteListSelector,
} from "../../store/user-invites/selectors";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  gridClasses,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomPagination from "../custom-pagination/CustomPagination";
import ErrorIcon from "@mui/icons-material/Error";
import CheckIcon from "@mui/icons-material/Check";
import { getCompletementStepsSelector } from "../../store/self-signup/selectors";
import { postCompletementSteps } from "../../store/self-signup/actions";

const InviteSingleCoworker = () => {
  const rowsPerPage = 3;
  const navigate = useNavigate();
  const organization = useSelector(getOrganizationSelector);
  const userInviteList = useSelector(getUserInviteListSelector);
  const dispatch = useDispatch();
  const error = useSelector(getErrorSelector);
  const openDialog = useSelector(getOpenDialogSelector);
  const [idToCancel, setIdToCancel] = React.useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
    clearErrors,
  } = useForm();
  const activeInviteList = userInviteList.filter((userInvite) => {
    if (userInvite.status !== "ACTIVE") return false;
    return true;
  });
  const completementStepList = useSelector(getCompletementStepsSelector);
  const allStepsIdMap = new Map<string, string>();
  completementStepList.forEach((completedStep) => {
    allStepsIdMap.set(completedStep.name, completedStep.id);
  });

  useEffect(() => {
    dispatch(fetchOrganization());
    dispatch(fetchUserInviteList({ organizationId: organization?.id || "" }));
    resetField("email");
    clearErrors();
  }, [dispatch]);

  const onSubmit = (data: any) => {
    dispatch(
      postUserInvite({
        orgId: organization?.id || "",
        inviteData: { email: data.email, userRole: UserRole.BASIC_USER },
      })
    );
    resetField("email");
    clearErrors();
  };

  const goBack = () => {
    navigate(-1);
  };

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

  const handleOpenCancelInvite = (id: string) => {
    setIdToCancel(id);
    dispatch(setOpenDialog());
  };

  const handleCloseCancelInivte = () => {
    dispatch(setCloseDialog());
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

  const rows: GridRowsProp = userInviteList
    .filter((userInvite) => userInvite.status === "ACTIVE")
    .map((userInvite) => {
      return {
        email: userInvite.email,
        cancel: "",
        id: userInvite.id,
      };
    });

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", width: 340 },
    {
      field: "cancel",
      headerName: "Cancel",
      width: 100,
      sortable: false,
      renderCell: cancelButton,
    },
  ];

  const onCancelInvite = () => {
    dispatch(
      cancelUserInvite({
        inviteId: idToCancel,
        organizationId: organization?.id || "",
      })
    );
  };

  const markAsCompletedSingleInvite = () => {
    dispatch(
      postCompletementSteps({
        stepId: allStepsIdMap.get("INVITE_EMPLOYEES"),
        completementStepStatus: { completed: true },
      })
    );
  };

  return (
    <>
      <AppHeaderPrivate />
      <div className="background invite-single-coworker">
        <Card className="card-style">
          <Typography className="title-style">Add Coworkers</Typography>
          <Typography className="text-style">
            Invite your coworkers and they will receive registration link to
            join the comunity!
          </Typography>
          {error && (
            <div className="invite-error">
              <ErrorIcon className="invite-error-icon" />
              <Typography className="invite-error-message">{error}</Typography>
            </div>
          )}
          <Card className="child-card">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container>
                <Grid item xs={9}>
                  <TextField
                    error={errors.email ? true : false}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    className="email-input"
                    {...register("email", {
                      required: true,
                      pattern: getEmailRegex(),
                    })}
                  />
                  {errors.email?.type === "required" && (
                    <Typography className="text-error-fe">
                      Email is required.
                    </Typography>
                  )}

                  {errors.email?.type === "pattern" && (
                    <Typography className="text-error-fe">
                      Email should be an email.
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    className="add-coworker-button"
                    disableRipple
                    type="submit"
                    startIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                </Grid>
                {activeInviteList.length > 0 && (
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
                        params.indexRelativeToCurrentPage % 2 === 0
                          ? "even"
                          : "odd"
                      }
                    />
                  </Box>
                )}
              </Grid>
            </form>
          </Card>
          <Grid container>
            <Grid item xs={6}>
              <Button
                disableRipple
                variant="outlined"
                className="back-button"
                onClick={goBack}
              >
                Back to Home
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                className="mark-as-completed-button"
                disableRipple
                type="submit"
                startIcon={<CheckIcon />}
                onClick={markAsCompletedSingleInvite}
              >
                Mark as completed
              </Button>
            </Grid>
          </Grid>
        </Card>
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

export default InviteSingleCoworker;
