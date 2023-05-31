import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    "& div.MuiContainer-root": {
      marginTop: "30px",

      "& div.requestBtn": {
        display: "flex",
        [theme.breakpoints.down(600)]: {
          justifyContent: "center",
        },
        "& button": {
          width: 185,
          height: 31,
          border: "1px solid #ABABAB",
          borderRadius: "5px",
          overflow: "hidden",

          "& span.MuiButton-label": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: theme.globals.fontSize.xs,
            lineHeight: 16,
            textTransform: "capitalize",
            color:
              theme.palette.type === "dark"
                ? theme.globals.colors.white
                : theme.palette.textMed.main,
          },

          "&:hover": {
            backgroundImage: "url(/assets/images/home/btn.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",

            "& .MuiButton-label": {
              color: theme.globals.colors.white,
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
            },
          },
        },
      },

      "& div.pagination": {
        marginBottom: "50px",
      },
    },

    "& div.comment": {
      marginTop: "16px!important",
      marginBottom: "32px!important",

      "& h2.commentTitle": {
        height: "45px",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize:
          theme.direction === "rtl"
            ? theme.globals.fontSize.lg
            : theme.globals.fontSize.s + 2,
        color:
          theme.palette.type === "dark"
            ? theme.globals.colors.white
            : theme.palette.textMed.main,
        marginBottom: "30px",
        marginTop: "10px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",

        [theme.breakpoints.down(700)]: {
          fontSize: theme.globals.fontSize.lg - 2,
        },
      },

      "& div.commentForm": {
        textAlign: "start",

        "& h4.required": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "500",
          fontSize:
            theme.direction === "rtl"
              ? theme.globals.fontSize.s
              : theme.globals.fontSize.s,
          lineHeight: "19px",
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
          "& div.label": {
            display: "flex",
            [theme.breakpoints.down(600)]: {
              display: "block",
            },
            "& label": {
              width: 175,
              fontWeight: "600",
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              // fontWeight: "600",
              fontSize:
                theme.direction === "rtl"
                  ? theme.globals.fontSize.s - 2
                  : theme.globals.fontSize.s - 2,
              lineHeight: "19px",
              color:
                theme.palette.type === "dark"
                  ? theme.globals.colors.white
                  : theme.palette.textMed.main,
              textTransform: "capitalize",
            },

            // "& div.uploadTitle": {
            //   marginBottom: "8px",
            //   width: 150,
            // },

            // "& div.uploadControl": {
            //   position: "relative",
            //   cursor: "pointer",
            //   height: "30px",

            //   "& span.uploadedName": {
            //     position: "absolute",
            //     left: "50px",
            //     top: "5px",
            //   },

            "& div.MuiInputAdornment-root svg": {
              color: theme.palette.primary.main,
              transform: "rotate(+309deg)",
              direction: "ltr",
            },
          },

          "& div.labelupload": {
            marginBottom: 30,

            "& label": {
              "& div.controlContainer": {
                display: "flex",
                width: "100%",
                [theme.breakpoints.down(600)]: {
                  display: "block",
                },
                "& div.uploadTitle": {
                  width: 175,
                  fontWeight: "600",
                  fontFamily:
                    theme.direction === "rtl"
                      ? theme.globals.fontFamily.ar
                      : theme.globals.fontFamily.en,
                  fontStyle: "normal",
                  // fontWeight: "600",
                  fontSize:
                    theme.direction === "rtl"
                      ? theme.globals.fontSize.s - 2
                      : theme.globals.fontSize.s - 2,
                  lineHeight: "19px",
                  color:
                    theme.palette.type === "dark"
                      ? theme.globals.colors.white
                      : theme.palette.textMed.main,
                  textTransform: "capitalize",
                  [theme.breakpoints.down(600)]: {
                    marginBottom: 12,
                  },
                },

                "& div.uploadControl": {
                  width: "100%",
                  cursor: "pointer",
                  position: "relative",

                  "& div.guide": {
                    WebkitBoxOrient: "vertical",
                    height: 15,
                    WebkitLineClamp: 1,
                    width: 350,
                    display: "-webkit-box",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "absolute",
                    top: 9,
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
                    [theme.breakpoints.down(370)]: {
                      width: 225,
                      height: 11,
                    },
                    [theme.breakpoints.between(960, 1260)]: {
                      left: 8,
                    },

                    "&:first-letter": {
                      textTransform: "uppercase",
                    },
                  },
                },
              },

              "& p.MuiFormHelperText-root": {
                marginLeft: "150px",
                marginTop: "17px",
              },
            },
          },

          "& div.uploadControl[disabled]": {
            "& span.uploadedName": {
              opacity: "0.5",
              fontWeight: "normal",
            },
          },
          "& .direction .MuiInputBase-root input": {
            direction: "ltr!important",
          },
          "& div.MuiFormControl-root": {
            marginBottom: "30px",
            "& .MuiInputBase-root > textarea": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
            },
            "& div.MuiInputBase-formControl": {
              "& input": {
                padding: "7.5px 14px",
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
              },
              "& :-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 30px white inset !important",
                WebkitTextFillColor: "#000!important",
              },
            },
          },

          "& div.inputField": {
            "& fieldset": {
              border: `1px solid ${theme.globals.colors.pollOuterBox}`,
              boxSizing: "border-box",
              borderRadius: "5px",
              borderLeft: "4px solid #263661",
            },

            "& p#description-comment-helper-text, & p#description-request-helper-text":
              {
                color: theme.palette.secondary.main,
                fontSize: theme.globals.fontSize.xs,
              },

            "& input#upload": {
              display: "none",
            },
          },

          "& div.desc.inputField": {
            "& fieldset": {
              borderLeft: `1px solid ${theme.globals.colors.pollOuterBox}`,
            },
          },

          "& div.inputField.upload": {
            marginBottom: "3px",
            position: "relative",

            "& div.MuiInputAdornment-root": {
              position: "absolute",
              top: "14px",
              right: 0,
              cursor: "pointer",
            },

            "& fieldset": {
              height: "35px",
            },
          },

          "& div.inputCaptchaMargin": {
            marginBottom: "5px",
          },

          "& p.errorMess": {
            color: theme.palette.secondary.main,
            fontSize: theme.globals.fontSize.xs,
          },

          "& div.captcha": {
            "& > div": {
              [theme.breakpoints.down(335)]: {
                paddingLeft: 32,
              },
            },
            "& > div > div > div > div > iframe": {
              [theme.breakpoints.down(335)]: {
                WebkitTransform: "scale(0.85) !important",
                WebkitTransformOrigin: "0 0 !important",
                marginLeft: theme.direction === "rtl" ? "-75px" : "-30px",
              },
            },
            "& div.MuiInputBase-root": {
              width: "240px",
            },
          },

          "& div.captchInputContainer": {
            marginTop: "30px",
          },

          "& div.captch-div": {
            display: "flex",

            "& button": {
              width: "30px",
              margin: 0,
              background: theme.globals.colors.secondaryDark,
            },

            "& canvas": {
              borderRadius: "4px",
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
    color:
      theme.palette.type === "dark"
        ? theme.globals.colors.white
        : theme.palette.secondary.main,
    border: "1px solid",
    display: "flex",

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

  search: {
    [theme.breakpoints.down(768)]: {
      marginRight: "7px",
    },
    [theme.breakpoints.down(600)]: {
      display: "block",
      marginBottom: 26,
      marginTop: 24,
      paddingLeft: "16px",
    },
    height: "auto",
    minHeight: "75px",
    display: "flex",
    backgroundColor: theme.globals.colors.bgWhite,
    paddingLeft: "32px",
    boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
    paddingBottom: "7px",
    borderRadius: "5px",
    marginBottom: 30,

    "& form": {
      width: "100%",
      display: "flex",
      [theme.breakpoints.down(600)]: {
        display: "block",
      },
    },
  },
  searchTitle: {
    textAlign: "start",

    "& .MuiTextField-root": {
      width: "95%",

      "& label.MuiFormLabel-root": {
        textTransform: "capitalize",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },

      "& input:placeholder": {
        textAlign: "start",
      },
      "& .MuiInputBase-root": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        "& input": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
        },
      },
    },
    "& .MuiInputBase-root > input": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
  searchSelect: {
    "& div.MuiFormControl-root": {
      width: "96%",
      textAlign: "start",
      [theme.breakpoints.down(600)]: {
        width: "95%",
        display: "flex",
      },
      "& label": {
        textTransform: "capitalize",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },

      "& div.MuiInputBase-root": {
        display: "flex",
        justifyContent: "flex-end",

        "& svg.MuiSelect-icon.MuiSvgIcon-root": {
          right: "unset!important",
          left: "unset!important",
        },
      },
    },
  },
  btns: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBtn: {
    height: 30,
    textTransform: "capitalize",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.secondary.main,
    border: "1px solid",
    display: "flex",
    minWidth: 95,
    position: "relative",
    [theme.breakpoints.down(600)]: {
      marginTop: 16,
      marginBottom: 26,
    },
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
  imageForm: {
    display: "flex",
    [theme.breakpoints.down(600)]: {
      display: "none",
    },
    "& img": {
      height: "fit-content",
      marginTop: "60px",
    },
  },
}));

export default useStyles;
