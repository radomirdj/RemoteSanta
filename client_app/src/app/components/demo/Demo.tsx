import React from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import ReactPlayer from "react-player";

const Demo = () => {
  return (
    <>
      <AppHeaderPrivate />
      <div className="background demo">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=dXpdelI34BU"
          controls={true}
        />
      </div>
      <AppFooter />
    </>
  );
};

export default Demo;
