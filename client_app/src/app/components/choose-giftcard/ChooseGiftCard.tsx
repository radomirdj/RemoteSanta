import { Card, Grid, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGiftCardIntegrationList } from "../../store/gift-card-request/actions";
import {
  getGiftCardIntegrationListSelector,
  getStepperPagetSelector,
} from "../../store/gift-card-request/selectors";
import AppFooter from "../app-footer/AppFooter";
import AppHeaderPrivate from "../app-header-private/AppHeaderPrivate";
import ColorlibStepIcon from "./ColorlibStepIcon";
import ColorlibConnector from "./ColorlibConnector";
import GiftCardIntegrationItem from "./GiftCardIntegrationItem";
import ChooseAmount from "./ChooseAmount";

const ChooseGiftCard = () => {
  const dispatch = useDispatch();
  const giftCardIntegrationList = useSelector(
    getGiftCardIntegrationListSelector
  );
  const activeStep = useSelector(getStepperPagetSelector);

  console.log(giftCardIntegrationList);
  //LABELS
  const steps = ["Select a gift card", "Choose an amount", "Overview"];

  useEffect(() => {
    dispatch(fetchGiftCardIntegrationList());
  }, [dispatch]);

  return (
    <>
      <AppHeaderPrivate />
      <div
        className={
          activeStep === 0
            ? "background choose-gift-card-step-1"
            : "background choose-gift-card-step-2"
        }
      >
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
          {activeStep === 0 &&
            giftCardIntegrationList.map((element, i) => {
              return (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <GiftCardIntegrationItem {...element} />
                </Grid>
              );
            })}
          {activeStep === 1 && (
            <Grid item xs={12}>
              <ChooseAmount />
            </Grid>
          )}
        </Grid>
      </div>
      <AppFooter />
    </>
  );
};

export default ChooseGiftCard;
