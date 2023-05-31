import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeTheme, darkTheme } from "./makeTheme";

const useTheme = () => {
  const {
    theme_reducer: {
      basicTheme: { currentTheme, isRTL, isDark },
    },
  } = useSelector((state) => state);

  const [theme, setTheme] = useState({});

  useEffect(() => {
    //const theme = makeTheme({ currentTheme, isRTL, isDark });
    const theme = isDark
      ? darkTheme({ currentTheme, isRTL, isDark })
      : makeTheme({ currentTheme, isRTL, isDark });
    setTheme(theme);
  }, [currentTheme, isRTL, isDark]);

  return theme;
};

export default useTheme;
