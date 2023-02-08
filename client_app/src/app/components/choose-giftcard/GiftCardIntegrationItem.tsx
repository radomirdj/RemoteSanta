import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Link,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";
import { IGiftCardIntegration } from "../../store/gift-card-request/types";
import { ChevronRight } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setGiftCardRequestIntegration } from "../../store/gift-card-request/actions";

const GiftCardIntegrationItem = (giftCardIntegration: IGiftCardIntegration) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

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

  const onSubmit = () => {
    dispatch(
      setGiftCardRequestIntegration({ integration: giftCardIntegration })
    );
  };

  return (
    <Card sx={{ maxWidth: 218 }} className="card-item">
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
                  <Grid container>
                    <Grid item xs={7}>
                      <Typography id="modal-modal-title" variant="h6">
                        {giftCardIntegration.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <CardMedia
                        sx={{ mr: 2 }}
                        component="img"
                        image={giftCardIntegration.image}
                        alt=""
                        className="modal-card-image"
                      />
                    </Grid>
                  </Grid>
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    {giftCardIntegration.description}
                  </Typography>
                  <Link
                    href={giftCardIntegration.website}
                    target="_blank"
                    className="modal-website-link"
                  >
                    {giftCardIntegration.website}
                  </Link>
                </Card>
              </Modal>
            </div>
          </Grid>
          <Grid item xs={4}>
            <IconButton className="chevron-icon-button" onClick={onSubmit}>
              <ChevronRight />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GiftCardIntegrationItem;
