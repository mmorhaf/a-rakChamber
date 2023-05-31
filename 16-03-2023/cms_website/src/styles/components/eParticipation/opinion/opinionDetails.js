import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: "auto",
    marginLeft: "auto",

    [theme.breakpoints.down(1300)]: {
      width: "100%",
    },

    "& div.MuiContainer-root": {
      marginTop: "30px",

      "& div.pagination": {
        marginBottom: "50px",
      },
    },

    "& div.opinionDetails": {
      marginTop: "50px",

      "& div.opinionDetailsContainer": {
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "start",
      },
    },

    "& h2.heading": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: theme.globals.fontSize.s,
      lineHeight: "22px",
      color:
        theme.palette.type === "dark"
          ? theme.globals.colors.white
          : theme.palette.textMed.main,
      textTransform: "capitalize",
      wordSpacing: "4px",
      marginBottom: "10px",
    },

    "& span.fullDate": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontStyle: "normal",
      textTransform: "capitalize",
      fontSize: theme.globals.fontSize.s - 2,
      lineHeight: "19px",
      color: "#A7A7A7",
      marginTop: "15px",
      display: "block",
      marginBottom: "35px",
      // direction: "ltr!important",
      display: "flex",
      // flexDirection: theme.direction === "rtl" ? "row-reverse" : "row",
    },

    "& div.paragraph": {
      marginBottom: "50px",
      whiteSpace: "break-spaces",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontSize: theme.globals.fontSize.s - 2,
      fontWeight: "normal",
      lineHeight: "19px",
      textAlign: "justify",
      color:
        theme.palette.type === "dark"
          ? theme.globals.colors.white
          : theme.palette.textMed.main,

      "& h3.title": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontSize: theme.globals.fontSize.s - 1,
        fontWeight: "bold",
        lineHeight: "19px",
        textAlign: "justify",
        marginBottom: "5px",
        color:
          theme.palette.type === "dark"
            ? theme.globals.colors.white
            : theme.palette.textMed.main,
      },

      "& p.content": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: theme.globals.fontSize.s - 2,
        lineHeight: "19px",
        textAlign: "justify",
        color:
          theme.palette.type === "dark"
            ? theme.globals.colors.white
            : theme.palette.textMed.main,
        wordSpacing: "2px",
        letterSpacing: "0.2px",
      },
    },

    "& div.comment": {
      "& h2.commentTitle": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,

        fontWeight: "bold",
        fontSize: theme.globals.fontSize.s + 2,

        color:
          theme.palette.type === "dark"
            ? theme.globals.colors.white
            : theme.palette.textMed.main,
        marginBottom: "20px",
        marginTop: "10px",

        [theme.breakpoints.down(700)]: {
          fontSize: theme.globals.fontSize.s + 2,
        },
      },

      "& div.commentForm": {
        textAlign: "start",

        "& .MuiOutlinedInput-input": {
          padding: "10.5px 14px",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
        },
        "& :-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 30px white inset !important",
          WebkitTextFillColor: "#000!important",
        },
        "& .icon": {
          display: "flex",
          alignItems: "center",
          [theme.breakpoints.down(600)]: {
            display: "none",
          },
        },

        "& .MuiOutlinedInput-root": {
          // borderLeft: "3px solid #263661",
        },

        "& h4.required": {
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
        },

        "& form.form": {
          "& .MuiFormHelperText-root": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
          },
          "& div.description": {
            [theme.breakpoints.down(600)]: {
              marginTop: 35,
            },
          },
          "& div.label": {
            display: "flex",
            [theme.breakpoints.down(600)]: {
              flexDirection: "column",
            },
            "& label": {
              width: "170px",
              // height: "35px",
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontSize: theme.globals.fontSize.s - 2,
              fontWeight: 600,
              color:
                theme.palette.type === "dark"
                  ? theme.globals.colors.white
                  : theme.palette.textMed.main,
            },
          },

          "& div.uploadContainer": {
            marginBottom: "16px",
            [theme.breakpoints.down(600)]: {
              flexDirection: "column",
              marginBottom: "35px",
            },
            "& label": {
              width: "100%!important",
            },

            "& div.uploadTitle": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: theme.globals.fontSize.s,
              color: "#444444",
              textAlign: "start",
            },

            "& div.uploadControl": {
              position: "relative",
              height: "40px",
              border: "1px solid #ABABAB",
              borderRadius: "5px 4px 4px 3px",
              borderLeft: `3px solid #263661`,

              "& input": {
                display: "none",
              },

              "& div.guide": {
                cursor: "pointer",
                position: "absolute",
                top: "14px",
                left: 13,
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: theme.globals.fontSize.xs,
                color: "#444444",
                textAlign: "start",
              },

              "& svg": {
                position: "absolute",
                right: 10,
                top: 14,
                color: theme.palette.primary.main,
                cursor: "pointer",
                transform: "scale(1)",
                transition: "transform 0.4s",

                "&:hover": {
                  transform: "scale(1.3)",
                },
              },
            },
          },

          "& div.MuiFormControl-root": {
            marginBottom: "30px",
            "& .MuiFormHelperText-root.Mui-error": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
            },
          },

          "& div.inputField": {
            "& fieldset": {
              border: `1px solid ${theme.globals.colors.pollOuterBox}`,
              boxSizing: "border-box",
              borderRadius: "5px",
              borderLeft: "3px solid #263661",
            },
          },

          "& div.inputField.comment": {
            "& div.MuiOutlinedInput-root": {
              borderLeft: "unset",
              "& > textarea": {
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
              },
            },
          },

          "& div.captcha": {
            "& > div": {
              [theme.breakpoints.down(335)]: {
                paddingLeft: 32,
              },
            },
            "& > div > div > div > div > iframe": {
              position: "absolute",
              left: "0px",
              // marginLeft: "14px",
              [theme.breakpoints.up(1310)]: {
                position: "relative",
              },
              [theme.breakpoints.down(1310)]: {
                marginLeft: "14px",
              },
              [theme.breakpoints.down(335)]: {
                left: theme.direction === "rtl" ? "-40px" : "0px",
                WebkitTransform: "scale(0.85) !important",
                WebkitTransformOrigin: "0 0 !important",
              },
            },
            [theme.breakpoints.down(600)]: {
              justifyContent: "center",
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
  },

  send: {
    marginTop: "30px",
    height: 30,
    textTransform: "capitalize",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid",
    display: "flex",
    marginBottom: 16,
    color:
      theme.palette.type === "dark"
        ? theme.globals.colors.white
        : theme.palette.secondary.main,

    minWidth: 100,
    position: "relative",
    "&:hover": {
      backgroundImage: "url(/assets/images/home/btn.png)",
      color: "white",
    },
    "& .MuiButton-label": {
      width: "auto",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
  image: {
    display: "flex",
    alignItems: "baseline",
    height: "100%",
    marginTop: "35px",
    [theme.breakpoints.down(600)]: {
      display: "none",
    },
    "& img": {
      width: "125px",
    },
  },
  imageContainer: {
    display: "flex",
    alignItems: "baseline",
    [theme.breakpoints.down(600)]: {
      display: "none",
    },
    "& img": {
      objectFit: "contain",
      width: "100px",
      marginTop: "47px",
    },
  },
  textSection: {
    display: "flex",

    flexDirection: "column",
    textAlign: "start",

    "& h2": {
      color:
        theme.palette.type === "dark"
          ? theme.globals.colors.white
          : "#505050 !important",
    },

    "& span.heading, & span.heading *": {
      // maxWidth: "100%",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: theme.globals.fontSize.s,
      lineHeight: "27px",
      color:
        theme.palette.type === "dark"
          ? theme.globals.colors.white
          : "#505050 !important",
    },
  },
  marginBottom: {
    [theme.breakpoints.down(600)]: {
      marginBottom: "35px",
    },
  },
}));

export default useStyles;
