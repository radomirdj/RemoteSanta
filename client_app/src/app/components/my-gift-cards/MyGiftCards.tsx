import React from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";

const MyGiftCards = () => {
  return (
    <>
      <AppHeaderPrivate />
      <div className="background my-gift-cards"></div>
      <AppFooter />
    </>
  );
};

export default MyGiftCards;
