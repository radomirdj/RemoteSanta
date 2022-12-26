import { Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGiftCardIntegrationList } from "../../store/gift-card-request/actions";
import { getGiftCardIntegrationListSelector } from "../../store/gift-card-request/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import ColorlibStepIcon from "./ColorlibStepIcon";
import ColorlibConnector from "./ColorlibConnector";

const ChooseGiftCard = () => {
  const dispatch = useDispatch();
  const giftCardIntegrationList = useSelector(
    getGiftCardIntegrationListSelector
  );
  const [activeStep, setActiveStep] = useState(0);

  //LABELS
  const steps = ["Select a gift card", "Choose an amount", "Overview"];

  useEffect(() => {
    dispatch(fetchGiftCardIntegrationList());
  }, [dispatch]);

  return (
    <>
      <AppHeaderPrivate />
      <div className="background choose-gift-card">
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={ColorlibStepIcon}
                className="step-label-style"
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <AppFooter />
    </>
  );
};

export default ChooseGiftCard;
