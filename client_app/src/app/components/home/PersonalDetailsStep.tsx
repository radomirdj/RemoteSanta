import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postCompletementSteps } from "../../store/self-signup/actions";
import { getCompletementStepsSelector } from "../../store/self-signup/selectors";
import PersonalDetailsIllustration from "./../../assets/illustrations/personal-details-illustration.svg";

const PersonalDetailsStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const completementStepList = useSelector(getCompletementStepsSelector);
  const allStepsIdMap = new Map<string, string>();
  completementStepList.forEach((completedStep) => {
    allStepsIdMap.set(completedStep.name, completedStep.id);
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #ffffff",
    borderRadius: "24px",
    p: 4,
  };

  return (
    <Card sx={style}>
      <Grid container>
        <Grid item xs={9}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            className="completement-step-title"
          >
            Personal Details
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <img
            src={PersonalDetailsIllustration}
            alt=""
            className="completement-step-personal-details-illustration"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            id="modal-modal-title"
            variant="body2"
            className="completement-step-text"
          >
            Let's meet! Tell us something more about yourself and enjoy the best
            experience!
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PersonalDetailsStep;
