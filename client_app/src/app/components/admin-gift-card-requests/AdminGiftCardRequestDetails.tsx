import {
  Button,
  Card,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAdminGiftCardRequest,
  fulfillAdminGiftCardRequest,
} from "../../store/admin-gift-card-requests/actions";
import {
  getAdminGiftCardRequestSelector,
  getAdminGiftCardRequestUserSelector,
} from "../../store/admin-gift-card-requests/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";

const AdminGiftCardRequestDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const giftCardRequestId = params.id as string;
  const adminGiftCardRequest = useSelector(getAdminGiftCardRequestSelector);
  const adminGiftCardRequestUser = useSelector(
    getAdminGiftCardRequestUserSelector
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAdminGiftCardRequest({ giftCardRequestId }));
  }, [dispatch]);

  const onSubmit = (data: any) => {
    dispatch(
      fulfillAdminGiftCardRequest(
        {
          giftCardRequestId: giftCardRequestId,
          fulfillData: { url: data.url, description: data.desctiption },
        },
        navigate
      )
    );
  };

  return (
    <>
      <AppHeaderAdmin />
      <div className="background admin-gift-card-request-details">
        <Card className="card-style">
          <Typography className="details-title">
            Gift Card Request Details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography className="details-style">
                Gift Card Details
              </Typography>
              <Divider className="divider-style-not-full" />
              <Typography className="info-style">
                Integration: {adminGiftCardRequest?.giftCardIntegration.title}
              </Typography>
              <Typography className="info-style">
                Amount: {adminGiftCardRequest?.amount} PTS
              </Typography>
              <Typography className="info-style">
                Created At:{" "}
                {new Date(adminGiftCardRequest?.createdAt || "")
                  .toLocaleDateString()
                  .replaceAll("/", ".")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className="details-style">User Details</Typography>
              <Divider className="divider-style" />
              <Typography className="info-style">
                Full name: {adminGiftCardRequestUser?.firstName}{" "}
                {adminGiftCardRequestUser?.lastName}
              </Typography>
              <Typography className="info-style">
                Active points:{" "}
                {adminGiftCardRequestUser?.userBalance?.pointsActive}
                PTS
              </Typography>
              <Typography className="info-style">
                Reserved points:{" "}
                {adminGiftCardRequestUser?.userBalance?.pointsReserved} PTS
              </Typography>
              <Typography className="info-style">
                Email: {adminGiftCardRequestUser?.email}
              </Typography>
              <Typography className="info-style">
                Company name: {adminGiftCardRequestUser?.org?.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className="details-style-full">Actions</Typography>
              <Divider className="divider-style" />
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  error={errors.url ? true : false}
                  id="outlined-basic"
                  label="Gift Card Url"
                  variant="outlined"
                  className={errors.url ? "url-input-with-error" : "url-input"}
                  {...register("url", {
                    required: true,
                  })}
                />
                {/*LABELS */}
                {errors.url?.type === "required" && (
                  <Typography className="details-error-fe">
                    Gift Card Url is required.
                  </Typography>
                )}
                <TextField
                  id="standard-multiline-static"
                  label="Description"
                  multiline
                  rows={2}
                  variant="outlined"
                  {...register("description")}
                />
                <Button
                  variant="contained"
                  className="fulfill-button"
                  disableRipple
                  type="submit"
                >
                  Fulfill
                </Button>
              </form>
            </Grid>
          </Grid>
        </Card>
      </div>
      <AppFooter />
    </>
  );
};

export default AdminGiftCardRequestDetails;
