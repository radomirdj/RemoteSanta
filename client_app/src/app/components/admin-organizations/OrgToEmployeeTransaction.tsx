import {
  Button,
  Card,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postOrgToEmployeesTransaction } from "../../store/admin-organization-transaction/actions";
import { getAdminOrganizationSelector } from "../../store/admin-organization/selectors";
import { fetchClaimPointsEventList } from "../../store/claim-points-event/actions";
import { getClaimPointsEventListSelector } from "../../store/claim-points-event/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";
import ErrorIcon from "@mui/icons-material/Error";
import { getErrorSelector } from "../../store/admin-organization-transaction/selectors";

const OrgToEmployeeTransaction = () => {
  const dispatch = useDispatch();
  const claimPointsEventList = useSelector(getClaimPointsEventListSelector);
  const organization = useSelector(getAdminOrganizationSelector);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const error = useSelector(getErrorSelector);
  const currentDate = new Date();
  const filteredList = claimPointsEventList.filter((claimPointsEvent) => {
    let validToDate = new Date(claimPointsEvent.validTo);
    if (currentDate > validToDate) return false;
    return true;
  });

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

  useEffect(() => {
    dispatch(fetchClaimPointsEventList());
  }, [dispatch]);

  const goBack = () => {
    navigate(-1);
  };

  const onSubmit = (data: any) => {
    dispatch(
      postOrgToEmployeesTransaction(
        {
          organizationId: organization?.id || "",
          orgToEmployees: {
            eventId: data.event,
            employeeNumber: Number(organization?.employeeNumber),
          },
        },
        navigate
      )
    );
  };

  return (
    <>
      <AppHeaderAdmin />
      <div className="background org-to-employee-transaction">
        <Card className="card-style">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography className="title-style">Org To Employees</Typography>
            {/*LABELS */}
            {error && (
              <div className="amount-error">
                <ErrorIcon className="amount-error-icon" />
                <Typography className="amount-error-message">
                  {error}
                </Typography>
              </div>
            )}
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="eventLabel">Event</InputLabel>
              <Select
                labelId="eventLabel"
                id="event"
                className={errors.event ? "event-with-error" : "event-input"}
                label="Event"
                {...register("event", { required: true })}
                MenuProps={MenuProps}
              >
                {filteredList.map((event, i) => {
                  return <MenuItem value={event.id}>{event.title}</MenuItem>;
                })}
              </Select>
            </FormControl>
            {/*LABELS */}
            {errors.event?.type === "required" && (
              <Typography className="event-error-fe">
                Event is required.
              </Typography>
            )}
            <Typography className="details-style">Details</Typography>
            <Divider className="divider-style" />
            <Typography className="info-style">
              Number of employees: {organization?.employeeNumber}
            </Typography>
            <Typography className="info-style">
              Amount per employee: {organization?.pointsPerMonth}
            </Typography>
            <Typography className="info-style">
              Total amount: {organization?.totalPointsPerMonth}
            </Typography>
            <Typography className="info-style">
              New balance:{" "}
              {Number(
                Number(organization?.balance) -
                  Number(organization?.totalPointsPerMonth)
              )}
            </Typography>
            <Divider className="divider-info-style" />
            <Grid container>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  className="back-button"
                  disableRipple
                  onClick={goBack}
                >
                  Back
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  className="confirm-button"
                  disableRipple
                  type="submit"
                >
                  Confirm
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </div>
      <AppFooter />
    </>
  );
};

export default OrgToEmployeeTransaction;