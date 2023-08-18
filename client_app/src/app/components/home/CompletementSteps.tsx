import {
  Button,
  Card,
  Grid,
  LinearProgress,
  linearProgressClasses,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import TalkWithASpecialistIllustration from "./../../assets/illustrations/talk-with-a-specialist-illustration.svg";
import PersonalDetailsIllustration from "./../../assets/illustrations/personal-details-illustration.svg";
import InviteCoworkersIllustration from "./../../assets/illustrations/invite-coworkers-illustration.svg";
import BirthdayIllustration from "./../../assets/illustrations/birthday-illustration.svg";
import PurchasePointsIllustration from "./../../assets/illustrations/purchase-points-illustration.svg";
import SignupBonusIllustration from "./../../assets/illustrations/signup-bonus-illustration.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompletementStepsSelector,
  getOpenModalStepSelector,
} from "../../store/self-signup/selectors";
import { getAuthUserSelector } from "../../store/auth/selectors";
import { useNavigate } from "react-router-dom";
import {
  fetchCompletementSteps,
  postCompletementSteps,
  setCloseModalStep,
  setOpenModalStep,
} from "../../store/self-signup/actions";
import { getSelfRequest } from "../../store/auth/actions";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AutomaticPointsDeliveryStep from "./AutomaticPointsDeliveryStep";

const CompletementSteps = () => {
  const dispatch = useDispatch();
  const user = useSelector(getAuthUserSelector);
  const navigate = useNavigate();
  const completementStepList = useSelector(getCompletementStepsSelector);
  const personalDetailsStep = {
    name: "PERSONAL_DETAILS",
    completed: !!user.birthDate,
    id: "",
  };
  const fullCompletementStepList = [
    ...completementStepList,
    personalDetailsStep,
  ];
  const allStepsNum = Number(fullCompletementStepList.length);
  const completedStepsList = fullCompletementStepList.filter(
    (step) => step.completed
  );
  const completedStepsMap = new Map<string, boolean>();
  const allStepsIdMap = new Map<string, string>();
  fullCompletementStepList.forEach((completedStep) => {
    completedStepsMap.set(completedStep.name, completedStep.completed);
    allStepsIdMap.set(completedStep.name, completedStep.id);
  });
  const completedStepsNum = Number(completedStepsList.length);
  const stepperValue = (completedStepsNum * 100) / allStepsNum;
  const openModalStep = useSelector(getOpenModalStepSelector);

  const handleOpenDemo = () =>
    dispatch(setOpenModalStep({ openModalStep: "TALK_TO_A_SPECIALIST" }));

  const handleOpenInvites = () =>
    dispatch(setOpenModalStep({ openModalStep: "INVITE_EMPLOYEES" }));

  const handleOpenAutomaticPoints = () =>
    dispatch(setOpenModalStep({ openModalStep: "AUTOMATIC_POINTS" }));

  const handleOpenPersonalDetails = () =>
    dispatch(setOpenModalStep({ openModalStep: "PERSONAL_DETAILS" }));

  const handleCloseModalStep = () => dispatch(setCloseModalStep());

  useEffect(() => {
    handleCloseModalStep();
    dispatch(fetchCompletementSteps());
    dispatch(getSelfRequest(navigate));
  }, [dispatch]);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 20,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 500 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 10,
      backgroundColor: theme.palette.mode === "light" ? "#CED15E" : "#A8A8A8",
    },
  }));

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 900 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 900, min: 500 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
    },
  };

  const calendlyRedirect = () => {
    window.open(
      "https://calendly.com/radomir-remotesanta/talk-to-specialist?month=2023-09",
      "_blank"
    );
  };

  const markAsCompletedSkip = (stepName: string) => {
    dispatch(
      postCompletementSteps(
        {
          stepId: allStepsIdMap.get(stepName),
          completementStepStatus: { completed: true },
        },
        navigate
      )
    );
  };

  return (
    <>
      {completedStepsNum < allStepsNum && (
        <Grid
          container
          sx={{
            display: {
              xs: "inline-flex",
            },
          }}
        >
          <Grid item xs={12}>
            <Card className="stepper-card">
              <Grid container>
                <Grid item xs={12}>
                  <Typography className="stepper-card-title">
                    Let’s set up you company’s page!
                  </Typography>
                  <Typography className="stepper-card-text">
                    Completing this steps will help that you and employees in
                    your company have better experience using our app.
                  </Typography>
                </Grid>
              </Grid>
              <BorderLinearProgress
                variant="determinate"
                value={stepperValue}
                className="stepper-card-stepper"
              />

              <Carousel responsive={responsive} slidesToSlide={1}>
                {!completedStepsMap.get("TALK_TO_A_SPECIALIST") && (
                  <Card className="step-card">
                    <Grid container>
                      <Grid item xs={9}>
                        <Typography className="step-title">
                          Talk to a specialist
                        </Typography>
                        <Typography className="step-text">
                          Schedule a call, and we'll easily set up your company
                          profile.
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={TalkWithASpecialistIllustration}
                          alt=""
                          className="step-illustration"
                        />
                      </Grid>
                      <Grid container>
                        <Grid item xs={6} className="step-grid-item-button">
                          <Button
                            onClick={calendlyRedirect}
                            className="proceed-button"
                          >
                            Go for it
                          </Button>
                        </Grid>
                        <Grid item xs={6} className="step-grid-item-button">
                          <Button
                            className="skip-button"
                            onClick={() =>
                              markAsCompletedSkip("TALK_TO_A_SPECIALIST")
                            }
                          >
                            Skip
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                )}

                {!completedStepsMap.get("PERSONAL_DETAILS") && (
                  <Card className="step-card">
                    <Grid container>
                      <Grid item xs={9}>
                        <Typography className="step-title">
                          Personal Details
                        </Typography>
                        <Typography className="step-text">
                          Tell us something more about yourself and enjoy the
                          best experience!
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PersonalDetailsIllustration}
                          alt=""
                          className="step-illustration"
                        />
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} className="step-grid-item-button">
                          <Button className="proceed-button-no-skip">
                            Set up now
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                )}
                {!completedStepsMap.get("INVITE_EMPLOYEES") && (
                  <Card className="step-card">
                    <Grid container>
                      <Grid item xs={9}>
                        <Typography className="step-title">
                          Invite Coworkers
                        </Typography>
                        <Typography className="step-text">
                          Invite your coworkers and enjoy the community!
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={InviteCoworkersIllustration}
                          alt=""
                          className="step-illustration"
                        />
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} className="step-grid-item-button">
                          <Button className="proceed-button-no-skip">
                            Set up now
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                )}
                {!completedStepsMap.get("BIRTHDAYS") && (
                  <Card className="step-card">
                    <Grid container>
                      <Grid item xs={9}>
                        <Typography className="step-title">
                          Birthdays
                        </Typography>
                        <Typography className="step-text">
                          Enjoy virtual birthday parties and get points
                          automatically.
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={BirthdayIllustration}
                          alt=""
                          className="step-illustration-birthday"
                        />
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} className="step-grid-item-button">
                          <Button className="proceed-button-no-skip">
                            Set up now
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                )}

                {!completedStepsMap.get("AUTOMATIC_POINTS") && (
                  <Card className="step-card">
                    <Grid container>
                      <Grid item xs={9}>
                        <Typography className="step-title">
                          Signup Bonus
                        </Typography>
                        <Typography className="step-text">
                          Welcome employees with signup bonus points when
                          joining the app.
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={SignupBonusIllustration}
                          alt=""
                          className="step-illustration"
                        />
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} className="step-grid-item-button">
                          <Button
                            className="proceed-button-no-skip"
                            onClick={handleOpenAutomaticPoints}
                          >
                            Set up now
                          </Button>
                        </Grid>
                      </Grid>

                      <Modal
                        open={openModalStep === "AUTOMATIC_POINTS"}
                        onClose={handleCloseModalStep}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <AutomaticPointsDeliveryStep />
                      </Modal>
                    </Grid>
                  </Card>
                )}
                {!completedStepsMap.get("PURCHASE_POINTS") && (
                  <Card className="step-card">
                    <Grid container>
                      <Grid item xs={9}>
                        <Typography className="step-title">
                          Purchase Points
                        </Typography>
                        <Typography className="step-text">
                          Acquire your points right here!
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PurchasePointsIllustration}
                          alt=""
                          className="step-illustration-birthday"
                        />
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} className="step-grid-item-button">
                          <Button className="proceed-button-no-skip">
                            Set up now
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                )}
              </Carousel>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CompletementSteps;
