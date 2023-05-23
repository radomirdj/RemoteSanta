import { Button, Card, Grid, Typography } from "@mui/material";
import React from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { postCompletementSteps } from "../../store/self-signup/actions";
import { getCompletementStepsSelector } from "../../store/self-signup/selectors";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";

const WatchDemoStep = () => {
  const dispatch = useDispatch();
  const completementStepList = useSelector(getCompletementStepsSelector);
  const allStepsIdMap = new Map<string, string>();
  completementStepList.forEach((completedStep) => {
    allStepsIdMap.set(completedStep.name, completedStep.id);
  });
  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #ffffff",
    borderRadius: "24px",
    p: 4,
  };

  const markAsCompletedWatch = () => {
    dispatch(
      postCompletementSteps(
        {
          stepId: allStepsIdMap.get("WATCH_TUTORIAL"),
          completementStepStatus: { completed: true },
        },
        navigate
      )
    );
  };

  return (
    <Card sx={style}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography
                id="modal-modal-title"
                variant="h4"
                className="watch-demo-title"
              >
                Watch Remote Santa in action
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                className="mark-as-completed-button"
                disableRipple
                startIcon={<CheckIcon />}
                onClick={markAsCompletedWatch}
              >
                Mark as completed
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="watch-demo-grid-item">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=Fz3UN4Dajrs"
            controls={true}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default WatchDemoStep;
