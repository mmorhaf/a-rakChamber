import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginTop: "70px",
    marginRight: "auto",
    marginLeft: "auto",

    "& div.borderD": {
      height: "60px",
      display: "flex",

      "& svg": {
        marginRight: "10px",
      },
    },

    "& div.borderD:nth-child(2)": {
      "& div.MuiGrid-root": {
        display: "flex",
        alignItems: "center",

        "& button": {
          width: "100%",
          height: "65%",
          display: "flex",
          justifyContent: "start",
          borderRadius: 0,
        },
      },

      "& div.MuiGrid-root:nth-child(-n+2)": {
        "& button": {
          borderRight: "1px solid rgba(255, 255, 255, 0.5)",
        },
      },
    },

    "& div.borderD.Top": {
      borderTop: "1px solid rgba(255, 255, 255, 0.5)",
    },

    "& div.borderD.TopBot": {
      borderTop: "1px solid rgba(255, 255, 255, 0.5)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
    },

    "& button": {
      "& svg": {
        color: theme.globals.colors.white,
      },

      "& span.MuiBox-root, & span.MuiIconButton-label": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: theme.globals.fontSize.s - 2,
        lineHeight: "19px",
        textAlign: "center",
        color: theme.globals.colors.white,
      },

      "& span.MuiIconButton-label": {
        fontSize: theme.globals.fontSize.m - 2,
      },
    },

    "& div.btnContainer ": {
      marginTop: "50px",

      "& button": {
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: "3px",
        width: "74px",
        height: "26px",

        "& span.MuiButton-label": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: theme.globals.fontSize.xs,
          lineHeight: "16px",
          color: theme.globals.colors.white,
          textTransform: "capitalize",
        },
      },
    },
  },
}));

export default useStyles;
