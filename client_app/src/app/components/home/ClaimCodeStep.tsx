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

const ClaimCodeStep = () => {
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
    console.log("CODE");
  };

  return (
    <Card sx={style}>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            className="completement-step-title"
          >
            Claim Your Code
          </Typography>
        </Grid>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="completement-step-form"
        >
          <TextField
            error={errors.refferalCode ? true : false}
            id="outlined-basic"
            label="Refferal Code"
            variant="outlined"
            className={
              errors.amount
                ? "completement-step-input-with-error"
                : "completement-step-input"
            }
            {...register("refferalCode", {
              required: true,
            })}
          />

          {errors.refferalCode?.type === "required" && (
            <Typography className="completement-step-error-fe">
              Code is required.
            </Typography>
          )}
          <Button
            variant="contained"
            className="completement-step-button"
            disableRipple
            type="submit"
          >
            Claim code
          </Button>
        </form>
      </Grid>
    </Card>
  );
};

export default ClaimCodeStep;
