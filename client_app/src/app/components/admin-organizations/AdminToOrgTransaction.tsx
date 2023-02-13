import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postAdminToOrgTransaction } from "../../store/admin-organization-transaction/actions";
import { getErrorSelector } from "../../store/admin-organization-transaction/selectors";
import { getAdminOrganizationSelector } from "../../store/admin-organization/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";
import ErrorIcon from "@mui/icons-material/Error";

const AdminToOrgTransaction = () => {
  const dispatch = useDispatch();
  const organization = useSelector(getAdminOrganizationSelector);
  const navigate = useNavigate();
  const error = useSelector(getErrorSelector);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const goBack = () => {
    navigate(-1);
  };

  const onSubmit = (data: any) => {
    dispatch(
      postAdminToOrgTransaction(
        {
          organizationId: organization?.id || "",
          adminToOrg: { amount: Number(data.amount) },
        },
        navigate
      )
    );
  };

  return (
    <>
      <AppHeaderAdmin />
      <div className="background admin-to-org-transaction">
        <Card className="card-style">
          <Typography className="title-style">Admin to Organization</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="event-error">
                <ErrorIcon className="event-error-icon" />
                <Typography className="event-error-message">{error}</Typography>
              </div>
            )}
            <TextField
              error={errors.amount ? true : false}
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              className={
                errors.amount ? "amount-input-with-error" : "amount-input"
              }
              type="number"
              {...register("amount", {
                required: true,
              })}
            />

            {errors.amount?.type === "required" && (
              <Typography className="amount-error-fe">
                Amount is required.
              </Typography>
            )}
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

export default AdminToOrgTransaction;
