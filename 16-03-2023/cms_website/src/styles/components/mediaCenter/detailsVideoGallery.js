import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30,
    width: "100%",
    marginRight: "auto",
    marginLeft: "auto",
    textAlign: "start",
    [theme.breakpoints.down(1300)]: {
      width: "100%",
    },

    "& div.headContent": {
      marginTop: 50,
      "& h2": {
        marginBottom: "10px",
        textTransform: "capitalize",
        width: "100%",
        color:
          theme.palette.type === "dark"
            ? theme.globals.colors.white
            : theme.palette.textMed.main,
        fontSize: theme.globals.fontSize.s + 4,
        fontStyle: "normal",
        textAlign: "start",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontWeight: "600",
        lineHeight: "22px",
      },
      "& span": {
        color: "#A7A7A7",
        fontWeight: "400",
        fontSize: theme.globals.fontSize.s - 2,
        textTransform: "capitalize",
        display: "flex",
      },
    },
    "& div.actualContent": {
      justifyContent: "space-evenly",
      display: "flex",
      flexWrap: "wrap",
      marginTop: "70px",
      marginBottom: 70,
      [theme.breakpoints.up(1300)]: {
        justifyContent: "center",
      },
      "&>div": {
        width: " 75%",
        "&>div": {
          display: "flex",
          flexWrap: "wrap",
        },
      },

      "& div.MuiCard-root": {
        width: "47%",
        margin: "10px",
        boxShadow: "0px 4px 50px rgb(0 0 0 / 7%)",
        display: "flex",
        flexDirection: "column-reverse",
        padding: 8,
        background: theme.globals.colors.white,

        [theme.breakpoints.down(950)]: {
          width: "45%",
        },

        [theme.breakpoints.down(800)]: {
          width: "90%",
          marginRight: "auto",
          marginLeft: "auto",
        },

        "& div.videoContainer": {
          position: "relative",
          paddingBottom: "56.25%",
          /* 16:9 */
          height: 0,

          "& iframe": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          },
        },

        "& div.MuiCardContent-root": {
          textAlign: "start",
          display: "flex",
          flexDirection: "column-reverse",

          "& div.titleNshare": {
            display: "flex",
            justifyContent: "space-between",

            "& h5": {
              height: "50px",
              overflow: "hidden",
              display: "-webkit-box",
              "-webkitLineClamp": 2,
              "-webkitBoxOrient": "vertical",
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: theme.globals.fontSize.s + 1,
              lineHeight: "25px",
              color: theme.globals.colors.textDark,
              textAlign: "start",
              width: "90%",
            },

            "& svg": {
              fontSize: theme.globals.fontSize.m,
              color: theme.globals.colors.textLight,
              marginTop: "7px",
            },

            "& svg:hover": {
              cursor: "pointer",
              color: theme.palette.secondary.main,
              transform: "scale(1.1)",
            },
          },

          "& div.dataNviews": {
            display: "flex",
            justifyContent: "space-between",

            "& span.date": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: theme.globals.fontSize.s - 2,
              lineHeight: "25px",
              color: "#A7A7A7",
              textTransform: "capitalize",
              marginRight: theme.direction === "rtl" ? "20px" : "20px",
            },

            "& span.views": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: theme.globals.fontSize.s - 2,
              lineHeight: "25px",
              color: theme.globals.colors.textLight,
            },
          },
        },
      },
    },

    "& div.latest": {
      "& div.latestHeader": {
        marginBottom: "20px",
        marginTop: "15px",
        display: "flex",
        width: "95%",
        marginRight: "auto",
        marginLeft: "auto",

        [theme.breakpoints.up(1299)]: {
          width: "100%",
        },

        "& div.heading h2": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: theme.globals.fontSize.lg - 2,
          lineHeight: "30px",
          color: theme.palette.primary.main,
          textAlign: "start",

          [theme.breakpoints.between(600, 700)]: {
            fontSize: theme.globals.fontSize.m,
          },
        },

        "& div.divider": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          "& hr": {
            height: 1,
            width: "100%",
            backgroundColor: theme.palette.primary.main,

            opacity: "0.6",
          },
        },
      },

      "& div.listOfLatest": {
        justifyContent: "flex-start",
        display: "flex",

        "& a": {
          marginBottom: "30px",
          // width: "45%",
          display: "block",
          textDecoration: "none",
          margin: "10px",

          [theme.breakpoints.between(1300, 1400)]: {
            width: "100%",
          },

          [theme.breakpoints.down(950)]: {
            width: "90%",
          },

          [theme.breakpoints.down(700)]: {
            width: "90%",
            marginRight: "auto",
            marginLeft: "auto",
          },

          "& div.card": {
            background: theme.globals.colors.white,
            boxShadow: "0px 4px 50px rgb(0 0 0 / 7%)",
            borderRadius: "5px",

            "& div.MuiCardContent-root": {
              height: "75px",
              width: "95%",
              marginRight: "auto",
              marginLeft: "auto",
              padding: "16px 0",

              "& span": {
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: theme.globals.fontSize.s - 2,
                lineHeight: "19px",
                color: theme.palette.secondary.main,
                display: "block",
                marginBottom: "6px",
                display: "flex",
              },

              "& p": {
                textTransform: "capitalize",
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: theme.globals.fontSize.s - 2,
                lineHeight: "19px",
                color: theme.globals.colors.textDark,
                overflow: "hidden",
                display: "-webkit-box",
                "-webkitLineClamp": 1,
                "-webkitBoxOrient": "vertical",
              },
            },

            "& button": {
              width: "95%",
              marginRight: "auto",
              marginLeft: "auto",
              marginBottom: "8px",

              "&:hover": {
                transform: "scale(1.01)",
              },

              "& div:not(div.circle)": {
                width: "100%",
                height: "233px",
              },
            },
          },
        },
      },
    },
  },
  subscribe: {
    display: "flex",
    justifyContent: "end",
    marginRight: "30px",
    "& .MuiButton-root": {
      marginLeft: "17px",
      height: 40,
      border: 0,
      textTransform: "capitalize",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      display: "flex",
      fontWeight: 600,
      backgroundColor: "red",
      minWidth: 115,
      position: "relative",
      fontSize: 16,
      "&:hover": {
        backgroundColor: "white",
        color: "red",
        border: "1px solid",
      },
      "& .MuiButton-label": {
        width: "auto",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
    },
  },
}));

export default useStyles;
