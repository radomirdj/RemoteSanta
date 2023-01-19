import { Button, Card, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postAdminToOrgTransaction } from "../../store/admin-organization-transaction/actions";
import { getAdminOrganizationSelector } from "../../store/admin-organization/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";

const AdminToOrgTransaction = () => {
  const dispatch = useDispatch();
  const organization = useSelector(getAdminOrganizationSelector);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  console.log(organization);

  const onSubmit = (data: any) => {
    dispatch(
      postAdminToOrgTransaction({
        organizationId: organization?.id || "",
        adminToOrg: { amount: Number(data.amount) },
      })
    );
  };

  return (
    <>
      <AppHeaderAdmin />
      <div className="background admin-to-org-transaction">
        <Card className="card-style">
          <Typography className="title-style">Admin to Organization</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            {/*LABELS */}
            {errors.amount?.type === "required" && (
              <Typography className="amount-error-fe">
                Amount is required.
              </Typography>
            )}
            <Button
              variant="contained"
              className="submit-button"
              disableRipple
              type="submit"
            >
              Confirm
            </Button>
          </form>
        </Card>
      </div>
      <AppFooter />
    </>
  );
};

export default AdminToOrgTransaction;
