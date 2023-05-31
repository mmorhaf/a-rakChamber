export const makeTheme = ({ currentTheme, isRTL, isDark }) => {
  return {
    direction: isRTL ? "rtl" : "ltr",
    palette: {
      primary: {
        main: currentTheme.elements.colors.primary,
      },
      secondary: {
        main: currentTheme.elements.colors.secondary,
      },
      //USE FOR FONTS
      textMed: {
        main: currentTheme.elements.colors.textMed,
      },
    },
    globals: currentTheme.elements,
  };
};
export const darkTheme = ({ currentTheme, isRTL, isDark }) => {
  return {
    direction: isRTL ? "rtl" : "ltr",

    palette: {
      type: "dark",
      background: {
        default: "#0c0a0a",
      },
      primary: {
        main: currentTheme.elements.colors.darkPrimary,
      },
      secondary: {
        main: currentTheme.elements.colors.secondary,
      },
      //USE FOR FONTS
      textMed: {
        main: currentTheme.elements.colors.textMed,
      },
    },
    globals: {
      ...currentTheme.elements,
      colors: {
        ...currentTheme.elements.colors,
        bgWhite: "#000",
        blackColor: "#4668c5",
        bgGray: "#323232",
        textMed: "#4668c5",
        black: "#fff",
        grayBorder: "#ffffff3b",
      },
    },
  };
};

export const blindTheme = ({ currentTheme, isRTL }) => {
  return {
    direction: isRTL ? "rtl" : "ltr",
    palette: {
      type: "blind",
      background: {
        default: "#0c0a0a",
      },
      primary: {
        main: currentTheme?.elements?.colors?.blindPrimary,
      },
      secondary: {
        main: currentTheme?.elements?.colors?.secondary,
      },
      //USE FOR FONTS
      textMed: {
        main: currentTheme?.elements?.colors?.textMed,
      },
    },
    globals: currentTheme?.elements,
  };
};
