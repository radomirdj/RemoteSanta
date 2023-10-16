import {
  Button,
  Card,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import SignupBonusIllustration from "./../../assets/illustrations/signup-bonus-illustration.svg";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postSignupBonus } from "../../store/self-signup/actions";
import { USD_TO_POINTS_CONVERSION_RATE } from "../../utils/Const";

const AutomaticPointsDeliveryStep = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

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

  const onSubmit = (data: any) => {
    dispatch(
      postSignupBonus({
        signupPoints: Number(data.amount) * USD_TO_POINTS_CONVERSION_RATE,
      })
    );
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
            Signup Bonus Points
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <img
            src={SignupBonusIllustration}
            alt=""
            className="completement-step-illustration"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            id="modal-modal-title"
            variant="body2"
            className="completement-step-text"
          >
            Give your employees a special bonus when they join the app, so they
            can immediately begin Remote Santa adventure. Our recommended bonus
            range is between 5-10 USD per employee.
          </Typography>
        </Grid>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="completement-step-form"
        >
          <TextField
            error={errors.amount ? true : false}
            id="outlined-basic"
            label="Preffered Amount Per Employee"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  style={{ marginLeft: "-16px" }}
                >
                  $
                </InputAdornment>
              ),
            }}
            className={
              errors.amount
                ? "completement-step-input-with-error"
                : "completement-step-dollar-input"
            }
            type="number"
            {...register("amount", {
              required: true,
              min: 1,
            })}
          />

          {errors.amount?.type === "required" && (
            <Typography className="completement-step-error-fe">
              Amount is required.
            </Typography>
          )}
          {errors.amount?.type === "min" && (
            <Typography className="completement-step-error-fe">
              The minimum amount is 1 PTS.
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

export default AutomaticPointsDeliveryStep;
