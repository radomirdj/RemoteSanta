import React from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";

const Demo = () => {
  return (
    <>
      <AppHeaderPrivate />
      <div className="background demo"></div>
      <AppFooter />
    </>
  );
};

export default Demo;
