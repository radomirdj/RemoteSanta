import React from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";

const History = () => {
  return (
    <>
      <AppHeaderPrivate />
      <div className="background history"></div>
      <AppFooter />
    </>
  );
};

export default History;
