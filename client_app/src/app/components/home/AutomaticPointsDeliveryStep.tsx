import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postCompletementSteps } from "../../store/self-signup/actions";
import { getCompletementStepsSelector } from "../../store/self-signup/selectors";
import AutomaticPointsDeliveryIllustration from "./../../assets/illustrations/automatic-points-delivery-illustration.svg";

const AutomaticPointsDeliveryStep = () => {
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
        <Grid item xs={9}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            className="automatic-points-delivery-title"
          >
            Setup Automatic Points Delivery
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <img
            src={AutomaticPointsDeliveryIllustration}
            alt=""
            className="automatic-points-delivery-illustration"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            id="modal-modal-title"
            variant="body2"
            className="automatic-points-delivery-text"
          >
            You can set automatically points delivery for your coworkers: <br />
            <b>Signup Bonus Points</b> - points received when joining platform -
            usually between 1000 and 5000 PTS (10 and 50 USD) <br />
            <b>Monthly Points</b> - points received each month - usually between
            500 and 3000 PTS (5 and 30 USD)
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="body2"
            className="automatic-points-delivery-text"
          >
            You can set them to zero and send coworkers points manually for
            occasions you choose.
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AutomaticPointsDeliveryStep;
