import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& div.slick-slider.slick-initialized": {
      "& div.slick-list": {
        direction: "ltr!important",

        "& div.slick-track": {
          direction: "ltr!important",
        },
      },
    },
    minHeight: "85vh",
    position: "relative",

    "& div.slick-active.slick-slide": {
      zIndex: 10,
    },

    "& div.slick-slide": {
      float: "left!important",

      "& > div": {
        background: " rgba(255, 255, 255, 0.4)",
        borderRadius: "0px 30px 30px 0px",
      },

      "& div.MuiPaper-root": {
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        direction: theme.direction === "rtl" ? "rtl!important" : "ltr",
        textAlign: "start",
        boxShadow: "unset",
        position: "relative",

        "&:before": {
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          content: "''",
          background:
            "linear-gradient(180deg, rgba(38, 54, 97, 0.3) 100%, rgba(38, 54, 97, 0.176072) 51.87%, rgba(38, 54, 97, 0) 69.3%)",
        },

        "& div.MuiCardContent-root": {
          width: "70%",
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: "20vh",
          borderRadius: "20px",
          backdropFilter: "blur(0px)",

          [theme.breakpoints.down(700)]: {
            width: "65%",
          },

          [theme.breakpoints.down(500)]: {
            width: "75%",
          },

          [theme.breakpoints.down(400)]: {
            width: "90%",
          },

          "& h2": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontWeight: "bold",
            fontSize: theme.globals.fontSize.xl + 20,
            lineHeight: "65px",
            color: theme.globals.colors.white,
            textAlign: "center",
            marginBottom: "7px",
            textTransform: "capitalize",
            overflow: "hidden",
            display: "-webkit-box",
            "-webkitLineClamp": 2,
            "-webkitBoxOrient": "vertical",

            [theme.breakpoints.between(1290, 1400)]: {
              fontSize: theme.globals.fontSize.xl + 17,
            },

            [theme.breakpoints.between(800, 1290)]: {
              fontSize: theme.globals.fontSize.xl + 13,
            },

            [theme.breakpoints.down(800)]: {
              fontSize: theme.globals.fontSize.xl + 12,
            },

            [theme.breakpoints.between(586, 800)]: {
              fontSize: theme.globals.fontSize.xl + 8,
            },

            [theme.breakpoints.down(585)]: {
              fontSize: theme.globals.fontSize.xl + 4,
            },

            [theme.breakpoints.down(450)]: {
              fontSize: theme.globals.fontSize.lg - 1,
              lineHeight: "33px",
            },
          },

          // "& p": {
          //   fontFamily:
          //     theme.direction === "rtl"
          //       ? theme.globals.fontFamily.ar
          //       : theme.globals.fontFamily.en,
          //   fontWeight: "normal",
          //   fontSize: theme.globals.fontSize.m + 2,
          //   lineHeight: "30px",
          //   color: theme.globals.colors.white,
          //   textAlign: "center",
          //   overflow: "hidden",
          //   display: "-webkit-box",
          //   "-webkitLineClamp": 2,
          //   "-webkitBoxOrient": "vertical",

          //   [theme.breakpoints.down(1400)]: {
          //     fontSize: theme.globals.fontSize.m - 1,
          //   },

          //   [theme.breakpoints.between(630, 800)]: {
          //     fontSize: theme.globals.fontSize.m - 2,
          //   },

          //   [theme.breakpoints.down(630)]: {
          //     fontSize: theme.globals.fontSize.s - 1,
          //   },

          //   [theme.breakpoints.down(450)]: {
          //     fontSize: theme.globals.fontSize.xs + 2,
          //     lineHeight: "19px",
          //   },
          // },
        },
      },
    },

    "& ul.slick-dots": {
      direction: theme.direction === "rtl" ? "rtl!important" : "ltr",
      left: "20px",
      display: "flex!important",
      flexDirection: "column",
      width: "30px",
      justifyContent: "center",
      height: "100%",
      top: 0,

      [theme.breakpoints.down(400)]: {
        left: 10,
      },

      [theme.breakpoints.down(350)]: {
        left: 6,
      },

      "& li": {
        transform: "rotate(90deg)",
        marginBottom: "17px",
        width: "6px",
        zIndex: 2,

        [theme.breakpoints.down(450)]: {
          transform: "rotate(0deg)",
        },

        "& button:before": {
          content: "''",
          width: "29px",
          height: "5.5px",
          opacity: "1",
          borderRadius: "2px",
          background: "rgba(255,255,255,0.4)",

          [theme.breakpoints.down(450)]: {
            width: "3px",
            height: "20px",
          },
        },
      },

      "& li.slick-active": {
        "& button:before": {
          background: theme.globals.colors.white,
        },
      },
    },
  },
}));

export default useStyles;
