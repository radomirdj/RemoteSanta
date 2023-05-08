import React from "react";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import ReactPlayer from "react-player";
import { Button, Grid } from "@mui/material";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

const Demo = () => {
  const calendlyRedirect = () => {
    window.open(
      "https://calendly.com/radomir-remotesanta/remote-santa-support",
      "_blank"
    );
  };

  return (
    <>
      <AppHeaderPrivate />
      <div className="background demo">
        <Grid container className="grid-style">
          <Grid item xs={12}>
            <Button
              variant="contained"
              className="talk-to-a-specialist-button"
              disableRipple
              startIcon={<ContactSupportIcon />}
              onClick={calendlyRedirect}
            >
              Talk to a specialist
            </Button>
          </Grid>
          <Grid item xs={12}>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=Fz3UN4Dajrs"
              controls={true}
            />
          </Grid>
        </Grid>
      </div>
      <AppFooter />
    </>
  );
};

export default Demo;
