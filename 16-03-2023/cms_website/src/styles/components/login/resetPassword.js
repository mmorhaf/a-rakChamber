import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "700px",
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

      "& h1, & h2.message": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: theme.globals.fontSize.s,
        color: theme.palette.primary.main,
      },

      "& h1.head": {
        textTransform: "uppercase",
      },

      "& h2.message": {
        color: theme.palette.secondary.main,
        fontWeight: "normal",
        fontStyle: "italic",
        marginTop: "15px",
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

      "& div.divider + div": {
        marginBottom: "30px",
      },
    },

    "& div.wrapper": {
      justifyContent: "space-between",
    },

    "& div.controlContainer.fullname": {
      width: "100%",
    },

    "& div.controlContainer": {
      flexDirection: "column",
      width: "60%",

      [theme.breakpoints.down(585)]: {
        width: "100%",
      },

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

      "& div.select": {
        "& div.selectControl": {
          "& div.MuiSelect-select": {
            padding: "0 14px",
          },
        },
      },

      "& div.MuiFormControl-root": {
        height: "63px",

        "& div.MuiInputBase-root": {
          "& div.MuiInputAdornment-positionStart": {
            "& button.MuiButtonBase-root": {
              padding: "0",
            },
          },

          "& input.MuiOutlinedInput-input": {
            padding: "0",
          },
        },
      },

      "& div.MuiInputBase-root": {
        height: "40px",
        background: theme.globals.colors.pollOuterBox,
        borderRadius: "7px",

        "& fieldset": {
          borderWidth: 0,
        },
      },
    },

    "& div.validation.controlContainer": {
      width: "35%",

      [theme.breakpoints.down(585)]: {
        width: "100%",
      },
    },

    "& div.btnContainer": {
      width: "300px",
      marginRight: "auto",
      marginLeft: "auto",
      display: "flex",
      justifyContent: "space-evenly",
      marginTop: "15px",

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
            fontSize: theme.globals.fontSize.s - 2,
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
