import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: `4000!important`,

    "& div.MuiBackdrop-root": {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },

    "& div.MuiDialog-paper": {
      width: "80%",
      maxWidth: 600,
      textAlign: "start",
      direction: theme.direction === "rtl" ? "rtl!important" : "ltr!important",

      "& h1.dialogTitl": {
        justifyContent: "space-between",
        height: 35,
        display: "flex",
        alignItems: "center",
        textTransform: "capitalize",
        paddingLeft: 10,
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,

        fontWeight: "bold",
        fontSize: theme.globals.fontSize.s + 2,
        background: theme.globals.colors.pollOuterBox,
        color: "#444444",

        [theme.breakpoints.down(700)]: {
          fontSize: theme.globals.fontSize.s + 2,
        },
      },

      "& h1.dialogTitl + div.MuiBox-root": {
        padding: 15,
      },

      "& h2": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontWeight: "600",
        fontSize: theme.globals.fontSize.s,
        color:
          theme.palette.type === "dark"
            ? theme.globals.colors.white
            : theme.palette.textMed.main,
        marginBottom: "35px",
        textTransform: "capitalize",
      },

      "& h4.required": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontWeight: "500",
        fontSize: theme.globals.fontSize.s,
        color:
          theme.palette.type === "dark"
            ? theme.globals.colors.white
            : theme.palette.textMed.main,
        marginBottom: "35px",
      },

      "& form.form": {
        "& div.icon": {
          "& div.image": {
            background: "url(/assets/images/comment.png)",
            width: "100px",
            height: "100px",
            backgroundSize: "cover",
          },
        },

        "& div.label": {
          display: "flex",
          justifyContent: "space-between",
          [theme.breakpoints.down(475)]: {
            display: "block",
          },
          "& label": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontWeight: 600,
            fontSize: theme.globals.fontSize.s - 2,
            color:
              theme.palette.type === "dark"
                ? theme.globals.colors.white
                : theme.palette.textMed.main,
          },
        },

        "& div.MuiInputBase-root:nth-child(-n+1)": {
          height: 30,
        },

        "& div.MuiFormControl-root": {
          marginBottom: "30px",
          width: "75%",
        },

        "& div.inputField": {
          "& input": {
            padding: "5px 14px",
          },

          "& fieldset": {
            border: "1px solid #ABABAB",
            borderRadius: "5px 4px 4px 3px",
            boxShadow: `inset 5px 0 0 0 ${theme.palette.primary.main}`,
          },
        },

        "& div.captcha": {
          "& > div > div > div > div > iframe": {
            [theme.breakpoints.down(410)]: {
              WebkitTransform: "scale(0.85) !important",
              WebkitTransformOrigin: "0 0 !important",
              marginLeft: theme.direction === "rtl" ? "-45px" : "0px",
            },
          },
          "& div.MuiInputBase-root": {
            width: "240px",
          },
        },

        "& div.captchInputContainer": {
          marginTop: "15px",

          "& div.captchaInput": {
            "& > div": {
              width: "240px",
              marginBottom: 0,
            },

            "& p.errorMess": {
              color: "red",
              height: "20px",
              marginTop: "10px",
            },
          },
        },

        "& div.captch-div": {
          display: "flex",

          "& canvas": {
            borderRadius: "4px",
          },

          "& button": {
            width: "30px",
            margin: 0,
            background: "white",
          },
        },

        "& div.btnContainer": {
          [theme.breakpoints.down(600)]: {
            textAlign: "center",
          },

          "& button.sendBtn": {
            boxShadow: "0px 2px 15px rgb(0 0 0 / 10%)",
            borderRadius: "5px",
            width: "165px",
            height: "40px",

            "& span.MuiButton-label": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: theme.globals.fontSize.m,
              lineHeight: "27px",
              color: theme.globals.colors.white,
              textTransform: "capitalize",
            },
          },

          "& button.sendBtn[disabled]": {
            background: theme.globals.colors.secondaryDark,
          },
        },
      },
    },
  },
}));

export default useStyles;
