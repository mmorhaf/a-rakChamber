import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& header": {
      "& div.MuiToolbar-root": {
        marginLeft: "16%",
        padding: "0!important",
        minHeight: "40px",

        [theme.breakpoints.down(1500)]: {
          marginLeft: "17%",
        },

        [theme.breakpoints.down(1380)]: {
          marginLeft: "18%",
        },

        [theme.breakpoints.down(1250)]: {
          marginLeft: "19%",
        },

        [theme.breakpoints.down(1070)]: {
          marginLeft: "20%",
        },

        [theme.breakpoints.down(980)]: {
          marginLeft: "21%",
        },

        [theme.breakpoints.down(900)]: {
          paddingRight: "0",
        },

        "& button.MuiIconButton-root": {
          background: theme.palette.secondary.main,
          borderRadius: "0",
          padding: "5px",
          marginRight: "0",

          [theme.breakpoints.down(900)]: {
            marginLeft: "auto",
            display: "block",
          },

          "& svg": {
            fontSize: "30px",
          },
        },

        "& button.MuiIconButton-root.settingsBtn": {
          padding: "10px",
          display: "none",

          [theme.breakpoints.down(900)]: {
            display: "block",
            marginLeft: "unset",
            borderLeft: "1px solid wheat",
          },

          "& svg": {
            fontSize: "20px",
          },
        },

        "& div.forDesktop": {
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginLeft: "5px",

          [theme.breakpoints.down(900)]: {
            display: "none",
          },

          "& a.navLink:first-of-type": {
            [theme.breakpoints.down(1350)]: {
              marginLeft: "40px",
            },

            [theme.breakpoints.down(1210)]: {
              marginLeft: "35px",
            },

            [theme.breakpoints.down(1070)]: {
              marginLeft: "12px",
            },
          },

          "& a.navLink": {
            height: "40px",
            marginRight: "0!important",
            marginLeft: "0!important",
            position: "relative",

            [theme.breakpoints.down(1485)]: {
              marginRight: "29px",
              marginLeft: "29px",
            },

            [theme.breakpoints.down(1350)]: {
              marginRight: "25px",
              marginLeft: "25px",
            },

            [theme.breakpoints.down(1210)]: {
              marginRight: "20px",
              marginLeft: "20px",
            },

            [theme.breakpoints.down(1070)]: {
              marginRight: theme.direction === "rtl" ? "22px" : "12px",
              marginLeft: theme.direction === "rtl" ? "22px" : "12px",
            },

            [theme.breakpoints.down(1022)]: {
              marginRight: theme.direction === "rtl" ? "14px" : "12px",
              marginLeft: theme.direction === "rtl" ? "14px" : "12px",
            },

            [theme.breakpoints.down(932)]: {
              marginLeft: theme.direction === "rtl" ? "14px" : "11px",
            },

            "& h6": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",

              fontSize: theme.globals.fontSize.xs + 1,
              lineHeight: "19px",
              color: theme.globals.colors.white,
              height: "100%",
              display: "flex",
              alignItems: "center",

              [theme.breakpoints.down(1485)]: {
                fontSize: theme.globals.fontSize.xs + 1,
              },

              [theme.breakpoints.down(1350)]: {
                fontSize:
                  theme.direction === "rtl"
                    ? theme.globals.fontSize.s - 1
                    : theme.globals.fontSize.xs,
                fontWeight: theme.direction === "rtl" ? "normal" : "600",
              },

              [theme.breakpoints.down(1210)]: {
                fontSize:
                  theme.direction === "rtl"
                    ? theme.globals.fontSize.s - 1
                    : theme.globals.fontSize.xs - 1,
              },

              [theme.breakpoints.down(1120)]: {
                fontWeight: "bold",
                fontSize:
                  theme.direction === "rtl"
                    ? theme.globals.fontSize.xs
                    : theme.globals.fontSize.xs - 1,
              },

              [theme.breakpoints.down(906)]: {
                fontSize:
                  theme.direction === "rtl"
                    ? theme.globals.fontSize.xs
                    : theme.globals.fontSize.xs - 1,
              },
            },

            "& h6:before": {
              content: "''",
              width: "100%",
              height: "5px",
              position: "absolute",
              top: "-5px",
              backgroundColor: theme.palette.secondary.main,
              visibility: "hidden",
              transform: "scaleX(0)",
            },
          },

          "& a.navLink:hover": {
            textDecoration: "none",

            "& h6": {
              color: theme.palette.secondary.main,
            },
          },

          "& a.navLink:hover h6:before": {
            textDecoration: "none",
            visibility: "visible",
            transform: "scaleX(1)",
          },

          "& a.navLink:visit h6:before": {
            visibility: "visible",
            transform: "scaleX(1)",
          },
        },
      },
    },

    "& div.smallScreens": {
      [theme.breakpoints.up(900)]: {
        display: "none",
      },
    },
  },
}));

export default useStyles;
