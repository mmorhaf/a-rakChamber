import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeTheme,
  setDarkMode,
  increaseFont,
  decreaseFont,
  resetFont,
} from "../../../redux/actionCreators/theme";
import { themeList } from "../../../constants/theme";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../../styles/components/header/settingsModel";
import Divider from "@material-ui/core/Divider";
import { Grid } from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import NightsStayOutlinedIcon from "@material-ui/icons/NightsStayOutlined";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import { useTranslation } from "react-i18next";
import GoogleTranslate from "./GoogleTranslate";
import clsx from "clsx";
function DialogTitle(props) {
  const { children, onClose, ...other } = props;

  const classes = useStyles();

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography className={classes.rootTitle} component="h6">
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
}

export default function SettingsModal({
  open,
  toggleSettingModal,
  popoverTitle,
  popoverTitle2,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    theme_reducer: {
      basicTheme: { currentTheme, isRTL, isDark },
    },
  } = useSelector((state) => state);

  const [themes, setThemes] = useState([]);
  const [blindTheme, setBlindTheme] = useState([]);
  const [myTheme, setCurrentTheme] = useState(null);

  const handleClose = () => {
    toggleSettingModal();
  };
  const getThemeName = (name) => {
    let returnedName = isRTL ? "الثيم" : "Theme";
    switch (name) {
      case "default Theme": {
        returnedName = isRTL ? "الثيم الافتراضي" : "Default Theme";
        break;
      }
      case "Gold Theme": {
        returnedName = isRTL ? "الثيم الذهبي" : "Gold Theme";
        break;
      }
      case "Green Theme": {
        returnedName = isRTL ? "الثيم الأخضر" : "Green Theme";
        break;
      }
      case "Blind Theme": {
        returnedName = isRTL ? "عمى الألوان" : "Blind Theme";
        break;
      }
    }
    return returnedName;
  };
  useEffect(() => {
    setThemes(themeList);
  }, [isRTL]);

  useEffect(() => {
    let theme = localStorage.getItem("RakChamberTheme");
    if (theme) setCurrentTheme(theme);
  }, [isRTL]);

  const classes = useStyles();
  return (
    <Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.DialogWrap}
        disableAutoFocus={false}
        disableEnforceFocus={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {popoverTitle}
        </DialogTitle>
        <MuiDialogContent className={classes.DialogContent}>
          <Grid className={classes.fontButtonsWrap}>
            <Button
              className={classes.fontButtons}
              variant="contained"
              onClick={() => {
                currentTheme.elements.fontSize.xl <
                  currentTheme.elements.fontSizeG[0] + 2 &&
                  dispatch(increaseFont());
              }}
            >
              A+
            </Button>
            <Button
              className={classes.fontButtons}
              variant="contained"
              onClick={() => {
                dispatch(resetFont());
              }}
            >
              A
            </Button>
            <Button
              className={classes.fontButtons}
              variant="contained"
              onClick={() => {
                currentTheme.elements.fontSize.xl >
                  currentTheme.elements.fontSizeG[0] - 2 &&
                  dispatch(decreaseFont());
              }}
            >
              A-
            </Button>
          </Grid>
        </MuiDialogContent>
        <Divider variant="middle" />
        <DialogTitle id="customized-dialog-title">{popoverTitle2}</DialogTitle>
        <MuiDialogContent className={classes.DialogContent}>
          <Grid container className={classes.reverse}>
            <Grid item xs={12} />
            {themes &&
              themes.map((theme) => {
                return (
                  <Grid
                    key={theme.id}
                    className={classes.colorButtonsWrap}
                    item
                    sm={6}
                    xs={12}
                  >
                    <Button
                      className={classes.colorName}
                      onClick={() => {
                        if (isDark) {
                          dispatch(setDarkMode({ isDark: false }));
                        }
                        dispatch(changeTheme(theme));
                      }}
                    >
                      {getThemeName(theme.name)}
                    </Button>
                    <Button
                      className={classes.colorButtons}
                      variant="contained"
                      style={{
                        backgroundColor:
                          theme.name === "Blind Theme" ||
                          theme.name === "عمى الالوان"
                            ? "#fff"
                            : theme.elements.colors.primary,
                      }}
                      onClick={() => {
                        if (isDark) {
                          dispatch(setDarkMode({ isDark: false }));
                        }
                        localStorage.setItem("theme title", theme.name);
                        dispatch(changeTheme(theme));
                      }}
                    >
                      {theme.name === "Blind Theme" ||
                      theme.name === "عمى الالوان" ? (
                        localStorage.getItem("theme title") ===
                        "Blind Theme" ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )
                      ) : null}
                    </Button>
                  </Grid>
                );
              })}
          </Grid>
        </MuiDialogContent>
        <Divider variant="middle" />

        <MuiDialogContent className={classes.DialogContent}>
          <Grid
            container
            className={classes.block}
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Grid
              className={clsx(classes.colorButtonsWrap, classes.marginBottom16)}
              item
              xs={12}
              style={{ maxWidth: "50%" }}
            >
              <Typography
                className={classes.colorName}
                component="h6"
                onClick={() => dispatch(setDarkMode({ isDark: !isDark }))}
              >
                {t("HEADER.SETTINGS.NIGHT")}
              </Typography>
              <IconButton
                className={classes.colorDarkMode}
                variant="contained"
                onClick={() => dispatch(setDarkMode({ isDark: !isDark }))}
              >
                {isDark ? <NightsStayIcon /> : <NightsStayOutlinedIcon />}
              </IconButton>
            </Grid>
            <Grid
              id="gtt"
              className={clsx(
                classes.marginBottom8,
                classes.marginLeft16,
                classes.google
              )}
            >
              <GoogleTranslate />
            </Grid>
          </Grid>
        </MuiDialogContent>
      </Dialog>
    </Fragment>
  );
}
