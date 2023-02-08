import { Grid, Typography } from "@mui/material";
import userEvent from "@testing-library/user-event";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthUserSelector } from "../../store/auth/selectors";
import { fetchGiftCardRequestList } from "../../store/gift-card-request/actions";
import { getGiftCardRequestListSelector } from "../../store/gift-card-request/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import MyGiftCardItem from "./MyGiftCardItem";
import NoGiftCards from "./NoGiftCards";

const MyGiftCards = () => {
  const dispatch = useDispatch();
  const giftCardRequestList = useSelector(getGiftCardRequestListSelector);
  const navigate = useNavigate();
  const user = useSelector(getAuthUserSelector);

  useEffect(() => {
    dispatch(fetchGiftCardRequestList());
  }, [dispatch]);

  const chooseGiftCardRedirect = () => {
    navigate("/choose-gift-card");
  };

  return (
    <>
      <AppHeaderPrivate />
      {giftCardRequestList.length === 0 && <NoGiftCards />}
      {giftCardRequestList.length > 0 && (
        <div
          className={
            giftCardRequestList.length > 4
              ? "background my-gift-cards"
              : "background my-gift-cards-small-list"
          }
        >
          <Grid container spacing={4} className="grid-style">
            <Grid item xs={12} className="grid-title">
              <Typography className="my-gift-cards-title">
                My Gift Cards
              </Typography>
            </Grid>
            <Grid item xs={12} className="grid-item">
              <Typography className="my-gift-cards-text">
                <span className="my-gift-card-points">
                  {" "}
                  {user.userBalance?.pointsActive} PTS
                </span>
                - Use your points
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
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <MyGiftCardItem {...element} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
      <AppFooter />
    </>
  );
};

export default MyGiftCards;
