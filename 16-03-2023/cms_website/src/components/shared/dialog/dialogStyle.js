import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& div.MuiDialog-container": {
      "& div.MuiPaper-root": {
        backgroundImage: "url(/assets/images/exit.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        maxWidth: "700px",
        minWidth: 550,
        [theme.breakpoints.down(600)]: {
          minWidth: "auto",
          width: "auto",
          overflow: "hidden",
        },
        "& div.close": {
          width: "19px",
          height: "28px",
          color: theme.palette.primary.main,
          opacity: 1,
          cursor: "pointer",
          padding: "7px 30px 5px 0",
        },

        "& div.content": {
          "& div.MuiDialogTitle-root": {
            paddingTop: 0,
            paddingBottom: 0,

            "& h2": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: theme.globals.fontSize.lg,
              lineHeight: "41px",
              color: theme.palette.primary.main,
            },
          },

          "& div.MuiDialogContent-root": {
            "& p": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: theme.globals.fontSize.m,
              lineHeight: "33px",
              color: theme.palette.primary.main,
            },
            "& .message": {
              fontSize: theme.globals.fontSize.s,
              fontWeight: 500,
              textTransform: "capitalize",
              "& .one": {
                fontSize: "40px",
                opacity: 0,
                animationDelay: "0.0s",
                animation: "$dot 1.3s infinite",
                animationFillMode: "forwards",
              },

              "& .two": {
                fontSize: "40px",
                opacity: 0,
                animationDelay: "0.2s",
                animation: "$dot 1.3s infinite",
                animationFillMode: "forwards",
              },

              "& .three": {
                fontSize: "40px",
                opacity: 0,
                animationDelay: "0.3s",
                animation: "$dot 1.3s infinite",
                animationFillMode: "forwards",
              },
              "& .four": {
                fontSize: "40px",
                opacity: 0,
                animationDelay: "0.4s",
                animation: "$dot 1.3s infinite",
                animationFillMode: "forwards",
              },
              "& .five": {
                fontSize: "40px",
                opacity: 0,
                animationDelay: "0.5s",
                animation: "$dot 1.3s infinite",
                animationFillMode: "forwards",
              },
            },
          },

          "& div.btnContainer": {
            padding: "8px 24px 70px 24px",

            "& button": {
              width: 112,
              height: 30,
              border: "1px solid #ABABAB",
              boxSizing: "border-box",
              borderRadius: "5px",

              "& span.MuiButton-label": {
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: theme.globals.fontSize.s - 2,
                lineHeight: "19px",
                color: theme.globals.colors.textMed,
                textTransform: "capitalize",
              },

              "&:hover": {
                backgroundImage: "url(/assets/images/home/btn.png)",

                "& span.MuiButton-label": {
                  color: theme.globals.colors.white,
                  fontFamily:
                    theme.direction === "rtl"
                      ? theme.globals.fontFamily.ar
                      : theme.globals.fontFamily.en,
                },
              },
            },

            "& button:first-of-type": {
              marginRight: 20,
            },
          },
        },

        "& div.icon": {
          // display: "flex",
          // alignItems: "self-start",

          "& svg": {
            color: "#FFCC33",
            fontSize: 115,
          },
        },
      },
    },
  },
  icon: {
    [theme.breakpoints.down(600)]: {
      display: "none",
    },
  },
  "@keyframes dot": {
    "0%": {
      opacity: "0",
    },
    "50%": {
      opacity: "0",
    },

    "100%": {
      opacity: "1",
    },
  },
}));

export default useStyles;
