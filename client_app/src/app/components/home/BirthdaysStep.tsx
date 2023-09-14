import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import BirthdayIllustration from "./../../assets/illustrations/birthday-illustration.svg";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { postBirthdaysSetup } from "../../store/self-signup/actions";
import { useDispatch } from "react-redux";
import { USD_TO_POINTS_CONVERSION_RATE } from "../../utils/Const";

const BirthdaysStep = () => {
  const [prefferedPlatform, setPrefferedPlatform] = React.useState<string>("");
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  const convertTimeZone = (date: any, tzString: string) => {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  };

  const onSubmit = (data: any) => {
    dispatch(
      postBirthdaysSetup({
        preferredMeetingPlatform:
          data.platform === "OTHER" ? data.customPlatform : data.platform,
        preferredTimeDetails: String(
          convertTimeZone(
            data.prefferedTime.toLocaleString(),
            "Europe/Belgrade"
          )
        ),
        bugetInPoints: Number(data.amount) * USD_TO_POINTS_CONVERSION_RATE,
      })
    );
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #ffffff",
    borderRadius: "24px",
    p: 6,
  };

  return (
    <Card sx={style}>
      <Grid container>
        <Grid item xs={9}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            className="completement-step-title"
          >
            Birthdays
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="body2"
            className="completement-step-text"
          >
            Let Remote Santa plan your fantastic birthday bash! Just share a few
            details for the perfect setup and watch the magic unfold.
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <img
            src={BirthdayIllustration}
            alt=""
            className="completement-step-illustration"
          />
        </Grid>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="completement-step-form"
        >
          <FormControl variant="outlined">
            <InputLabel id="platformLabel">
              Preferred meeting platform
            </InputLabel>
            <Select
              labelId="platformLabel"
              id="platform"
              className={
                errors.platform
                  ? "completement-step-select-with-error"
                  : "completement-step-input"
              }
              label="Platform"
              {...register("platform", {
                required: true,
                onChange: (e) => setPrefferedPlatform(e.target.value),
              })}
            >
              <MenuItem value={"TEAMS"}>Microsoft Teams</MenuItem>
              <MenuItem value={"GOOGLE"}>Google Meets</MenuItem>
              <MenuItem value={"OTHER"}>Other</MenuItem>
            </Select>
          </FormControl>

          {errors.platform?.type === "required" && (
            <Typography className="completement-step-error-fe">
              Platform is required.
            </Typography>
          )}
          {prefferedPlatform === "OTHER" && (
            <TextField
              error={errors.customPlatform ? true : false}
              id="outlined-basic"
              label="Please type your preffered meeting platform "
              variant="outlined"
              className={
                errors.customPlatform
                  ? "completement-step-input-with-error"
                  : "completement-step-input"
              }
              {...register("customPlatform", {
                required: true,
              })}
            />
          )}
          {errors.customPlatform?.type === "required" && (
            <Typography className="completement-step-error-fe">
              Your preffered meeting platform is
            </Typography>
          )}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              control={control}
              name="prefferedTime"
              defaultValue={null}
              rules={{ required: true }}
              render={({ field }) => (
                <TimePicker
                  label="Preffered time for virtual parties"
                  value={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                  className={
                    errors.prefferedTime
                      ? "completement-step-date-with-error split-input"
                      : "completement-step-input"
                  }
                  renderInput={(params: any) => <TextField {...params} />}
                />
              )}
            />
          </LocalizationProvider>

          {errors.prefferedTime?.type === "required" && (
            <Typography className="completement-step-error-fe">
              Time is required, but you can change it any time or contact us to
              provide any other details.
            </Typography>
          )}

          <TextField
            error={errors.amount ? true : false}
            id="outlined-basic"
            label="Budget for each employee’s birthday present "
            variant="outlined"
            placeholder="USD"
            className={
              errors.amount
                ? "completement-step-input-with-error"
                : "completement-step-input"
            }
            type="number"
            {...register("amount", {
              required: true,
              min: 1,
            })}
          />

          {errors.amount?.type === "required" && (
            <Typography className="completement-step-error-fe">
              Budget is required, but you can set it to 0.
            </Typography>
          )}
          {errors.amount?.type === "min" && (
            <Typography className="completement-step-error-fe">
              The minimum budget is 0 PTS.
            </Typography>
          )}
          <Button
            variant="contained"
            className="completement-step-button"
            disableRipple
            type="submit"
          >
            Save
          </Button>
        </form>
      </Grid>
    </Card>
  );
};

export default BirthdaysStep;
