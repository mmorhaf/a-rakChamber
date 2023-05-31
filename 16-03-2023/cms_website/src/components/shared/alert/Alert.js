import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoClose, IoWarningOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useStyles from "./style";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Alert() {
  const history = useHistory();
  const { t } = useTranslation();
  let opened = sessionStorage?.getItem("opened");
  const [open, setOpen] = useState(true);
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  useEffect(() => {
    if (opened === "true") setOpen(false);
    else setOpen(true);
  }, []);

  const handleClose = (e) => {
    sessionStorage?.setItem("opened", "true");
    setOpen(false);
  };

  const exitHandler = (e) => {
    console.log("hello");
  };

  useEffect(() => {
    document
      .getElementById("root")
      .addEventListener("click", exitHandler, false);
  }, []);

  const classes = useStyles();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      className={classes.root}
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      <Grid container>
        <Grid item xs={12} className={classes.end}>
          <Box className="close" onClick={handleClose}>
            <IoClose />
          </Box>
        </Grid>
        <Grid item container>
          <Grid xs={9} className="content">
            <DialogTitle>{t("EXITMESSAGE.WARNING")}</DialogTitle>
            <DialogContent>
              <Typography>{t("EXITMESSAGE.NOTOFFICALWEBSITE")}</Typography>
              <Typography>{t("EXITMESSAGE.NOREQUEST")}</Typography>
              <Typography>{t("EXITMESSAGE.OFFICALWEBSITE")}</Typography>
            </DialogContent>
            <Box className="btnContainer">
              <a className={classes.link} href="https://www.rakchamber.ae/">
                {t("EXITMESSAGE.CLICK")}
              </a>
            </Box>
          </Grid>
          <Grid item xs={3} className="icon">
            <IoWarningOutline />
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}
