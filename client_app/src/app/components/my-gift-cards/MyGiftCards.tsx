import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGiftCardRequestList } from "../../store/gift-card-request/actions";
import { getGiftCardRequestListSelector } from "../../store/gift-card-request/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import MyGiftCardItem from "./MyGiftCardItem";

const MyGiftCards = () => {
  const dispatch = useDispatch();
  const giftCardRequestList = useSelector(getGiftCardRequestListSelector);

  useEffect(() => {
    dispatch(fetchGiftCardRequestList());
  }, [dispatch]);

  let giftCardRequestList2 = giftCardRequestList.map((obj) => ({ ...obj }));
  const giftCardRequestList3 = giftCardRequestList2.concat(giftCardRequestList);
  giftCardRequestList2 = giftCardRequestList2.concat(giftCardRequestList);

  return (
    <>
      <AppHeaderPrivate />
      <div
        className={
          giftCardRequestList2.length > 3
            ? "background my-gift-cards"
            : "background my-gift-cards-small-list"
        }
      >
        {/*LABELS */}
        <Grid container spacing={4} className="grid-style">
          <Grid item xs={12} className="grid-title">
            <Typography className="my-gift-cards-title">
              My Gift Cards
            </Typography>
            <Typography className="my-gift-cards-text">
              Use your points<u className="my-gift-cards-link">now</u>.
              <span className=""> 4000 PTS</span>
            </Typography>
          </Grid>
          {giftCardRequestList2.map((element, i) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <MyGiftCardItem />
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
