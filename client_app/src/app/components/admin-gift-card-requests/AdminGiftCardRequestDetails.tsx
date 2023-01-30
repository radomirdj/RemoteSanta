import { Card, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderAdmin from "../app-header-admin/AppHeaderAdmin";

const AdminGiftCardRequestDetails = () => {
  const params = useParams();
  const giftCardRequestId = params.id as string;

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
              <Divider className="divider-style" />
            </Grid>
            <Grid item xs={6}>
              <Typography className="details-style">User Details</Typography>
              <Divider className="divider-style" />
            </Grid>
          </Grid>
        </Card>
      </div>
      <AppFooter />
    </>
  );
};

export default AdminGiftCardRequestDetails;
