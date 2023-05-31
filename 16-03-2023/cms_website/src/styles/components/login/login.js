import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "720px",
    background: theme.globals.colors.white,
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 0 15px rgb(0 0 0 / 9%)",
    textAlign: "start",

    [theme.breakpoints.down(1300)]: {
      width: "625px",
      marginRight: "auto",
      marginLeft: "auto",
    },

    [theme.breakpoints.down(850)]: {
      width: "500px",
    },

    [theme.breakpoints.down(585)]: {
      width: "370px",
    },

    [theme.breakpoints.down(440)]: {
      width: "300px",
    },

    "& div.title": {
      marginBottom: "25px",

      "& h1": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: theme.globals.fontSize.s,
        color: theme.palette.primary.main,
        textTransform: "uppercase",
      },

      "& div.divider": {
        display: "flex",
        alignItems: "center",

        "& hr": {
          width: "100%",
          height: 1,

          backgroundColor: theme.palette.primary.main,
        },
      },
    },

    "& div.controlContainer": {
      flexDirection: "column",
      marginBottom: "10px",

      "& div.label": {
        "& label": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: theme.globals.fontSize.s,
          color: theme.palette.primary.main,
        },
      },

      "& div.MuiFormControl-root": {
        height: "63px",
      },

      "& div.MuiInputBase-root": {
        height: "40px",
        background: theme.globals.colors.pollOuterBox,
        borderRadius: "7px",

        "& input.MuiInputBase-input": {
          padding: 0,
        },

        "& fieldset": {
          borderWidth: 0,
        },
      },
    },

    "& div.forgotRemember": {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "35px",
      height: "34px",

      [theme.breakpoints.down(590)]: {
        flexDirection: "column",
      },

      "& p": {
        display: "flex",
        alignItems: "center",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: theme.globals.fontSize.s,
        lineHeight: "25px",
        color: theme.palette.primary.main,
        borderBottom: `3px solid ${theme.palette.secondary.main}`,

        [theme.breakpoints.down(590)]: {
          fontSize: theme.globals.fontSize.s - 2,
          width: "150px",
        },
      },

      "& p:hover": {
        cursor: "pointer",
      },

      "& label": {
        marginBottom: 0,
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: theme.globals.fontSize.s,
        lineHeight: "25px",
        color: theme.palette.primary.main,

        [theme.breakpoints.down(590)]: {
          fontSize: theme.globals.fontSize.s - 2,
        },

        "& span.MuiButtonBase-root": {
          [theme.breakpoints.down(590)]: {
            padding: "9px 9px 9px 0",

            "& svg": {
              width: "20px",
            },
          },
        },
      },
    },

    "& div.notRegister ": {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",

      "& p": {
        marginRight: "10px",
        marginBottom: 0,
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: theme.globals.fontSize.s,
        color: theme.palette.primary.main,

        [theme.breakpoints.down(590)]: {
          fontSize: theme.globals.fontSize.s - 2,
        },
      },

      "& p:first-letter": {
        textTransform: "capitalize",
      },

      "& a:first-letter": {
        textTransform: "capitalize",
      },

      "& a": {
        color: theme.palette.secondary.main,
        fontSize: theme.globals.fontSize.s,
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",

        [theme.breakpoints.down(590)]: {
          fontSize: theme.globals.fontSize.s - 2,
        },
      },
    },

    "& div.btnContainer": {
      width: "300px",
      marginRight: "auto",
      marginLeft: "auto",
      display: "flex",
      justifyContent: "space-evenly",

      [theme.breakpoints.down(590)]: {
        width: "235px",
      },

      "& button": {
        width: "141px",
        height: "41px",
        background: theme.globals.colors.white,
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "5px",

        [theme.breakpoints.down(590)]: {
          width: "110px",
          height: "35px",
        },

        "& span.MuiButton-label": {
          textTransform: "capitalize",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: theme.globals.fontSize.s,
          lineHeight: "22px",
          textAlign: "center",
          color: theme.palette.secondary.main,

          [theme.breakpoints.down(590)]: {
            lineHeight: "21px",
            fontSize: theme.globals.fontSize.s - 1,
          },
        },
      },

      "& button:nth-child(1)": {
        background: theme.palette.secondary.main,

        "& span.MuiButton-label": {
          color: theme.globals.colors.white,
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
        },
      },
    },
  },
}));

export default useStyles;
