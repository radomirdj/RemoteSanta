import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import AlarmIcon from "@mui/icons-material/Alarm";
import React from "react";
import { IGiftCardIntegration } from "../../store/gift-card-request/types";
import { ChevronRight } from "@mui/icons-material";

const GiftCardIntegrationItem = (giftCardIntegration: IGiftCardIntegration) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #ffffff",
    borderRadius: "24px",
    p: 4,
  };

  return (
    <Card sx={{ maxWidth: 260 }} className="card-item">
      <CardMedia
        component="img"
        image={giftCardIntegration.image}
        alt=""
        className="card-image"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          className="card-title"
        >
          {giftCardIntegration.title}
        </Typography>
        {/*LABELS */}
        <Grid container>
          <Grid item xs={8} className="grid-vertical-align">
            <div>
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                className="card-link"
              >
                <u onClick={handleOpen}>Learn more</u>
              </Typography>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Card sx={style}>
                  <CardMedia
                    component="img"
                    image={giftCardIntegration.image}
                    alt=""
                    className="modal-card-image"
                  />
                  <Typography id="modal-modal-title" variant="h6">
                    {giftCardIntegration.title}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {giftCardIntegration.description}
                  </Typography>
                </Card>
              </Modal>
            </div>
          </Grid>
          <Grid item xs={4}>
            <IconButton className="chevron-icon-button">
              <ChevronRight />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GiftCardIntegrationItem;
