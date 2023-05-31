import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    background: theme.palette.primary.main,
    paddingTop: "15px",

    "& div.actualContent": {
      display: "flex",

      "& div.importantLinks": {
        position: "relative",

        [theme.breakpoints.down(1151)]: {
          justifyContent: "center",
          display: "flex",
        },

        [theme.breakpoints.down(750)]: {
          maxWidth: "100%",
          flexBasis: "100%",
        },

        "&:after": {
          content: "''",
          position: "absolute",
          top: "110%",
          background: theme.globals.colors.white,
          height: 1,

          [theme.breakpoints.up(750)]: {
            content: "unset",
          },

          [theme.breakpoints.down(750)]: {
            width: "91%",
          },

          [theme.breakpoints.down(600)]: {
            width: "78%",
          },

          [theme.breakpoints.down(530)]: {
            width: "90%",
          },

          [theme.breakpoints.down(500)]: {
            top: "100%",
          },
        },

        "& ul.contactInfo": {
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          height: "fit-content",
          width: "100%",

          [theme.breakpoints.down(1151)]: {
            width: "80%",
          },

          [theme.breakpoints.down(970)]: {
            width: "90%",
          },

          [theme.breakpoints.down(757)]: {
            width: "91%",
          },

          [theme.breakpoints.down(600)]: {
            width: "78%",
          },

          [theme.breakpoints.down(530)]: {
            width: "90%",
          },

          "& li.phone": {
            "& svg": {
              transform:
                theme.direction === "rtl" ? "rotate(+260deg)" : "unset",
            },
          },

          "& li": {
            height: "30px",
            width: "fit-content",
            paddingLeft: "5px",
            paddingRight: "5px",
            display: "flex",
            justifyContent: "start",

            [theme.breakpoints.down(1300)]: {
              minWidth: "136px",
            },

            [theme.breakpoints.down(1151)]: {
              width: "29%",
            },
            [theme.breakpoints.down(991)]: {
              width: "30%",
            },
            [theme.breakpoints.down(860)]: {
              width: "33%",
            },
            [theme.breakpoints.down(774)]: {
              width: "35%",
            },
            [theme.breakpoints.down(612)]: {
              width: "50%",
            },
            [theme.breakpoints.down(541)]: {
              width: "51%",
            },
            [theme.breakpoints.down(500)]: {
              width: "100%",
              marginBottom: 10,
            },

            "& div.settingsContainer": {
              "& button": {
                padding: "5px",

                "& span.MuiIconButton-label": {
                  fontFamily:
                    theme.direction === "rtl"
                      ? theme.globals.fontFamily.ar
                      : theme.globals.fontFamily.en,
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: theme.globals.fontSize.s - 1,
                  lineHeight: "21px",
                  textAlign: "center",
                  color: theme.globals.colors.white,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",

                  "& svg": {
                    color: theme.globals.colors.white,
                    fontSize: theme.globals.fontSize.m - 1,
                  },
                },
              },

              [theme.breakpoints.down(1300)]: {
                display: "block",
              },
            },

            "& div.MuiListItemIcon-root": {
              minWidth: "25px",
              alignItems: "center",
              "& svg": {
                color: theme.globals.colors.white,
                fontSize: theme.globals.fontSize.m - 1,
              },
            },

            "& div.MuiListItemText-root.email": {
              "& span": {
                textTransform: "lowercase",
              },
            },

            "& div.MuiListItemText-root": {
              display: "flex",
              justifyContent: "start",

              "& span": {
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: theme.globals.fontSize.xs + 1,
                lineHeight: "21px",
                textAlign: "center",
                color: theme.globals.colors.white,
                height: "100%",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                textTransform: "capitalize",

                [theme.breakpoints.down(686)]: {
                  fontSize: theme.globals.fontSize.xs - 1,
                },

                [theme.breakpoints.down(600)]: {
                  fontSize: theme.globals.fontSize.xs + 1,
                },
              },
            },
          },
        },
      },

      "& div.logoContainer": {
        [theme.breakpoints.down(750)]: {
          maxWidth: 0,
        },

        "& > a > div": {
          left: "1.5%",
          top: "-4px",
          height: "110px",
          width: "123px",
          display: "grid",
          placeItems: "center",
          padding: "10px",
          // zIndex: "unset",
          [theme.breakpoints.between(1150, 1630)]: {
            left: "0.5%",
            top: "13px",
            height: "90px",
            width: "100px",
          },
          [theme.breakpoints.down(1151)]: {
            top: 0,
          },

          [theme.breakpoints.down(750)]: {
            bottom: 0,
            top: "unset",
            left: "10%",
          },
          [theme.breakpoints.down(600)]: {
            left: "9%",
            height: "88px",
            width: "100px",
          },
          [theme.breakpoints.down(500)]: {
            bottom: 0,
            top: "unset",
            left: "4%",
          },
          [theme.breakpoints.down(450)]: {
            width: "91px",
            height: "83px",
            bottom: 0,
          },
          [theme.breakpoints.down(420)]: {
            width: "99px",
            height: "85px",
            bottom: 77,
            left: "38%",
          },
        },
      },
    },

    "& div.lastSection": {
      display: "flex",
      justifyContent: "space-between",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "10px",
      marginBottom: "10px",

      [theme.breakpoints.down(750)]: {
        flexDirection: "column",
        justifyContent: "unset",
        marginTop: 67,
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "360px",
        paddingLeft: "0",
        alignItems: "center",
      },

      "& div.social-rights": {
        width: 300,
        display: "flex",
        justifyContent: "space-between",

        [theme.breakpoints.down(1300)]: {
          width: "260px",
        },

        [theme.breakpoints.down(440)]: {
          flexDirection: "column",
          alignItems: "center",
        },

        "& div.socialLinks": {
          [theme.breakpoints.down(440)]: {
            marginBottom: 5,
          },

          "& button": {
            padding: "5px",
            "& svg": {
              color: theme.globals.colors.white,
              fontSize: theme.globals.fontSize.m - 1,

              [theme.breakpoints.down(1300)]: {
                fontSize: theme.globals.fontSize.s - 1,
              },
            },
          },

          "& button:first-of-type": {
            "& svg": {
              color: theme.globals.colors.white,
              fontSize: theme.globals.fontSize.lg + 1,

              [theme.breakpoints.down(1300)]: {
                fontSize: theme.globals.fontSize.m - 1,
              },
            },
          },
        },

        "& div.rights": {
          display: "flex",
          alignItems: "center",

          [theme.breakpoints.down(440)]: {
            marginBottom: 5,
          },

          "& span": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: theme.globals.fontSize.xs + 1,
            lineHeight: "21px",
            textAlign: "center",
            color: theme.globals.colors.white,

            [theme.breakpoints.down(1300)]: {
              fontSize: theme.globals.fontSize.xs,
              lineHeight: "16px",
              letterSpacing: "-0.5px",
            },
          },
        },
      },

      "& div.lastUpdate": {
        display: "flex",
        alignItems: "center",

        "& span": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: theme.globals.fontSize.xs + 1,
          lineHeight: "21px",
          textAlign: "center",
          color: theme.globals.colors.white,

          [theme.breakpoints.down(1300)]: {
            fontSize: theme.globals.fontSize.xs,
            lineHeight: "18px",
            fontWeight: "200",
          },
        },
      },
    },
  },
}));

export default useStyles;
