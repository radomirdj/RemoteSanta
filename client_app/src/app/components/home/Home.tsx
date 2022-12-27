import React from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";

const Home = () => {
  return (
    <>
      <AppHeaderPrivate />
      <div className="background home">
        {/* {user.firstName} , {user.lastName} , {user.email}*/}
      </div>
      <AppFooter />
    </>
  );
};

export default Home;
