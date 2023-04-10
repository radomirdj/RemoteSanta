import {
  Grid,
  InputBase,
  Step,
  StepLabel,
  Stepper,
  Typography,
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
import DeclineIllustration from "./../../assets/illustrations/decline-gift-card-request-illustration.svg";

const ChooseGiftCard = () => {
  const dispatch = useDispatch();
  const giftCardIntegrationList = useSelector(
    getGiftCardIntegrationListSelector
  );
  const activeStep = useSelector(getStepperPagetSelector);
  const steps = ["Select a gift card", "Choose an amount", "Overview"];
  const [searchValue, setSearchValue] = React.useState("");
  useEffect(() => {
    dispatch(setGiftCardRequestResetData());
    dispatch(fetchGiftCardIntegrationList());
  }, [dispatch]);

  const giftCardIntegrationFilteredList = giftCardIntegrationList.filter(
    (giftCardIntegration) => {
      if (!searchValue) return true;
      if (
        giftCardIntegration.title
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        giftCardIntegration.description
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase())
      )
        return true;
      return false;
    }
  );

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
                onChange={(e: any) => setSearchValue(e.target.value)}
              />
            </Grid>
          )}
          {giftCardIntegrationFilteredList.length === 0 &&
            searchValue !== "" && (
              <div className="empty-content">
                <Typography className="empty-title">
                  Oh no! We couldn’t find any results for your search. Please,
                  try a different search.
                </Typography>
                <img
                  src={DeclineIllustration}
                  alt=""
                  className="empty-illustration"
                />
              </div>
            )}
          {activeStep === 0 &&
            giftCardIntegrationFilteredList.map((element, i) => {
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
