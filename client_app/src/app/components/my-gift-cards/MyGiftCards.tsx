import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchGiftCardRequestList } from "../../store/gift-card-request/actions";
import { getGiftCardRequestListSelector } from "../../store/gift-card-request/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import MyGiftCardItem from "./MyGiftCardItem";

const MyGiftCards = () => {
  const dispatch = useDispatch();
  const giftCardRequestList = useSelector(getGiftCardRequestListSelector);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGiftCardRequestList());
  }, [dispatch]);

  const chooseGiftCardRedirect = () => {
    navigate("/choose-gift-card");
  };

  return (
    <>
      <AppHeaderPrivate />
      <div
        className={
          giftCardRequestList.length > 3
            ? "background my-gift-cards"
            : "background my-gift-cards-small-list"
        }
      >
        {/*LABELS */}
        <Grid container spacing={4} className="grid-style">
          <Grid item xs={6} className="grid-title">
            <Typography className="my-gift-cards-title">
              My Gift Cards
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="my-gift-card-points">4000 PTS</Typography>
          </Grid>
          <Grid item xs={12} className="grid-item">
            <Typography className="my-gift-cards-text">
              Use your points
              <u
                className="my-gift-cards-link"
                onClick={chooseGiftCardRedirect}
              >
                now
              </u>
              .
            </Typography>
          </Grid>
          {giftCardRequestList.map((element, i) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <MyGiftCardItem {...element} />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <AppFooter />
    </>
  );
};

export default MyGiftCards;
