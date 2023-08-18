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

  const markAsCompletedWatch = () => {
    dispatch(
      postCompletementSteps(
        {
          stepId: allStepsIdMap.get("TALK_TO_A_SPECIALIST"),
          completementStepStatus: { completed: true },
        },
        navigate
      )
    );
  };

  return (
    <Card sx={style}>
      <Grid container>
        <Grid item xs={8}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            className="personal-details-title"
          >
            Personal Details
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="body2"
            className="personal-details-text"
          >
            Let's meet! Tell us something more about yourself and enjoy the best
            experience!
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <img
            src={PersonalDetailsIllustration}
            alt=""
            className="personal-details-illustration"
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default PersonalDetailsStep;
