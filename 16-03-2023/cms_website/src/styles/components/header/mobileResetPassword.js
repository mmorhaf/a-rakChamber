import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "700px",
    textAlign: "start",

    [theme.breakpoints.down(1300)]: {
      width: "625px",
      marginRight: "auto",
      marginLeft: "auto",
    },

    [theme.breakpoints.down(900)]: {
      marginTop: "45px",
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

    "& div.wrapper": {
      flexDirection: "column",

      "& h1.message": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontSize: theme.globals.fontSize.s,
        color: theme.palette.secondary.main,
        fontWeight: "normal",
        fontStyle: "italic",
        marginBottom: "30px",
      },
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
          fontWeight: "normal",
          fontSize: theme.globals.fontSize.s,
          color: theme.globals.colors.white,
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
          height: "40px",
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "7px",

          "& div.MuiInputAdornment-positionStart": {
            "& span.MuiIconButton-label": {
              "& svg": {
                color: theme.globals.colors.white,
              },
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
      display: "flex",
      justifyContent: "start",
      marginTop: "15px",

      [theme.breakpoints.down(590)]: {
        width: "235px",
      },

      "& button": {
        width: "141px",
        height: "41px",
        background: theme.globals.colors.white,
        border: `1px solid ${theme.palette.primary.main}`,
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
          fontWeight: "500",
          fontSize: theme.globals.fontSize.s,
          lineHeight: "22px",
          textAlign: "center",
          color: theme.palette.primary.main,

          [theme.breakpoints.down(590)]: {
            lineHeight: "21px",
            fontSize: theme.globals.fontSize.s - 1,
          },
        },
      },

      "& button:nth-child(1)": {
        background: theme.palette.primary.main,
        marginRight: "15px",
        marginLeft: "0",

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
