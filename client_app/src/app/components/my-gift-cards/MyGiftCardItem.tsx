import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { IGiftCardRequest } from "../../store/gift-card-request/types";
import WatchGlass from "./../../assets/icons/watchglass.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchGiftCardFile } from "../../store/gift-card-request/actions";
import { countryList } from "../../enums/CountryList";
import { useNavigate } from "react-router-dom";
import { getAuthUserSelector } from "../../store/auth/selectors";
import { getSelfRequest } from "../../store/auth/actions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const MyGiftCardItem = (giftCardRequest: IGiftCardRequest) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getAuthUserSelector);
  const isMy =
    user.id === giftCardRequest.createdById &&
    user.id === giftCardRequest.ownerId;

  const isSent =
    user.id === giftCardRequest.createdById &&
    user.id !== giftCardRequest.ownerId;

  const isReceived =
    user.id !== giftCardRequest.createdById &&
    user.id === giftCardRequest.ownerId;

  useEffect(() => {
    dispatch(getSelfRequest(navigate));
  }, [dispatch]);

  const showMyGiftCard = () => {
    dispatch(fetchGiftCardFile({ giftCardRequestId: giftCardRequest.id }));
  };

  return (
    <Card
      sx={{ maxWidth: 270 }}
      className={
        giftCardRequest.status === "PENDING"
          ? "card-item-pending"
          : "card-item-success"
      }
    >
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
        <Typography
          className={
            isSent || isReceived ? "card-country-to-from" : "card-country"
          }
          variant="body2"
        >
          {
            countryList.find(
              (country) =>
                country.id === giftCardRequest.giftCardIntegration.countryId
            )?.countryName
          }
        </Typography>
        {isSent && (
          <Typography className="card-sent-to-from" variant="body2">
            To: {giftCardRequest.owner.email}
          </Typography>
        )}
        {isReceived && (
          <Typography className="card-sent-to-from" variant="body2">
            From: {giftCardRequest.createdBy.email}
          </Typography>
        )}
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
        {giftCardRequest.status === "COMPLETED" && isSent === false && (
          <Button
            variant="contained"
            className="card-button"
            onClick={showMyGiftCard}
            disableRipple
          >
            Show My Gift Card
          </Button>
        )}
        {giftCardRequest.status === "COMPLETED" && isSent === true && (
          <Grid container>
            <Grid item xs={3}>
              <CheckCircleIcon className="sent-icon" />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body2" className="sent-text">
                Gift card is successfully delivered
              </Typography>
            </Grid>
          </Grid>
        )}
        {giftCardRequest.status === "PENDING" && (
          <Grid container>
            <Grid item xs={3}>
              <img src={WatchGlass} alt="" className="card-pending-icon" />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body2" className="pending-text">
                Gift card will be available soon
              </Typography>
            </Grid>
          </Grid>
        )}
      </CardActions>
    </Card>
  );
};

export default MyGiftCardItem;
