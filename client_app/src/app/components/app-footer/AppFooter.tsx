import React from "react";
import { Typography } from "@mui/material";

const AppFooter = () => {
  return (
    <div className="app-footer">
      {/*LABELS */}
      <Typography className="footer-text">© 2022 Remote Santa </Typography>
      <Typography className="footer-text">|</Typography>
      <Typography className="footer-text">Privacy Policy </Typography>
    </div>
  );
};

export default AppFooter;
