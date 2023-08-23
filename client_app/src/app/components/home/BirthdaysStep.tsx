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
import { useForm } from "react-hook-form";

const BirthdaysStep = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
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
              Preferred Meeting Platform
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
              {...register("platform", { required: true })}
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
          <TextField
            error={errors.amount ? true : false}
            id="outlined-basic"
            label="Budget For Each Employee’s Birthday Present "
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
