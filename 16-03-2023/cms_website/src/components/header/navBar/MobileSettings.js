import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDarkMode,
  increaseFont,
  decreaseFont,
  resetFont,
  setDirection,
} from "../../../redux/actionCreators/theme";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import LanguageIcon from "@material-ui/icons/Language";
import NightsStayOutlinedIcon from "@material-ui/icons/NightsStayOutlined";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import VolumeUpOutlinedIcon from "@material-ui/icons/VolumeUpOutlined";
import Fade from "@material-ui/core/Fade";
import { useTranslation } from "react-i18next";
import useStyles from "../../../styles/components/header/mobileSettings";

function MobileSettings() {
  const { t, i18n } = useTranslation();
  const {
    theme_reducer: {
      basicTheme: { currentTheme, isRTL, isDark },
    },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const classes = useStyles();
  return (
    <Fade in={true} timeout={400}>
      <Grid container className={classes.root}>
        <Grid item xs={12} className="borderD Top">
          <IconButton>
            <VolumeUpOutlinedIcon />
            <Box component="span">{t("HEADER.TOOLS.ACCESSIBILITY")}</Box>
          </IconButton>
        </Grid>
        <Grid container item className="borderD Top">
          <Grid item xs={4}>
            <IconButton
              onClick={() => {
                currentTheme.elements.fontSize.xl <
                  currentTheme.elements.fontSizeG[0] + 2 &&
                  dispatch(increaseFont());
              }}
            >
              A+
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => {
                currentTheme.elements.fontSize.xl >
                  currentTheme.elements.fontSizeG[0] - 2 &&
                  dispatch(decreaseFont());
              }}
            >
              A-
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => dispatch(setDarkMode({ isDark: !isDark }))}
            >
              {isDark ? <NightsStayIcon /> : <NightsStayOutlinedIcon />}
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12} className="borderD TopBot">
          <IconButton
            onClick={() => {
              dispatch(setDirection({ isRTL: !isRTL }));
              i18n.changeLanguage(isRTL ? "en" : "ar");
            }}
          >
            <LanguageIcon />
            <Box component="span">{t("HEADER.TOOLS.LANGUAGE")}</Box>
          </IconButton>
        </Grid>
        <Grid item xs={12} className="btnContainer">
          <Button
            variant="contained"
            onClick={() => {
              dispatch(resetFont());
            }}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </Fade>
  );
}

export default memo(MobileSettings);
