import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { IGiftCardRequest } from "../../store/gift-card-request/types";
import WatchGlass from "./../../assets/icons/watchglass.svg";
import DeclinedIcon from "./../../assets/icons/declined-icon.svg";
import { useDispatch } from "react-redux";
import { fetchGiftCardFile } from "../../store/gift-card-request/actions";
import { countryList } from "../../enums/CountryList";

const MyGiftCardItem = (giftCardRequest: IGiftCardRequest) => {
  const dispatch = useDispatch();

  const showMyGiftCard = () => {
    dispatch(fetchGiftCardFile({ giftCardRequestId: giftCardRequest.id }));
  };

  return (
    <Card sx={{ maxWidth: 270 }} className="card-item">
      <CardMedia
        component="img"
        height="140"
        image={giftCardRequest.giftCardIntegration.image}
        alt=""
        className="card-image"
      />
      <CardContent>
        <Typography variant="h6" className="card-title">
          {giftCardRequest.giftCardIntegration.title}
        </Typography>
        <Typography className="card-country" variant="body2">
          {
            countryList.find(
              (country) =>
                country.id === giftCardRequest.giftCardIntegration.countryId
            )?.countryName
          }
        </Typography>
        <Typography variant="body2" className="card-date">
          {new Date(giftCardRequest.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            year: "numeric",
            month: "short",
          })}
          <span className="card-amount"> {giftCardRequest.amount} PTS</span>
        </Typography>
      </CardContent>
      <CardActions>
        {giftCardRequest.status === "COMPLETED" && (
          <Button
            variant="contained"
            className="card-button"
            onClick={showMyGiftCard}
            disableRipple
          >
            Show My Gift Card
          </Button>
        )}
        {giftCardRequest.status === "PENDING" && (
          <Grid container>
            <Grid item xs={3}>
              <img src={WatchGlass} alt="" className="card-pending-icon" />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body2" className="pending-text">
                Your Gift Card will be available soon
              </Typography>
            </Grid>
          </Grid>
        )}
        {giftCardRequest.status === "DECLINED" && (
          <Grid container>
            <Grid item xs={3}>
              <img src={DeclinedIcon} alt="" className="card-declined-icon" />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body2" className="card-declined-text">
                {giftCardRequest.adminComment}
              </Typography>
            </Grid>
          </Grid>
        )}
      </CardActions>
    </Card>
  );
};

export default MyGiftCardItem;
