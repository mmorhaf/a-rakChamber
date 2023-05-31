import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDarkMode,
  increaseFont,
  decreaseFont,
  changeTheme,
} from "../../redux/actionCreators/theme";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import NightsStayOutlinedIcon from "@material-ui/icons/NightsStayOutlined";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import { themeList } from "../../constants/theme";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

function Settings() {
  const {
    theme_reducer: {
      basicTheme: { currentTheme, isRTL, isDark },
    },
  } = useSelector((state) => state);
  const [themes, setThemes] = useState(null);
  const [defaultTheme, setDefaultTheme] = useState(null);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let themes = [...themeList];
    setThemes(themes?.filter((item) => item?.name === "Blind Theme")[0]);
    setDefaultTheme(
      themes?.filter((item) => item?.name === "default Theme")[0]
    );
  }, [isRTL]);
  useEffect(() => {
    if (clicked === "blind") {
      localStorage.setItem("theme title", "Blind Theme");
      dispatch(changeTheme(themes));
    }
    if (clicked === "default") {
      localStorage.setItem("theme title", "default Theme");
      dispatch(changeTheme(defaultTheme));
    }
  }, [clicked]);

  return (
    <Box className="settingsContainer">
      <IconButton
        onClick={() => {
          currentTheme.elements.fontSize.xl <
            currentTheme.elements.fontSizeG[0] + 2 && dispatch(increaseFont());
        }}
      >
        A+
      </IconButton>
      <IconButton
        onClick={() => {
          currentTheme.elements.fontSize.xl >
            currentTheme.elements.fontSizeG[0] - 2 && dispatch(decreaseFont());
        }}
      >
        A-
      </IconButton>
      <IconButton onClick={() => dispatch(setDarkMode({ isDark: !isDark }))}>
        {isDark ? <NightsStayIcon /> : <NightsStayOutlinedIcon />}
      </IconButton>
      <IconButton
        onClick={() => setClicked(clicked === "blind" ? "default" : "blind")}
      >
        {localStorage.getItem("theme title") === "Blind Theme" ? (
          <VisibilityIcon />
        ) : (
          <VisibilityOffIcon />
        )}
      </IconButton>
    </Box>
  );
}

export default Settings;
