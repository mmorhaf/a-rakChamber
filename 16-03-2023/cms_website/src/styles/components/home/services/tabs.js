import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",

    [theme.breakpoints.down(768)]: {
      width: "100%",
    },

    "& header": {
      marginBottom: "0",
      backgroundColor: "transparent",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontWeight: "600",
      fontSize: theme.globals.fontSize.m,
      lineHeight: "27px",
      color: theme.palette.primary.main,
      boxShadow: "unset",

      "& div.MuiTabs-flexContainer": {
        justifyContent: "center",

        [theme.breakpoints.down(550)]: {
          justifyContent: "space-evenly",
        },
      },

      "& button.MuiTab-root": {
        width: "140px",
        maxWidth: "unset",
        minWidth: "unset",
        height: "42px",
        minHeight: "unset",
        boxSizing: "border-box",
        borderRadius: "35px",
        background: "rgba(255, 255, 255, 0.4)",
        marginRight: "15px",
        opacity: 1,

        [theme.breakpoints.down(600)]: {
          minWidth: "120px",
          width: "auto",
          height: "35px",
          marginRight: "0px",
        },

        "& span.MuiTab-wrapper": {
          color: theme.palette.primary.main,
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: theme.globals.fontSize.s,
          lineHeight: theme.direction === "rtl" ? "18px" : "27px",
          padding: "0",
          textTransform: "capitalize",
          "@media only screen and (max-device-width:1000px) and (max-device-height: 1500px)":
            {
              fontSize: theme.globals.fontSize.s - 4,
            },
          "@media only screen and (max-device-width: 1500px) and (max-device-height: 1000px)":
            {
              fontSize: theme.globals.fontSize.s - 4,
            },
          [theme.breakpoints.down(550)]: {
            fontSize: theme.globals.fontSize.s - 4,
          },
        },
      },

      "& button.Mui-selected.MuiTab-root": {
        background: `${theme.palette.primary.main}`,

        "& span.MuiTab-wrapper": {
          color: theme.globals.colors.white,
        },
      },

      "& span.MuiTabs-indicator": {
        height: "0",
      },
    },
  },

  eventsRoot: {
    top: "0px",
    position: "absolute",
  },
}));

export default useStyles;
