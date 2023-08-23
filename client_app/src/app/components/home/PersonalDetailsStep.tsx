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
import { useDispatch, useSelector } from "react-redux";
import { postPersonalDetails } from "../../store/self-signup/actions";
import { getCompletementStepsSelector } from "../../store/self-signup/selectors";
import PersonalDetailsIllustration from "./../../assets/illustrations/personal-details-illustration.svg";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createBirthdayFromUTCString, createUTCDate } from "../../utils/Utils";
import { PostPersonalDetailsPayload } from "../../store/self-signup/types";
import { useNavigate } from "react-router-dom";

const PersonalDetailsStep = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const completementStepList = useSelector(getCompletementStepsSelector);
  const allStepsIdMap = new Map<string, string>();
  completementStepList.forEach((completedStep) => {
    allStepsIdMap.set(completedStep.name, completedStep.id);
  });
  const [dateOfBirthValue, setDateOfBirthValue] = React.useState<Date>();
  const isDateValid = !!dateOfBirthValue;

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

  const createUTCBirthDate = (date: any) => {
    if (!date) return undefined;
    if (!(date.$d instanceof Date) || isNaN(+date.$d)) {
      return undefined;
    }
    return createUTCDate(2000, date.$M, date.$D);
  };

  const dateFieldValidate = (dateField: any) => {
    if (!dateField) return true;
    if (isNaN(dateField.$d)) return false;
    return true;
  };

  const onSubmit = (data: any) => {
    const birthDate = createUTCBirthDate(data.birthDate);
    let body: PostPersonalDetailsPayload = {
      gender: data.gender,
    };
    if (birthDate) body.birthDate = birthDate;
    dispatch(postPersonalDetails(body));
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
            Personal Details
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="body2"
            className="completement-step-text"
          >
            Let's meet! Tell us something more about yourself and enjoy the best
            experience!
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <img
            src={PersonalDetailsIllustration}
            alt=""
            className="completement-step-personal-details-illustration"
          />
        </Grid>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="completement-step-form"
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              control={control}
              name="birthDate"
              defaultValue={null}
              rules={{ validate: dateFieldValidate }}
              render={({ field }) => (
                <DatePicker
                  label="Date of birth"
                  value={field.value}
                  inputFormat="MM/DD"
                  onChange={(date) => {
                    field.onChange(date);
                    setDateOfBirthValue(createUTCBirthDate(date));
                  }}
                  className={
                    errors.birthDate
                      ? "completement-step-date-with-error split-input"
                      : "completement-step-input"
                  }
                  disableOpenPicker={true}
                  renderInput={(params: any) => <TextField {...params} />}
                />
              )}
            />
          </LocalizationProvider>

          {errors.birthDate?.type === "validate" && (
            <Typography className="completement-step-error-fe">
              Date is not valid.
            </Typography>
          )}
          {isDateValid && (
            <span className="completement-step-date-helper">
              {createBirthdayFromUTCString(dateOfBirthValue.toString() || "")}
            </span>
          )}

          <FormControl variant="outlined">
            <InputLabel id="genderLabel">Gender</InputLabel>
            <Select
              labelId="genderLabel"
              id="gender"
              defaultValue={"OTHER"}
              className={
                errors.gender
                  ? "completement-step-select-with-error"
                  : "completement-step-input"
              }
              label="Gender"
              {...register("gender", { required: true })}
            >
              <MenuItem value={"FEMALE"}>Female</MenuItem>
              <MenuItem value={"MALE"}>Male</MenuItem>
              <MenuItem value={"OTHER"}>Other</MenuItem>
            </Select>
          </FormControl>

          {errors.gender?.type === "required" && (
            <Typography className="completement-step-error-fe">
              Gender is required.
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

export default PersonalDetailsStep;
