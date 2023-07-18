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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  getAdminGiftCardRequestSelector,
  getAdminGiftCardRequestUserSelector,
  getErrorSelector,
} from "../../store/admin-gift-card-requests/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";
import ErrorIcon from "@mui/icons-material/Error";
import { countryList } from "../../enums/CountryList";

const AdminGiftCardRequestDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const giftCardRequestId = params.id as string;
  const adminGiftCardRequest = useSelector(getAdminGiftCardRequestSelector);
  const adminGiftCardRequestUser = useSelector(
    getAdminGiftCardRequestUserSelector
  );
  const error = useSelector(getErrorSelector);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const goBack = () => {
    navigate(-1);
  };

  console.log(adminGiftCardRequest);

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
          file: data.file[0],
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

  return (
    <>
      <AppHeaderAdmin />
      <div className="background admin-gift-card-request-details">
        <Card className="card-style">
          <Typography className="details-title">
            Gift Card Request Details
          </Typography>
          <Grid container>
            <Grid item xs={4}>
              <Typography className="details-style">
                Gift Card Details
              </Typography>
              <Divider className="divider-style-not-full" />
              <Typography className="info-style">
                <Grid container>
                  <Grid item xs={4}>
                    <span className="column-name">Integration</span>
                  </Grid>
                  <Grid item xs={8}>
                    {adminGiftCardRequest?.giftCardIntegration.title}
                  </Grid>
                </Grid>
              </Typography>
              <Typography className="info-style">
                <Grid container>
                  <Grid item xs={4}>
                    <span className="column-name">Country</span>
                  </Grid>
                  <Grid item xs={8}>
                    {
                      countryList.find(
                        (country) =>
                          country.id ===
                          adminGiftCardRequest?.giftCardIntegration.countryId
                      )?.countryName
                    }
                  </Grid>
                </Grid>
              </Typography>
              <Typography className="info-style">
                <Grid container>
                  <Grid item xs={4}>
                    <span className="column-name">Amount</span>
                  </Grid>
                  <Grid item xs={8}>
                    {adminGiftCardRequest?.amount} PTS
                  </Grid>
                </Grid>
              </Typography>
              <Typography className="info-style">
                <Grid container>
                  <Grid item xs={4}>
                    <span className="column-name">Created At</span>
                  </Grid>
                  <Grid item xs={8}>
                    {new Date(
                      adminGiftCardRequest?.createdAt || ""
                    ).toLocaleDateString("en-US", {
                      day: "numeric",
                      year: "numeric",
                      month: "short",
                    })}
                  </Grid>
                </Grid>
              </Typography>
              <Typography className="info-style">
                <Grid container>
                  <Grid item xs={4}>
                    <span className="column-name">Currency Amount</span>
                  </Grid>
                  <Grid item xs={8}>
                    {adminGiftCardRequest?.giftCardIntegrationCurrencyAmount}{" "}
                    {adminGiftCardRequest?.giftCardIntegration.currency}
                  </Grid>
                </Grid>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className="details-style">Owner Details</Typography>
              <Divider className="divider-style-not-full" />
              <Typography className="info-style">
                <Grid container>
                  <Grid item xs={4}>
                    <span className="column-name">Full name</span>
                  </Grid>
                  <Grid item xs={8}>
                    {adminGiftCardRequest?.owner.firstName}{" "}
                    {adminGiftCardRequest?.owner.lastName}
                  </Grid>
                </Grid>
              </Typography>
              <Typography className="info-style">
                <Grid container>
                  <Grid item xs={4}>
                    <span className="column-name"> Active points</span>
                  </Grid>
                  <Grid item xs={8}>
                    {adminGiftCardRequest?.owner?.userBalance?.pointsActive}
                    PTS
                  </Grid>
                </Grid>
              </Typography>
              <Typography className="info-style">
                <Grid container>
                  <Grid item xs={4}>
                    <span className="column-name"> Reserved points</span>
                  </Grid>
                  <Grid item xs={8}>
                    {adminGiftCardRequest?.owner?.userBalance?.pointsReserved}{" "}
                    PTS
                  </Grid>
                </Grid>
              </Typography>
              <Typography className="info-style">
                <Grid container>
                  <Grid item xs={4}>
                    <span className="column-name">Email</span>
                  </Grid>
                  <Grid item xs={8}>
                    {adminGiftCardRequest?.owner?.email}
                  </Grid>
                </Grid>
              </Typography>
              <Typography className="info-style">
                <Grid container>
                  <Grid item xs={4}>
                    <span className="column-name">Company name</span>
                  </Grid>
                  <Grid item xs={8}>
                    {adminGiftCardRequest?.owner?.org?.name}
                  </Grid>
                </Grid>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className="details-style">
                Created By Details
              </Typography>
              <Divider className="divider-style" />
              <Typography className="info-style">
                <Grid container>
                  <Grid item xs={4}>
                    <span className="column-name">Full name</span>
                  </Grid>
                  <Grid item xs={8}>
                    {adminGiftCardRequest?.createdBy.firstName}{" "}
                    {adminGiftCardRequest?.createdBy.lastName}
                  </Grid>
                </Grid>
              </Typography>
              <Typography className="info-style">
                <Grid container>
                  <Grid item xs={4}>
                    <span className="column-name"> Active points</span>
                  </Grid>
                  <Grid item xs={8}>
                    {adminGiftCardRequest?.createdBy?.userBalance?.pointsActive}
                    PTS
                  </Grid>
                </Grid>
              </Typography>
              <Typography className="info-style">
                <Grid container>
                  <Grid item xs={4}>
                    <span className="column-name"> Reserved points</span>
                  </Grid>
                  <Grid item xs={8}>
                    {
                      adminGiftCardRequest?.createdBy?.userBalance
                        ?.pointsReserved
                    }{" "}
                    PTS
                  </Grid>
                </Grid>
              </Typography>
              <Typography className="info-style">
                <Grid container>
                  <Grid item xs={4}>
                    <span className="column-name">Email</span>
                  </Grid>
                  <Grid item xs={8}>
                    {adminGiftCardRequest?.createdBy?.email}
                  </Grid>
                </Grid>
              </Typography>
              <Typography className="info-style">
                <Grid container>
                  <Grid item xs={4}>
                    <span className="column-name">Company name</span>
                  </Grid>
                  <Grid item xs={8}>
                    {adminGiftCardRequest?.createdBy?.org?.name}
                  </Grid>
                </Grid>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className="details-style-full">
                Fulfill Gift Card Request
              </Typography>
              <Divider className="divider-style-not-full" />
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                  <Grid item xs={12}>
                    {error && (
                      <div className="error-fulfill">
                        <ErrorIcon className="error-fulfill-icon" />
                        <Typography className="error-fulfill-message">
                          {error}
                        </Typography>
                      </div>
                    )}
                    <input
                      accept="application/pdf"
                      type="file"
                      {...register("file", {
                        required: true,
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      className="fulfill-button"
                      disableRipple
                      type="submit"
                    >
                      Fulfill
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={4}>
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
          <Button
            disableRipple
            variant="text"
            className="back-button"
            startIcon={<ChevronLeftIcon className="back-icon" />}
            onClick={goBack}
          >
            Back
          </Button>
        </Card>
      </div>
      <AppFooter />
    </>
  );
};

export default AdminGiftCardRequestDetails;
