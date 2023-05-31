export const makeTheme = (currentTheme, isRTL) => {
  return {
    direction: isRTL ? "rtl" : "ltr",
    palette: {
      type: currentTheme.type || "light",
      background: {
        default: currentTheme.background_default || "#E5E5E5",
        paper: currentTheme.background_paper || "#fff",
      },
      primary: {
        main: currentTheme.primary || "#263661",
      },
      secondary: {
        main: currentTheme.secondary || "#C7A54E",
      },

      error: {
        main: currentTheme.error || "#f44336",
      },
      info: {
        main: currentTheme.info || "#47799C",
      },
      success: {
        main: currentTheme.success || "#4caf50",
      },
      warning: {
        main: currentTheme.warning || "#ff9800",
      },
    },
    globals: {
      fontFamily_ar: currentTheme.fontFamily_ar || "Almarai",
      fontFamily_en:
        currentTheme.fontFamily_en || "'OpenSansRegular', sans-serif",
      textAlign_ar: currentTheme.textAlign_ar || "right",
      textAlign_en: currentTheme.textAlign_en || "left",
      fontSizeXL: currentTheme.fontSizeXL || 28,
      fontSizeL: currentTheme.fontSizeL || 24,
      fontSizeM: currentTheme.fontSizeM || 20,
      fontSizeS: currentTheme.fontSizeS || 16,
      fontSizeXS: currentTheme.fontSizeXS || 12,
      fontColor: currentTheme.fontColor || "#263661",
      contrastText: currentTheme.contrastText || "rgb(255,255,255)",
      contrastTextDark: currentTheme.contrastTextDark || "rgba(0,0,0,0.87)",
      bgWhite: currentTheme.contrastTextDark || "#fff",
    },
  };
};

export const darkTheme = ({ isRTL }) => {
  return {
    direction: isRTL ? "rtl" : "ltr",
    palette: {
      type: "dark",

      primary: {
        main: "#263661",
      },
      secondary: {
        main: "#fff",
      },
      background: {
        paper: "#2d353c",
        default: "#2d353c",
      },
    },
    status: {
      danger: "orange",
    },
    globals: {
      fontFamily_ar: "Almarai",
      fontFamily_en: "OpenSansRegular",
      textAlign_ar: "right",
      textAlign_en: "left",
      fontSizeXL: 22,
      fontSizeL: 18,
      fontSizeM: 16,
      fontSizeS: 14,
      fontSizeXS: 12,
      fontColor: "rgba(0, 0, 0, 0.87)",
    },
  };
};
