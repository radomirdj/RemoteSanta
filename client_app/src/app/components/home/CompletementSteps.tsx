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
import WatchDemoIllustration from "./../../assets/illustrations/watch-demo-illustration.svg";
import PersonalDetailsIllustration from "./../../assets/illustrations/personal-details-illustration.svg";
import InviteCoworkersIllustration from "./../../assets/illustrations/invite-coworkers-illustration.svg";
import AddPaymentIllustration from "./../../assets/illustrations/add-payment-illustration.svg";
import AutomaticPointsDeliveryIllustration from "./../../assets/illustrations/automatic-points-delivery-illustration.svg";
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
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import WatchDemoStep from "./WatchDemoStep";
import InviteCoworkersStep from "./InviteCoworkersStep";
import PersonalDetailsStep from "./PersonalDetailsStep";

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
    dispatch(setOpenModalStep({ openModalStep: "WATCH_TUTORIAL" }));

  const handleOpenInvites = () =>
    dispatch(setOpenModalStep({ openModalStep: "INVITE_EMPLOYEES" }));

  const handleOpenPersonalDetails = () =>
    dispatch(setOpenModalStep({ openModalStep: "PERSONAL_DETAILS" }));

  const handleCloseModalStep = () => dispatch(setCloseModalStep());

  useEffect(() => {
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
      "https://calendly.com/radomir-remotesanta/remote-santa-support",
      "_blank"
    );
  };

  const markAsCompletedSkip = (stepName: string) => {
    dispatch(
      postCompletementSteps({
        stepId: allStepsIdMap.get(stepName),
        completementStepStatus: { completed: true },
      })
    );
  };

  return (
    <>
      {completedStepsNum < allStepsNum && (
        <Grid
          container
          sx={{ display: { xs: "none", sm: "none", md: "inline-flex" } }}
        >
          <Grid item xs={12}>
            <Card className="stepper-card">
              <Grid container>
                <Grid item xs={8}>
                  <Typography className="stepper-card-title">
                    Let’s set up you company’s page!
                  </Typography>
                </Grid>
                <Grid item xs={4}>
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
              </Grid>
              <Typography className="stepper-card-text">
                Completing this steps will help that you and employees in your
                company have better experience using our app.
              </Typography>
              <BorderLinearProgress
                variant="determinate"
                value={stepperValue}
                className="stepper-card-stepper"
              />

              <Carousel responsive={responsive} slidesToSlide={1}>
                {!completedStepsMap.get("WATCH_TUTORIAL") && (
                  <Card className="step-card">
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography className="step-title">
                          Watch Tutorial
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography className="step-text">
                          See Remote Santa in action. Understand better its
                          features and get the best experience.
                        </Typography>
                        <Grid container>
                          <Grid item xs={6} className="step-grid-item-button">
                            <Button
                              variant="contained"
                              className="lets-go-button"
                              disableRipple
                              onClick={handleOpenDemo}
                            >
                              Let's go
                            </Button>
                          </Grid>
                          <Grid item xs={6} className="step-grid-item-button">
                            <Button
                              variant="outlined"
                              className="skip-button"
                              disableRipple
                              onClick={() =>
                                markAsCompletedSkip("WATCH_TUTORIAL")
                              }
                            >
                              Skip
                            </Button>
                          </Grid>
                        </Grid>
                        <Modal
                          open={openModalStep === "WATCH_TUTORIAL"}
                          onClose={handleCloseModalStep}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <WatchDemoStep />
                        </Modal>
                      </Grid>
                      <Grid item xs={4} className="step-grid-item">
                        <img
                          src={WatchDemoIllustration}
                          alt=""
                          className="step-illustration"
                        />
                      </Grid>
                    </Grid>
                  </Card>
                )}

                {!completedStepsMap.get("PERSONAL_DETAILS") && (
                  <Card className="step-card">
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography className="step-title">
                          Personal Details
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography className="step-text">
                          Let's meet! Tell us something more about yourself and
                          enjoy the best experience!
                        </Typography>
                        <Button
                          variant="contained"
                          className="lets-go-button"
                          disableRipple
                          onClick={handleOpenPersonalDetails}
                        >
                          Let's go
                        </Button>
                      </Grid>
                      <Modal
                        open={openModalStep === "PERSONAL_DETAILS"}
                        onClose={handleCloseModalStep}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <PersonalDetailsStep />
                      </Modal>
                      <Grid item xs={4} className="step-grid-item">
                        <img
                          src={PersonalDetailsIllustration}
                          alt=""
                          className="step-illustration"
                        />
                      </Grid>
                    </Grid>
                  </Card>
                )}

                {!completedStepsMap.get("AUTOMATIC_POINTS") && (
                  <Card className="step-card">
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography className="step-title">
                          Automatic points delivery
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography className="step-text">
                          Don't think about points, set them now and employees
                          will get them automatically!
                        </Typography>
                        <Button
                          variant="contained"
                          className="lets-go-button"
                          disableRipple
                        >
                          Let's go
                        </Button>
                      </Grid>
                      <Grid item xs={4} className="step-grid-item">
                        <img
                          src={AutomaticPointsDeliveryIllustration}
                          alt=""
                          className="step-illustration"
                        />
                      </Grid>
                    </Grid>
                  </Card>
                )}
                {!completedStepsMap.get("INVITE_EMPLOYEES") && (
                  <Card className="step-card">
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography className="step-title">
                          Invite coworkers
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography className="step-text">
                          Invite your coworkers and enjoy the community! Have
                          fun together.
                        </Typography>
                        <Button
                          variant="contained"
                          className="lets-go-button"
                          disableRipple
                          onClick={handleOpenInvites}
                        >
                          Let's go
                        </Button>
                      </Grid>
                      <Modal
                        open={openModalStep === "INVITE_EMPLOYEES"}
                        onClose={handleCloseModalStep}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <InviteCoworkersStep />
                      </Modal>
                      <Grid item xs={4} className="step-grid-item">
                        <img
                          src={InviteCoworkersIllustration}
                          alt=""
                          className="step-illustration"
                        />
                      </Grid>
                    </Grid>
                  </Card>
                )}
                {!completedStepsMap.get("ADD_PAYMENT") && (
                  <Card className="step-card">
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography className="step-title">
                          Payment method
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography className="step-text">
                          Add payment method. Choose the payment option that
                          suits you best!
                        </Typography>
                        <Button
                          variant="contained"
                          className="lets-go-button"
                          disableRipple
                        >
                          Let's go
                        </Button>
                      </Grid>
                      <Grid item xs={5} className="step-grid-item">
                        <img
                          src={AddPaymentIllustration}
                          alt=""
                          className="step-illustration"
                        />
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
