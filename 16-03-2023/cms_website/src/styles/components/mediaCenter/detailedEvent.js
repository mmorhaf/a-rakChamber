import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  detailedEventRoot: {
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "start",
    marginTop: 30,

    [theme.breakpoints.down(1300)]: {
      width: "100%",
    },

    "& > div.MuiGrid-root": {
      padding: 0,
    },

    "& div.actualContent": {
      minHeight: "calc(100vh - 370px)",
      marginRight: "8px",
      padding: "33px 16px 14px 20px",
      background: "white",
      boxShadow: "0px 10px 20px rgb(0 0 0 / 10%)",
      borderRadius: "6px",
      "& h2": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: theme.globals.fontSize.s + 2,
        lineHeight: "22px",
        width: "max-content",
        color: theme.globals.colors.textDark,
        marginBottom: "20px",
        marginRight: 15,
        // maxWidth: "600px",
      },

      "& span": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        color: "#505050",
        // display: "inline-block",
        fontSize: theme.globals.fontSize.s - 2,
        textAlign: "start",
        marginBottom: "5px",
        display: "flex",
        justifyContent: "flex-start",

        "& ul": {
          marginLeft: 24,
        },
        "& svg": {
          fontSize: theme.globals.fontSize.m + 2,
          marginRight: 6,
          color: "#dd6b20",
        },
      },

      "& p.description": {
        // marginTop: "30px",
        color: "#505050",
        fontSize: "16px",
        textAlign: "justify",
        paddingRight: "30px",
        marginBottom: "30px",
      },

      "& h3": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: theme.globals.fontSize.s - 2,
        color: "#505050",
        textAlign: "start",
        textTransform: "capitalize",
      },
      "& .MuiButton-text": {
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
        background: "white",
        height: "45px",
        display: "flex",
        boxShadow: "0px 4px 30px rgb(0 0 0 / 5%)",
        width: "96%",
        alignItems: "center",
        marginBottom: "10px",
        borderRadius: "5px",

        "& svg": {
          fontSize: theme.globals.fontSize.s + 9,
          // transform: `rotate(${theme.direction === "rtl" ? "90deg" : "0"})`,
          margin: "0px 15px",
          color: "#22293D",
        },
      },
      "& .link": {
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
        background: "white",
        height: "45px",
        display: "flex",
        boxShadow: "0px 4px 30px rgb(0 0 0 / 5%)",
        width: "96%",
        alignItems: "center",
        marginBottom: "10px",
        borderRadius: "5px",

        "& svg": {
          fontSize: theme.globals.fontSize.s + 9,
          // transform: `rotate(${theme.direction === "rtl" ? "90deg" : "0"})`,
          margin: "0px 15px",
          color: "#22293D",
        },
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
        background: "white",
        height: "45px",
        display: "flex",
        boxShadow: "0px 4px 30px rgb(0 0 0 / 5%)",
        width: "96%",
        alignItems: "center",
        marginBottom: "10px",
        borderRadius: "5px",

        "& svg": {
          fontSize: theme.globals.fontSize.s + 9,
          // transform: `rotate(${theme.direction === "rtl" ? "90deg" : "0"})`,
          margin: "0px 15px",
          color: "#22293D",
        },
      },
    },

    "& div.latest": {
      "& div.latestHeader": {
        marginBottom: "20px",
        marginTop: "15px",
        display: "flex",

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
        justifyContent: "space-between",
        display: "flex",
        flexWrap: "wrap",
        [theme.breakpoints.down(600)]: {
          margin: 0,
        },
        "& div.eventContainer": {
          width: "49%",
          marginBottom: "20px",

          "& div.media": {
            padding: "10px",
            background: theme.globals.colors.white,
            boxShadow: "0px 4px 50px rgb(0 0 0 / 7%)",
            borderRadius: "5px",
            justifyContent: "space-between",

            "& a.imageLink": {
              width: "155px",
              height: "190px",
              marginRight: "11px",

              "& img": {
                width: "100%",
                height: "100%",
                borderRadius: "10px",
              },
            },

            "& div.media-body": {
              flex: "unset",
              height: "190px",
              width: "60%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",

              "& a": {
                textDecoration: "none",
              },

              "& p": {
                overflow: "hidden",
                display: "-webkit-box",
                "-webkitLineClamp": 2,
                "-webkitBoxOrient": "vertical",
                height: "37px",
                color: theme.globals.colors.textDark,
                fontSize: theme.globals.fontSize.s - 2,
                fontStyle: "normal",
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontWeight: "600",
                lineHeight: "19px",
                marginBottom: "5px",
              },

              "& span": {
                color: theme.globals.colors.textLight,
                display: "flex",
                fontSize: theme.globals.fontSize.xs,
                fontStyle: "normal",
                alignItems: "center",
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontWeight: "normal",
                lineHeight: "126%",
                marginBottom: "6px",
                mixBlendMode: "normal",

                "& svg": {
                  fontSize: theme.globals.fontSize.m,
                  color: theme.palette.secondary.main,
                  display: "block",
                  marginRight: "5px",
                },
              },

              "& div:not(div.details)": {
                width: "90%",
                display: "flex",
                marginTop: "16px",
                justifyContent: "space-between",

                "& button": {
                  color: theme.palette.secondary.main,
                  width: "93px",
                  border: `1px solid ${theme.palette.secondary.main}`,
                  height: "25px",
                  padding: "0",
                  fontSize: theme.globals.fontSize.s - 2,
                  fontStyle: "normal",
                  fontFamily:
                    theme.direction === "rtl"
                      ? theme.globals.fontFamily.ar
                      : theme.globals.fontFamily.en,
                  fontWeight: "normal",
                  lineHeight: "19px",
                  borderRadius: "3px",
                  backgroundColor: theme.globals.colors.white,
                },

                "& svg": {
                  color: theme.palette.secondary.main,
                  cursor: "pointer",
                },
              },
            },
          },
        },
      },
    },
  },
}));

export default useStyles;
