import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "70%",
    // marginLeft: "auto",
    // marginRight: "auto",
    position: "relative",

    "& div.slick-slider": {
      "& ul > li": {
        height: 5,
      },
      "& ul > li > button": {
        height: 5,
        backgroundColor: "#263661",
      },
      "& div.slick-list": {
        direction: "ltr!important",

        "& div.slick-track": {
          direction: "ltr!important",
          "& div.slick-slide": {
            float: "left!important",
          },
        },
      },

      "& button": {
        "&::before": {
          content: "none",
        },

        "& svg": {
          color: theme.globals.colors.white,
        },
      },

      "& div.slick-active.slick-center": {
        "& div.cardContainer": {
          "& div.MuiCard-root": {
            "& div.contentContainer": {
              "& div.borderBottom": {
                background: `${theme.palette.primary.main}!important`,
              },
            },
          },
        },
      },

      "& div.cardContainer": {
        "& div.MuiCard-root": {
          position: "relative",
          width: "245px",
          height: "355px",
          marginRight: "auto",
          marginLeft: "auto",
          background: theme.globals.colors.white,
          boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.05)",
          borderRadius: "10px",
          [theme.breakpoints.down(345)]: {
            width: 190,
          },
          "&:after": {
            content: "''",
            position: "absolute",
            bottom: 0,
            height: 5,
            width: "100%",
            marginRight: "auto",
            marginLeft: "auto",
            background: "#DEDEDE",
            borderRadius: 5,
          },

          "& div.MuiCardMedia-root": {
            height: "206px",
          },

          "& div.contentContainer": {
            marginTop: "10px",
            display: "flex",
            padding: 10,

            "& div.date": {
              width: 35,
              textAlign: "center",

              "& *": {
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontSize: theme.globals.fontSize.xs,
                lineHeight: "18px",
                textAlign: "center",
                color: theme.globals.colors.textMed,
              },

              "& div.month": {
                fontWeight: "normal",
              },

              "& div.day": {
                fontWeight: "600",
              },
            },

            "& div.details": {
              width: "calc(100% - 35px)",
              borderLeft: "1px solid #C1C1C1",
              paddingLeft: 5,

              "& div.MuiCardHeader-root": {
                paddingTop: 3,
                paddingBottom: "5px",
                paddingRight: 0,
                paddingLeft: 0,

                "& span.MuiCardHeader-title": {
                  fontFamily:
                    theme.direction === "rtl"
                      ? theme.globals.fontFamily.ar
                      : theme.globals.fontFamily.en,
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: theme.globals.fontSize.xs,
                  lineHeight: "16px",
                  color: theme.globals.colors.textMed,
                  overflow: "hidden",
                  display: "-webkit-box",
                  textAlign: "start",
                  "-webkitLineClamp": 3,
                  "-webkitBoxOrient": "vertical",
                },
              },

              "& div.MuiCardContent-root": {
                padding: 0,

                "& span": {
                  fontFamily:
                    theme.direction === "rtl"
                      ? theme.globals.fontFamily.ar
                      : theme.globals.fontFamily.en,
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: theme.globals.fontSize.xs,
                  lineHeight: "16px",
                  color: theme.globals.colors.textMed,
                  overflow: "hidden",
                  display: "-webkit-box",
                  textAlign: "start",
                  "-webkitLineClamp": 3,
                  "-webkitBoxOrient": "vertical",
                },
              },
            },
          },
        },
      },
    },
  },
  whiteBox: {
    color: "#fff",
    width: "100%",
    textAlign: "center",
    paddingBottom: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: theme.globals.fontSize.s + 40,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
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
}));

export default useStyles;
