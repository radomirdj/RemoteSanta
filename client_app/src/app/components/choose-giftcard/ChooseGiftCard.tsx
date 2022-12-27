import { Grid, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGiftCardIntegrationList } from "../../store/gift-card-request/actions";
import { getGiftCardIntegrationListSelector } from "../../store/gift-card-request/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import ColorlibStepIcon from "./ColorlibStepIcon";
import ColorlibConnector from "./ColorlibConnector";
import GiftCardIntegrationItem from "./GiftCardIntegrationItem";

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
        <Grid container spacing={4} className="grid-style">
          <Grid item xs={12}>
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<ColorlibConnector />}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          {giftCardIntegrationList.map((element, i) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <GiftCardIntegrationItem {...element} />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <AppFooter />
    </>
  );
};

export default ChooseGiftCard;
