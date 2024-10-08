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
import ClaimCodeIllustration from "./../../assets/illustrations/claim-code-illustration.svg";
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
import BirthdaysStep from "./BirthdaysStep";
import PersonalDetailsStep from "./PersonalDetailsStep";
import ClaimCodeStep from "./ClaimCodeStep";

const CompletementSteps = () => {
  const dispatch = useDispatch();
  const user = useSelector(getAuthUserSelector);
  const navigate = useNavigate();
  const completementStepList = useSelector(getCompletementStepsSelector);
  const allStepsNum = Number(completementStepList.length);
  const completedStepsList = completementStepList.filter(
    (step) => step.completed
  );
  const completedStepsMap = new Map<string, boolean>();
  const allStepsIdMap = new Map<string, string>();
  completementStepList.forEach((completedStep) => {
    completedStepsMap.set(completedStep.name, completedStep.completed);
    allStepsIdMap.set(completedStep.name, completedStep.id);
  });
  const completedStepsNum = Number(completedStepsList.length);
  const stepperValue = (completedStepsNum * 100) / allStepsNum;
  const openModalStep = useSelector(getOpenModalStepSelector);

  const handleOpenAutomaticPoints = () =>
    dispatch(setOpenModalStep({ openModalStep: "AUTOMATIC_POINTS" }));

  const handleOpenBirthdays = () =>
    dispatch(setOpenModalStep({ openModalStep: "BIRTHDAYS" }));

  const handleOpenPersonalDetails = () =>
    dispatch(setOpenModalStep({ openModalStep: "PERSONAL_DETAILS" }));

  const handleOpenClaimCode = () =>
    dispatch(setOpenModalStep({ openModalStep: "CLAIM_CODE" }));

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

  const calendlyRedirect = (stepName: string) => {
    window.open(
      "https://calendly.com/radomir-remotesanta/talk-to-specialist?month=2023-09",
      "_blank"
    );
  };

  const purchasePointsRedirect = () => {
    navigate("/user-manager-purchase-points");
  };

  const userInvitesRedirect = () => {
    navigate("/user-manager-invites");
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

  const talktToSpecalistCompletementStep = () => (
    <Card className="step-card">
      <Grid container>
        <Grid item xs={8} sm={7}>
          <Typography className="step-title">Talk with a specialist</Typography>
        </Grid>
        <Grid item xs={4} sm={5}>
          <img
            src={TalkWithASpecialistIllustration}
            alt=""
            className="step-illustration-normal"
          />
        </Grid>
        <Grid container>
          <Grid item xs={6} className="step-grid-item-button">
            <Button
              onClick={() => calendlyRedirect("TALK_TO_A_SPECIALIST")}
              className="proceed-button"
            >
              Go for it
            </Button>
          </Grid>
          <Grid item xs={6} className="step-grid-item-button">
            <Button
              className="skip-button"
              onClick={() => markAsCompletedSkip("TALK_TO_A_SPECIALIST")}
            >
              Complete
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );

  const personalDetailsCompletementStep = () => (
    <Card className="step-card">
      <Grid container>
        <Grid item xs={8} sm={7}>
          <Typography className="step-title">Personal Details</Typography>
        </Grid>
        <Grid item xs={4} sm={5}>
          <img
            src={PersonalDetailsIllustration}
            alt=""
            className="step-illustration-bigger"
          />
        </Grid>
        <Grid container>
          <Grid item xs={12} className="step-grid-item-button">
            <Button
              className="proceed-button-no-skip"
              onClick={handleOpenPersonalDetails}
            >
              Set up now
            </Button>
          </Grid>
        </Grid>
        <Modal
          open={openModalStep === "PERSONAL_DETAILS"}
          onClose={handleCloseModalStep}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <PersonalDetailsStep />
        </Modal>
      </Grid>
    </Card>
  );
  const refferalCodeCompletementStep = () => (
    <Card className="step-card">
      <Grid container>
        <Grid item xs={8} sm={7}>
          <Typography className="step-title">Claim your code</Typography>
        </Grid>
        <Grid item xs={4} sm={5}>
          <img
            src={ClaimCodeIllustration}
            alt=""
            className="step-illustration-bigger"
          />
        </Grid>
        <Grid container>
          <Grid item xs={12} className="step-grid-item-button">
            <Button
              className="proceed-button-no-skip"
              onClick={handleOpenClaimCode}
            >
              Set up now
            </Button>
          </Grid>
        </Grid>
        <Modal
          open={openModalStep === "CLAIM_CODE"}
          onClose={handleCloseModalStep}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ClaimCodeStep />
        </Modal>
      </Grid>
    </Card>
  );
  const inviteEmployeesCompletementStep = () => (
    <Card className="step-card">
      <Grid container>
        <Grid item xs={8} sm={7}>
          <Typography className="step-title">Invite Coworkers</Typography>
        </Grid>
        <Grid item xs={4} sm={5}>
          <img
            src={InviteCoworkersIllustration}
            alt=""
            className="step-illustration-medium"
          />
        </Grid>
        <Grid container>
          <Grid item xs={6} className="step-grid-item-button">
            <Button className="proceed-button" onClick={userInvitesRedirect}>
              Go for it
            </Button>
          </Grid>
          <Grid item xs={6} className="step-grid-item-button">
            <Button
              className="skip-button"
              onClick={() => markAsCompletedSkip("INVITE_EMPLOYEES")}
            >
              Complete
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );

  const birthdaysCompletementStep = () => (
    <Card className="step-card">
      <Grid container>
        <Grid item xs={8} sm={7}>
          <Typography className="step-title">Birthday Celebrations</Typography>
        </Grid>
        <Grid item xs={4} sm={5}>
          <img
            src={BirthdayIllustration}
            alt=""
            className="step-illustration-small"
          />
        </Grid>
        <Grid container>
          <Grid item xs={12} className="step-grid-item-button">
            <Button
              className="proceed-button-no-skip"
              onClick={handleOpenBirthdays}
            >
              Set up now
            </Button>
          </Grid>
        </Grid>

        <Modal
          open={openModalStep === "BIRTHDAYS"}
          onClose={handleCloseModalStep}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <BirthdaysStep />
        </Modal>
      </Grid>
    </Card>
  );

  const automaticPointsCompletementStep = () => (
    <Card className="step-card">
      <Grid container>
        <Grid item xs={8} sm={7}>
          <Typography className="step-title">Welcome Bonus</Typography>
        </Grid>
        <Grid item xs={4} sm={5}>
          <img
            src={SignupBonusIllustration}
            alt=""
            className="step-illustration-small"
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
  );

  const purchasePointsCompletementStep = () => (
    <Card className="step-card">
      <Grid container>
        <Grid item xs={8} sm={7}>
          <Typography className="step-title">Purchase Points</Typography>
        </Grid>
        <Grid item xs={4} sm={5}>
          <img
            src={PurchasePointsIllustration}
            alt=""
            className="step-illustration-medium"
          />
        </Grid>
        <Grid container>
          <Grid item xs={12} className="step-grid-item-button">
            <Button
              className="proceed-button-no-skip"
              onClick={purchasePointsRedirect}
            >
              Set up now
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
  const completementStepElementList: (() => JSX.Element)[] = [];
  if (!completedStepsMap.get("INVITE_EMPLOYEES"))
    completementStepElementList.push(inviteEmployeesCompletementStep);
  if (!completedStepsMap.get("PURCHASE_POINTS"))
    completementStepElementList.push(purchasePointsCompletementStep);
  if (!completedStepsMap.get("BIRTHDAYS"))
    completementStepElementList.push(birthdaysCompletementStep);
  if (!completedStepsMap.get("CLAIM_CODE"))
    completementStepElementList.push(refferalCodeCompletementStep);
  if (!completedStepsMap.get("AUTOMATIC_POINTS"))
    completementStepElementList.push(automaticPointsCompletementStep);
  if (!completedStepsMap.get("PERSONAL_DETAILS"))
    completementStepElementList.push(personalDetailsCompletementStep);
  if (!completedStepsMap.get("TALK_TO_A_SPECIALIST"))
    completementStepElementList.push(talktToSpecalistCompletementStep);
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
                </Grid>
              </Grid>
              <BorderLinearProgress
                variant="determinate"
                value={stepperValue}
                className="stepper-card-stepper"
              />

              <Carousel responsive={responsive} slidesToSlide={1}>
                {completementStepElementList.map((completementStepEl) =>
                  completementStepEl()
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
