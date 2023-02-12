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
  declineAdminGiftCardRequest,
  fetchAdminGiftCardRequest,
  fulfillAdminGiftCardRequest,
} from "../../store/admin-gift-card-requests/actions";
import {
  getAdminGiftCardRequestSelector,
  getAdminGiftCardRequestUserSelector,
} from "../../store/admin-gift-card-requests/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";
import UploadFileIcon from "@mui/icons-material/UploadFile";

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

  const {
    register: registerDecline,
    formState: { errors: errorsDecline },
    handleSubmit: handleSubmitDecline,
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

  const onSubmitDecline = (data: any) => {
    dispatch(
      declineAdminGiftCardRequest(
        {
          giftCardRequestId: giftCardRequestId,
          declineData: { adminComment: data.comment },
        },
        navigate
      )
    );
  };

  const toBase64 = (e: any) => {
    const file = e.target.files[0];

    // Encode the file using the FileReader API
    const reader = new FileReader();
    reader.onloadend = () => {
      // Use a regex to remove data url part
      const base64String = reader.result;

      console.log(base64String);
      // Logs wL2dvYWwgbW9yZ...
    };
    reader.readAsDataURL(file);
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
                  .toLocaleDateString("en-GB")
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
            <Grid item xs={6}>
              <Typography className="details-style-full">
                Fulfill Gift Card Request
              </Typography>
              <Divider className="divider-style-not-full" />
              <form onSubmit={handleSubmit(onSubmit)}>
                <Button
                  variant="contained"
                  component="label"
                  className="upload-button"
                  startIcon={<UploadFileIcon />}
                >
                  Upload
                  <input
                    hidden
                    accept="application/pdf"
                    type="file"
                    onChange={(e) => toBase64(e)}
                  />
                </Button>
                <TextField
                  id="standard-multiline-static"
                  label="Description"
                  multiline
                  rows={2}
                  variant="outlined"
                  className="description-input"
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
            <Grid item xs={6}>
              <Typography className="details-style-full">
                Decline Gift Card Request
              </Typography>
              <Divider className="divider-style" />
              <form onSubmit={handleSubmitDecline(onSubmitDecline)}>
                <TextField
                  id="standard-multiline-static"
                  label="Comment"
                  multiline
                  rows={2}
                  variant="outlined"
                  {...registerDecline("comment", {
                    required: true,
                  })}
                />

                {errorsDecline.comment?.type === "required" && (
                  <Typography className="details-error-fe">
                    Comment is required.
                  </Typography>
                )}
                <Button
                  variant="contained"
                  className="decline-button"
                  disableRipple
                  type="submit"
                >
                  Decline
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
