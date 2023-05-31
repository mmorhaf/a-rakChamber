import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, REDIRECT_URL } from "../../../constants/constant";
import useStyles from "../../../styles/components/shared/exitNotification/exitNotification";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const { t } = useTranslation();
  let { noThanks } = props;
  const dispatch = useDispatch();
  const handleClose = () => {
    sessionStorage.removeItem("clear");
    if (props?.setOpen) props?.setOpen(false);
    if (props?.setEditingFormVisible) props?.setEditingFormVisible(false);
    if (props?.setIsNewAppointment) props?.setIsNewAppointment(false);
    if (props?.routing)
      window.location.href = `${BASE_URL}/idshub/logout?redirect_uri=${REDIRECT_URL}`;
  };
  // useEffect(() => {
  //   setOpen(props.open);
  // }, [props]);

  const classes = useStyles();

  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  return (
    <Dialog
      open={props.open}
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
          <Grid xs={8} className="content">
            <DialogTitle>{t("SERVICESPAGES.COOVERIFY.DEAR")}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {noThanks ? null : t("SERVICESPAGES.COOVERIFY.THANKS")}
                <Typography className="message"> {props.message}</Typography>
              </DialogContentText>
            </DialogContent>
            <Box className="btnContainer">
              <Button onClick={handleClose}>
                {t("SERVICESPAGES.COOVERIFY.OK")}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={4} className="icon">
            <Box paddingTop={2} paddingRight={3} width={150} height={180}>
              <img src="/assets/images/modalImg.webp" />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}
