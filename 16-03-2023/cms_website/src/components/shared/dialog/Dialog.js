import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  Slide,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./dialogStyle";
import actions from "../../../redux/actions";
const { addReportReturned, addIsusefulReturned } = actions;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(props.open);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!open) {
      dispatch(addReportReturned({ data: false }));
      dispatch(addIsusefulReturned({ data: false }));
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(props.open);
  }, [props]);

  const classes = useStyles();

  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      className={classes.root}
      style={{ direction: isRTL ? "rtl" : "ltr", textAlign: "start" }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Box
            className="close"
            onClick={handleClose}
            style={{ float: isRTL ? "left" : "right" }}
          >
            <IoClose />
          </Box>
        </Grid>
        <Grid item container>
          <Grid sm={8} xs={12} className="content">
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <Typography className="message">
                  {" "}
                  {props.message}
                  {props?.dots ? (
                    <span>
                      <span class="one">.</span>
                      <span class="two">.</span>
                      <span class="three">.</span>
                      <span class="four">.</span>
                      <span class="five">.</span>
                    </span>
                  ) : null}
                </Typography>
              </DialogContentText>
            </DialogContent>
            <Box className="btnContainer">
              <Button
                onClick={(e) => {
                  if (props?.setConfirmed) {
                    props?.setConfirmed(true);
                    handleClose();
                  } else handleClose();
                }}
              >
                {t("SERVICESPAGES.COOVERIFY.OK")}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={4} className={classes.icon}>
            <Box paddingTop={2} paddingRight={3} width={180} height={180}>
              <img src="/assets/images/modalImg.webp" />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}
