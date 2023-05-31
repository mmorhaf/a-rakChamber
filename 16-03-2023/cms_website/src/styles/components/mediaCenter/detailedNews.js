import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  detailedNewsRoot: {
    marginRight: "auto",
    marginLeft: "auto",
    textAlign: "start",
    marginTop: "30px",

    [theme.breakpoints.down(1300)]: {
      width: "100%",
    },

    "& > div.MuiGrid-root": {
      padding: 0,
    },

    "& div.actualContent": {
      justifyContent: "space-between",
      marginBottom: "30px",
      // wordBreak: "break-word",
      [theme.breakpoints.down(950)]: {
        justifyContent: "space-evenly",
      },

      "& h2": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: theme.globals.fontSize.m - 2,
        lineHeight: "1.8",
        color:
          theme.palette.type === "dark"
            ? `${theme.globals.colors.white}!important`
            : `${theme.palette.textMed.main}!important`,
        marginBottom: 10,
        textAlign: "start",
      },

      "& p": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: theme.globals.fontSize.s - 2,
        lineHeight: "1.5",
        textAlign: "justify",
        color:
          theme.palette.type === "dark"
            ? `${theme.globals.colors.white}!important`
            : `${theme.palette.textMed.main}!important`,
        marginBottom: 20,
      },

      "& div.initibtnContainer": {
        display: "flex",
        justifyContent: "start",
        marginBottom: 50,

        "& button": {
          height: 30,
          textTransform: "capitalize",
          justifyContent: "center",
          alignItems: "center",
          color: theme.palette.secondary.main,
          border: "1px solid",
          display: "flex",
          width: 115,
          position: "relative",

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
          "& .MuiButton-label": {
            width: "auto",
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: theme.globals.fontSize.s - 2,
            lineHeight: "19px",
            textTransform: "capitalize",
            color: theme.palette.primary.main,
          },
        },
      },

      "& div": {
        "& h2": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: theme.globals.fontSize.s + 4,
          lineHeight: "1.8",
          color: theme.palette.primary.main,

          textAlign: "start",
        },

        "& span": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontSize: theme.globals.fontSize.s - 2,
          lineHeight: "19px",
          display: "block",
          color: "#A7A7A7",
          fontWeight: "400",
          textTransform: "capitalize",
          display: "flex",
        },

        "& p": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: theme.globals.fontSize.s + 2,
          lineHeight: "1.5",
          textAlign: "justify",
          color: "#505050",
        },

        "& h3": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: theme.globals.fontSize.s - 2,
          lineHeight: "22px",
          color: theme.globals.colors.textDark,
          marginTop: "25px",
          textAlign: "start",
          textTransform: "capitalize",
        },

        "& a.MuiLink-root": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize:
            theme.direction === "rtl"
              ? theme.globals.fontSize.s + 1
              : theme.globals.fontSize.s - 1,
          lineHeight: "19px",
          textAlign: "justify",
          color: theme.palette.primary.main,
          marginTop: "5px",
          display: "block",
          width: "205px",

          "& svg": {
            fontSize: theme.globals.fontSize.s + 1,
            transform: `rotate(${theme.direction === "rtl" ? "90deg" : "0"})`,
          },
        },
      },
    },

    "& div.latest": {
      "& div.latestHeader": {
        marginBottom: "20px",
        marginTop: "15px",
        display: "flex",

        marginRight: "auto",
        marginLeft: "auto",

        "& div.heading": {
          width: "max-content",
          margin: "0px 25px 0px 0px",
          "& h2": {
            textTransform: "capitalize",
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: theme.globals.fontSize.lg - 4,
            lineHeight: "30px",
            color: theme.palette.primary.main,
            textAlign: "start",

            [theme.breakpoints.between(600, 700)]: {
              fontSize: theme.globals.fontSize.m,
            },
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
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "start",

        [theme.breakpoints.between(900, 1300)]: {
          display: "flex",
          flexWrap: "wrap",
        },
        [theme.breakpoints.down(900)]: {
          margin: "0px!important",
        },
        "& div.cardContainer": {
          background: theme.globals.colors.white,
          boxShadow: "0px 4px 50px rgb(0 0 0 / 7%)",
          borderRadius: "5px",
          width: "95%",
          marginRight: "auto",
          marginLeft: "auto",

          [theme.breakpoints.between(900, 1300)]: {
            width: "48%",
            marginBottom: "20px",
          },

          "& div.media": {
            height: "205px",
            display: "flex",
            background: theme.globals.colors.white,
            alignItems: "center",
            borderRadius: "5px",
            marginBottom: "15px",
            padding: "10px",
            justifyContent: "space-around",

            [theme.breakpoints.down(960)]: {
              height: "unset",
              padding: "10px",
            },

            "& a.imageLink": {
              display: "inline-block",
              marginRight: "20px",
              width: "155px",
              height: "190px",

              "& img": {
                borderRadius: "10px",
                width: "100%",
                height: "100%",
              },
            },

            "& div.media-body": {
              textAlign: "start",
              height: "190px",
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "space-between",

              [theme.breakpoints.down(700)]: {
                paddingRight: "20px",
              },

              "& span.date": {
                color: theme.palette.secondary.main,
                display: "inline-block",
                fontSize: theme.globals.fontSize.s - 2,
                fontWeight: "600",
                lineHeight: "19px",
                marginBottom: "10px",
                textTransform: "capitalize",
              },

              "& p": {
                color: "#747474",
                fontSize: theme.globals.fontSize.xs,
                fontStyle: "normal",
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontWeight: 400,
                lineHeight: "16.34px",

                [theme.breakpoints.between(960, 1000)]: {
                  fontSize: theme.globals.fontSize.xs - 2,
                },

                [theme.breakpoints.between(580, 650)]: {
                  fontSize: theme.globals.fontSize.xs + 1,
                },

                "& strong": {
                  overflow: "hidden",
                  display: "-webkit-box",
                  "-webkitLineClamp": 2,
                  "-webkitBoxOrient": "vertical",
                  color: theme.globals.colors.textDark,
                  fontSize: theme.globals.fontSize.s - 2,
                  fontWeight: "600",
                  lineHeight: "19px",

                  [theme.breakpoints.between(960, 1000)]: {
                    fontSize: theme.globals.fontSize.xs + 1,
                  },

                  [theme.breakpoints.between(630, 650)]: {
                    marginBottom: "10px",
                  },

                  [theme.breakpoints.down(450)]: {
                    fontSize: theme.globals.fontSize.xs - 1,
                  },
                },

                "& span": {
                  overflow: "hidden",
                  display: "-webkit-box",
                  "-webkitLineClamp": 5,
                  "-webkitBoxOrient": "vertical",

                  [theme.breakpoints.between(1500, 1550)]: {
                    fontSize: theme.globals.fontSize.xs - 1,
                  },

                  [theme.breakpoints.between(1000, 1050)]: {
                    fontSize: theme.globals.fontSize.xs - 1,
                  },

                  [theme.breakpoints.down(580)]: {
                    display: "none",
                  },
                },
              },

              "& a": {
                textDecoration: "none",

                "& button": {
                  color: theme.palette.secondary.main,
                  width: "88px",
                  border: `1px solid ${theme.palette.secondary.main}`,
                  height: "25.68px",
                  display: "block",
                  padding: "0",
                  fontSize: theme.globals.fontSize.s - 2,
                  background: theme.globals.colors.white,
                  boxSizing: "border-box",
                  fontFamily:
                    theme.direction === "rtl"
                      ? theme.globals.fontFamily.ar
                      : theme.globals.fontFamily.en,
                  fontWeight: "500",
                  lineHeight: "16px",
                  borderRadius: "3px",
                },
              },
            },
          },
        },
      },
    },
  },
  table: {
    marginTop: 30,
    "& > div > div table thead tr th span button": {
      width: "100%",
    },
  },
  ndetails: {
    "& >  div.MuiCard-root": {
      "& > div.MuiBox-root": {
        "& >  div:last-child:not(div.MuiCardMedia-root.media)": {
          width: "100%",
        },
      },
    },
  },
}));

export default useStyles;
