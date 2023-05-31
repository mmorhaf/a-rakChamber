import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  whiteBox: {
    color: "#fff",
    width: "100%",
    textAlign: "center",
    paddingBottom: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: theme.globals.fontSize.s + 40,
    [theme.breakpoints.down(600)]: {
      fontSize: theme.globals.fontSize.s + 14,
    },
    "&:before ": {
      position: "absolute",
      content: '""',
      backgroundColor: "#ffffff6e",
      height: 6,
      top: "66px",
      width: "410px",
      zIndex: "1200",
      [theme.breakpoints.down(600)]: {
        width: "195px",
      },
    },
  },
  root: {
    marginLeft: "auto",
    marginRight: "auto",

    position: "relative",

    "& button.left, & button.right": {
      width: "40px",
      height: "40px",
      position: "absolute",
      borderRadius: "50%",
      top: "calc(100% - 50% - 23px)",
      opacity: 1,

      "& svg": {
        width: "30px",
        height: "30px",
        color: theme.globals.colors.white,
      },
    },

    "& button.left": {
      left: "-60px",
      [theme.breakpoints.down(600)]: {
        left: "-50px",
      },
    },

    "& button.right": {
      right: "-60px",
      [theme.breakpoints.down(600)]: {
        right: "-50px",
      },
    },

    "& button.Mui-disabled": {
      opacity: 0.5,
    },

    "& ul": {
      width: "100%",
      overflow: "hidden",
      flexDirection: "row",
      position: "relative",
      paddingRight: 0,
      paddingLeft: 0,
      scrollBehavior: "smooth",
    },

    "& li:first-child": {
      "& div:nth-child(2)": {
        width: "55px",
      },

      "& div.MuiTimelineOppositeContent-root.top": {
        height: "115px",
        marginTop: "32px",
      },

      "& div.MuiTimelineOppositeContent-root.bottom": {
        height: "115px",
        marginBottom: "25px",
        marginTop: 0,
      },
    },

    "& li.MuiTimelineItem-root": {
      display: "unset",
      height: "300px",

      "& div.MuiTimelineContent-root": {
        padding: "0",
        background: "rgba(255, 255, 255, 0.75)",
        boxShadow: " 0px 4px 30px rgb(0 0 0 / 10%)",
        width: "234px",
        height: "115px",
        marginTop: "25px",
        marginLeft: "4px",
        display: "flex",
        textAlign: "start",
        [theme.breakpoints.down(370)]: {
          width: 180,
        },
        [theme.breakpoints.down(320)]: {
          width: 150,
        },
        "& > div.MuiBox-root": {
          width: "4px",
          height: "135px",
          background: theme.globals.colors.white,
          borderRadius: "6px",
        },

        "& div.MuiPaper-elevation3": {
          height: "100%",
          boxShadow: "unset",
          // [theme.breakpoints.down(385)]: {
          //   width: 160,
          // },
          "& div.MuiBox-root:not(div.type)": {
            height: "18px",
            marginBottom: "10px",

            "& svg.MuiSvgIcon-root": {
              color: theme.palette.primary.main,
            },
          },

          "& h2": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: theme.globals.fontSize.s,
            lineHeight: "188.25%",
            color: theme.palette.primary.main,
            marginBottom: "5px",
            // textAlign: theme.direction === "rtl" ? "end" : "start",
            // direction: "ltr!important",
          },

          "& p": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: theme.globals.fontSize.s - 2,
            lineHeight: "19px",
            color: theme.globals.colors.textMed,
            marginTop: "1px",
            width: "200px",
            overflow: "hidden",
            display: "-webkit-box",
            "-webkitLineClamp": 2,
            "-webkitBoxOrient": "vertical",
            [theme.breakpoints.down(385)]: {
              width: "auto",
              // wordBreak: "break-all",
            },
          },
        },
      },

      "& div.MuiTimelineOppositeContent-root": {
        height: "115px",
        [theme.breakpoints.down(600)]: {
          width: 425,
        },
        [theme.breakpoints.down(400)]: {
          width: 290,
        },
      },

      "& div.MuiTimelineSeparator-root": {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

        "& div.MuiBox-root": {
          width: "11.4px",
          height: "11.4px",
          borderRadius: "50%",
          background: theme.globals.colors.white,
        },

        "& span.MuiTimelineConnector-root": {
          width: "110px",
          height: "2px",
          backgroundColor: theme.globals.colors.white,
        },
      },
    },

    "& li.MuiTimelineItem-alignAlternate:nth-child(even)": {
      "& div.MuiTimelineOppositeContent-root": {
        marginBottom: "25px",
      },

      "& div.MuiTimelineContent-root": {
        alignItems: "flex-end",
        textAlign: "start",

        "& div.MuiBox-root:not(div.type)": {
          height: "132px",
        },
      },
    },

    "& li.MuiTimelineItem-alignAlternate:nth-child(odd)": {
      display: "flex",
      flexDirection: "column-reverse",

      "& div.MuiTimelineOppositeContent-root": {
        width: "100%",
        marginTop: "22px",
      },

      "& div.MuiTimelineItem-content": {
        marginTop: "0",
        marginBottom: "25px",
      },
    },

    "& > div.MuiBox-root": {
      top: "120%",

      "& a button": {
        right: 0,
      },
    },
  },

  paper: {
    padding: "6px 16px",
    background: "transparent",
    "&:hover": {
      cursor: "pointer",
    },
    "& div.type": {
      width: "65px",
      height: "17px",
      marginLeft: "auto",
      marginBottom: "10px",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: theme.globals.fontSize.xs - 2,
      lineHeight: "14px",
      color: theme.globals.colors.white,
      display: "grid",
      placeItems: "center",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)",
      borderRadius: "2px",
      [theme.breakpoints.down(370)]: {
        marginLeft: 0,
      },
    },

    "& div.External": {
      background: "#DD6B20",
    },

    "& div.Internal": {
      background: "#B2C900",
    },
  },

  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default useStyles;
