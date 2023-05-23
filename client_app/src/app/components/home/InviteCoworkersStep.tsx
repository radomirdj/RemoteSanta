import { Button, Card, Grid, Typography } from "@mui/material";
import React, { useRef } from "react";
import InviteCoworkersIllustration from "./../../assets/illustrations/invite-coworkers-illustration.svg";
import InviteGroupCoworkerIcon from "./../../assets/icons/invite-group-coworker-icon.svg";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useNavigate } from "react-router-dom";
import ExampleCSV from "./../../assets/documents/ExampleCSV.csv";
import Papa from "papaparse";

const InviteCoworkersStep = () => {
  const navigate = useNavigate();
  const inputRef = useRef<any>(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #ffffff",
    borderRadius: "24px",
    p: 4,
  };

  const inviteSingleCoworkerRedirect = () => {
    navigate("/invite-single-coworker");
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event: any) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    event.target.value = null;
    Papa.parse(fileObj, {
      header: true,
      complete: (results) => {
        console.log(results.data);
        // navigate("/invite-group-coworker");
      },
    });
  };

  return (
    <Card sx={style}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={9}>
              <Typography
                id="modal-modal-title"
                variant="h4"
                className="invite-coworkers-title"
              >
                Invite Coworkers
              </Typography>
              <Typography
                id="modal-modal-title"
                className="invite-coworkers-text"
                variant="subtitle1"
              >
                Invite your coworkers and enjoy the community!
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <img
                src={InviteCoworkersIllustration}
                alt=""
                className="invite-coworkers-illustration"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                accept=".csv"
                onChange={handleFileChange}
              />
              <Button
                variant="contained"
                className="invite-group-coworker-button"
                disableRipple
                onClick={handleClick}
                startIcon={<img src={InviteGroupCoworkerIcon} alt="" />}
              >
                Import List
              </Button>
              <a
                href={ExampleCSV}
                target="_blank"
                className="invite-group-coworker-link"
              >
                *CSV, XLSX - see example
              </a>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                className="invite-single-coworker-button"
                disableRipple
                onClick={inviteSingleCoworkerRedirect}
                startIcon={<PersonAddAlt1Icon />}
              >
                Insert Manually
              </Button>
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default InviteCoworkersStep;
