import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGiftCardRequestList } from "../../store/gift-card-request/actions";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";

const MyGiftCards = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGiftCardRequestList());
  }, [dispatch]);

  return (
    <>
      <AppHeaderPrivate />
      <div className="background my-gift-cards"></div>
      <AppFooter />
    </>
  );
};

export default MyGiftCards;
