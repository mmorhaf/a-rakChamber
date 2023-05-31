import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& div.MuiDialog-paperScrollPaper": {
      maxWidth: "800px",
      height: 400,
      display: "flex",
      flexDirection: "row",
      backgroundSize: "100% 500%!important",
      [theme.breakpoints.down(870)]: {
        height: 445,
      },
      [theme.breakpoints.down(840)]: {
        height: 390,
      },
      // [theme.breakpoints.down(775)]: {
      //   height: 315,
      // },
      // [theme.breakpoints.down(320)]: {
      //   height: 335,
      // },
      "& div.contentContainer": {
        width: "calc(100% - 275px)",
        [theme.breakpoints.down(870)]: {
          position: "absolute",
          width: "100%",
          zIndex: 5000,
          backdropFilter: "blur(3px)",
          backgroundColor: "#ffffff1a",
          height: "80%",
        },

        "& div.MuiDialogTitle-root": {
          marginTop: 8,
          "& h2": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: theme.globals.fontSize.xl,
            lineHeight: "49px",
            color: theme.palette.primary.main,
            [theme.breakpoints.down(840)]: {
              fontSize: theme.globals.fontSize.xl - 4,
            },
            [theme.breakpoints.down(775)]: {
              marginTop: 0,
              fontSize: theme.globals.fontSize.lg - 4,
            },
            [theme.breakpoints.down(710)]: {
              lineHeight: "35px",
            },
            [theme.breakpoints.down(635)]: {
              fontSize: theme.globals.fontSize.lg - 6,
            },
            [theme.breakpoints.down(346)]: {
              lineHeight: "23px",
            },
          },
        },

        "& div.MuiDialogContent-root": {
          // marginTop: 20,
          overflowY: "unset",

          "& p": {
            marginTop: 20,
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: theme.globals.fontSize.lg,
            lineHeight: "33px",
            color: theme.palette.primary.main,
            [theme.breakpoints.down(840)]: {
              marginTop: 0,
              fontSize: theme.globals.fontSize.lg - 4,
            },
            [theme.breakpoints.down(775)]: {
              marginTop: 0,
              fontSize: theme.globals.fontSize.s,
              lineHeight: "22px",
              marginBottom: 0,
            },
          },

          "& div.slider": {
            marginTop: 65,
            display: "flex",
            alignItems: "baseline",
            flexDirection: "column",
            [theme.breakpoints.down(635)]: {
              marginTop: 50,
            },
            [theme.breakpoints.down(340)]: {
              display: "block",
              marginTop: 60,
            },
            "& span.MuiSlider-root": {
              padding: "unset",
              height: 12,

              "& span.MuiSlider-rail": {
                height: "100%",
                borderRadius: 20,
                backgroundImage:
                  "linear-gradient(to right,#e5b859 0,#f9c946 20%,#aac268 40%,#82bf7a 62%,#70c081 81%,#21c09d 100%)",
                opacity: 1,
              },

              "& span.MuiSlider-track": {
                height: "100%",
                background: "transparent",
                borderRadius: 20,
              },

              "& span.MuiSlider-mark": {
                backgroundColor: "transparent",
              },

              "& span.MuiSlider-thumb": {
                width: "42px",
                height: "42px",
                backgroundImage:
                  "linear-gradient(to right,#aac268 30%,#82bf7a 62%,#70c081 100%)",
                boxShadow: "2px 0px 4px rgb(0 0 0 / 25%)",
                marginTop: "-9px",
                marginLeft: "-21px",
                "-webkit-transition":
                  "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                transition:
                  "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                top: "50%",
                "-webkit-transform": "translate(15%, -30%)",
                "-moz-transform": "translate(15%, -30%)",
                "-ms-transform": "translate(15%, -30%)",
                transform: "translate(15%, -30%)",

                "& span.MuiSlider-valueLabel": {
                  left: "calc(-50% - -25px)",
                },
              },
            },
            "& .MuiSlider-root": { color: "#aaa" },
          },
          "& textarea": {
            width: "430px",
            border: "none",
            borderRadius: "5px",
            marginTop: "8px",
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            outline: "none",
            padding: "8px",
            [theme.breakpoints.down(870)]: {
              width: "285px",
            },
            [theme.breakpoints.down(400)]: {
              width: "245px",
            },
            [theme.breakpoints.down(365)]: {
              width: "205px",
            },
          },
          "& .sendBtn": {
            border: "1px solid #fff",
            color: "#fff",
            textTransform: "none",
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            marginTop: "16px",
            fontSize: "16px",
            marginRight: "16px",
          },
        },
      },
      "& .afterStartRating": {
        "& div.MuiDialogTitle-root h2": { color: "#fff !important" },
        "& div.MuiDialogContent-root p": { color: "#fff !important" },
        "& div.percentage": { color: "#fff !important" },
      },
      "& div.iconContainer": {
        width: 325,

        "& div.icon": {
          background: "url(/assets/faces.svg) no-repeat",
          backgroundSize: "300px 15300px",
          opacity: "1!important",
          width: "100%!important",
          height: 300,
          position: "relative!important",
          [theme.breakpoints.down(360)]: {
            height: 290,
          },
        },

        "& div.percentage": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: theme.globals.fontSize.xl + 20,
          lineHeight: "65px",
          color: theme.palette.primary.main,
          textAlign: "center",
          [theme.breakpoints.down(600)]: {
            fontSize: theme.globals.fontSize.xl + 10,
            lineHeight: "100px",
          },
          [theme.breakpoints.down(380)]: {
            marginTop: 35,
            lineHeight: "65px",
          },
          [theme.breakpoints.down(346)]: {
            marginTop: 0,
          },
          [theme.breakpoints.down(340)]: {
            display: "none",
          },
        },
      },
    },
  },
  rate: {
    marginTop: 20,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    textTransform: "none",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontSize: "14px",
    height: 30,
    textTransform: "capitalize",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.secondary.main,
    border: "1px solid",
    display: "flex",
    minWidth: 80,
    position: "relative",
    [theme.breakpoints.down(340)]: {
      marginLeft: "34%",
      marginTop: 15,
    },
  },
  cancelBtn: {
    cursor: "pointer",
    fontSize: 24,
    color: theme.palette.primary.main,
    position: "absolute",
    right: 9,
    top: 8,
    zIndex: 5000,
  },
  closeBtn: {
    color: theme.globals.colors.white,
    border: `1px solid ${theme.palette.primary.main}`,
    marginTop: "24px",
    backgroundColor: theme.palette.primary.main,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    width: 105,
    "& .MuiButton-label": {
      transition: "color 500ms  cubic-bezier(0.215, 0.61, 0.355, 1)",
      color: "#fff",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "&:hover": {
      backgroundColor: "#fff",
      boxShadow: "none",
      border: "1px dashed #ccc",
      "& .MuiButton-label": {
        color: theme.palette.primary.main,
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      "& .MuiButton-endIcon": {
        transform: "translateY(-50%)",
        color: theme.palette.primary.main,
      },
    },
    [theme.breakpoints.down(600)]: {
      fontSize: theme.globals.fontSize.s - 2,
    },
  },
}));

export default useStyles;
