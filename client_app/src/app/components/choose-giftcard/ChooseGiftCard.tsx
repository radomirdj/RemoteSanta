import {
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
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
import { countryList } from "../../enums/CountryList";
import { getAuthUserSelector } from "../../store/auth/selectors";
import UnlockGiftCards from "./UnlockGiftCards";

const ChooseGiftCard = (props: any) => {
  const dispatch = useDispatch();
  const giftCardIntegrationList = useSelector(
    getGiftCardIntegrationListSelector
  );
  const user = useSelector(getAuthUserSelector);
  const [countryId, setCountryId] = React.useState<string>(props.countryId);
  const activeStep = useSelector(getStepperPagetSelector);
  const steps = ["Select a gift card", "Choose an amount", "Overview"];
  const [searchValue, setSearchValue] = React.useState("");

  useEffect(() => {
    dispatch(setGiftCardRequestResetData());
    dispatch(fetchGiftCardIntegrationList({ countryId }));
  }, [dispatch]);

  const giftCardIntegrationFilteredList = giftCardIntegrationList.filter(
    (giftCardIntegration: any) => {
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

  const setCountry = (id: string) => {
    dispatch(fetchGiftCardIntegrationList({ countryId: id }));
    setCountryId(id);
  };
  const showUnlockGiftCards =
    giftCardIntegrationList.length === 0 &&
    user.userBalance?.pointsActive === 0;

  return (
    <>
      <AppHeaderPrivate />
      <div className="background choose-gift-card">
        <Grid container spacing={4} className="grid-style">
          <Grid item xs={12}>
            {props.sendToUserId !== null && activeStep === 0 && (
              <Typography className="send-to-user-title">
                Pick a perfect gift card for {props.sendToUserName}
              </Typography>
            )}

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
            <Grid container className="menu-grid">
              <Grid item xs={12} md={4} className="country-item">
                <FormControl variant="outlined">
                  <InputLabel
                    id="countryLabel"
                    className="country-label"
                  ></InputLabel>
                  <Select
                    labelId="countryLabel"
                    id="country"
                    className="country-field"
                    label="Country"
                    value={countryId}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    {countryList
                      .filter(
                        (country) =>
                          country.hasGiftCards ||
                          [
                            "7810e53a-048f-4efa-9a1a-1b8042e6fdca",
                            props.countryId,
                          ].includes(country.id)
                      )
                      .map((country, i) => {
                        return (
                          <MenuItem value={country.id} key={country.id}>
                            {country.flagEmoji + " " + country.countryName}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={8} className="search-item">
                <InputBase
                  placeholder="Search for your favorite gift card..."
                  className="search-field"
                  startAdornment={<SearchIcon className="search-icon-style" />}
                  onChange={(e: any) => setSearchValue(e.target.value)}
                />
              </Grid>
            </Grid>
          )}
          {giftCardIntegrationFilteredList.length === 0 &&
            searchValue !== "" &&
            !showUnlockGiftCards && (
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
            giftCardIntegrationFilteredList.map((element: any, i: number) => {
              return (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <GiftCardIntegrationItem {...element} />
                </Grid>
              );
            })}
          {activeStep === 0 && showUnlockGiftCards && <UnlockGiftCards />}
          {activeStep === 1 && (
            <Grid item xs={12}>
              <ChooseAmount
                sendToEmail={props.sendToEmail}
                hasMessage={props.sendToUserId !== null}
              />
            </Grid>
          )}
          {activeStep === 2 && (
            <Grid item xs={12}>
              <GiftCardRequestOverview
                sendToEmail={props.sendToEmail}
                sendToUserId={props.sendToUserId}
              />
            </Grid>
          )}
        </Grid>
      </div>
      <AppFooter />
    </>
  );
};

export default ChooseGiftCard;
