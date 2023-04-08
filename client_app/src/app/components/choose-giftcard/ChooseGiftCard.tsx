import {
  Grid,
  InputAdornment,
  InputBase,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGiftCardIntegrationList,
  setGiftCardRequestResetData,
} from "../../store/gift-card-request/actions";
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
import GiftCardRequestOverview from "./GiftCardRequestOverview";
import SearchIcon from "@mui/icons-material/Search";

const ChooseGiftCard = () => {
  const dispatch = useDispatch();
  const giftCardIntegrationList = useSelector(
    getGiftCardIntegrationListSelector
  );
  const activeStep = useSelector(getStepperPagetSelector);
  const steps = ["Select a gift card", "Choose an amount", "Overview"];

  useEffect(() => {
    dispatch(setGiftCardRequestResetData());
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
          {activeStep === 0 && (
            <Grid item xs={12} className="search-item">
              <InputBase
                placeholder="Search for your favorite gift card..."
                className="search-field"
                startAdornment={<SearchIcon className="search-icon-style" />}
              />
            </Grid>
          )}
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
          {activeStep === 2 && (
            <Grid item xs={12}>
              <GiftCardRequestOverview />
            </Grid>
          )}
        </Grid>
      </div>
      <AppFooter />
    </>
  );
};

export default ChooseGiftCard;
