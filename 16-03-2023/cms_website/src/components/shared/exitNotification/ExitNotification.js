import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Dialog,
  Box,
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Grid,
} from "@material-ui/core";
import { IoWarningOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import useStyles from "../../../styles/components/shared/exitNotification/exitNotification";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const history = useHistory();
  const { t } = useTranslation();
  const [exit, setExit] = useState({
    open: false,
    url: "",
  });

  const handleClose = useCallback(() => {
    setExit((prevState) => ({
      ...prevState,
      open: false,
    }));
  }, []);

  const exitHandler = (e) => {
    const target = e.target;

    const element = target.closest(`a`);

    if (element) {
      if (!element.hasAttribute("href")) return;
      const href = element.getAttribute("href");

      if (href.includes("tmp/services")) return;
      if (href.includes("api/stamp/download")) return;
      if (href.includes("api/ratifi/download")) return;

      if (!href.startsWith("http")) {
        window.location.href = href;
        // history.push(href);
        return;
      }

      e.preventDefault();
      setExit({
        url: href,
        open: true,
      });
    }
  };

  useEffect(() => {
    document
      .getElementById("root")
      .addEventListener("click", exitHandler, false);
  }, []);

  const handleYes = () => {
    //window.location.href = url;
    window.open(
      exit.url,
      exit.url.includes("stg-id.uaepass.ae") ||
        exit.url.includes("id.uaepass.ae") ||
        exit.url.includes("employee_test/ratified_uploads")
        ? "_self"
        : "_blank"
    );
    handleClose();
  };

  const classes = useStyles();

  return (
    <Dialog
      open={exit.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      className={classes.root}
    >
      <Grid container>
        <Grid item xs={12}>
          <Box className="close" onClick={handleClose}>
            <IoClose />
          </Box>
        </Grid>
        <Grid item container>
          <Grid xs={9} className="content">
            <DialogTitle>{t("EXITMESSAGE.HINT")}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {t("EXITMESSAGE.TITLE")}
              </DialogContentText>
            </DialogContent>
            <Box className="btnContainer">
              <Button onClick={handleClose}>{t("EXITMESSAGE.NO")}</Button>
              <Button className={classes.bgImg} onClick={handleYes}>
                {t("EXITMESSAGE.YES")}
              </Button>
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
