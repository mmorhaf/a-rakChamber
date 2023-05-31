import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .owl-theme": {
      width: "70%!important",
      marginRight: "auto",
      marginLeft: "auto",
      position: "relative",
      "& div.owl-nav": {
        display: "flex",
        zIndex: "1",
        justifyContent: "space-between",
        position: "absolute",
        width: "100%",
        margin: "0",
        top: "50%",

        "& div.owl-prev": {
          width: "33px",
          height: "45px",
          left: "-50px",
          position: "relative",
          borderRadius: "3px",
          background: theme.palette.secondary.main,

          "& span": {
            transform:
              theme.direction === "rtl"
                ? "rotate(0deg)!important"
                : "rotate(180deg)",
            fontSize: theme.globals.fontSize.xl - 1,
            position: "absolute",
            right: "2px",
            top: "9px",
            color: theme.globals.colors.white,
          },
        },

        "& div.owl-prev:hover": {
          background: theme.palette.secondary.light,
        },

        "& div.owl-next": {
          width: "33px",
          height: "45px",
          right: "-50px",
          position: "relative",
          borderRadius: "3px",
          background: theme.palette.secondary.main,

          "& span": {
            transform:
              theme.direction === "rtl"
                ? "rotate(180deg)!important"
                : "rotate(0deg)",
            fontSize: theme.globals.fontSize.xl - 1,
            position: "absolute",
            left: "2px",
            top: "9px",
            color: theme.globals.colors.white,
          },
        },

        "& div.owl-next:hover": {
          background: theme.palette.secondary.light,
        },
      },

      "& div.owl-stage-outer": {
        padding: "20px 0",
        direction: "ltr!important",
        zIndex: "2",
      },

      "& div.owl-stage": {
        display: "flex",
        alignItems: "center",

        "& div.owl-item:not(div.owl-item.active) div.serviceCard": {
          boxShadow: "unset",
          background: "unset",
        },

        "& div.owl-item": {
          height: "155px",

          [theme.breakpoints.down(1000)]: {
            height: "185px",
            zIndex: "3",
            display: "grid",
            placeItems: "center",
          },

          "& div.serviceCard": {
            background: theme.globals.colors.white,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            textAlign: "center",
            height: "100%",

            "& div.contentContainer": {
              width: "80%",
              marginRight: "auto",
              marginLeft: "auto",
              paddingTop: "20px",
              [theme.breakpoints.down(1360)]: {
                paddingTop: 8,
              },
              "& div.icon": {
                marginBottom: "10px",

                "& svg": {
                  color: theme.palette.secondary.main,
                  fontSize: "45px",
                },
                "& i": {
                  color: theme.palette.secondary.main,
                  fontSize: "45px",
                },
              },

              "& p": {
                color: theme.palette.primary.main,
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: theme.globals.fontSize.s - 2,
                lineHeight: "19px",
                textAlign: "center",
                alignItems: "center",
                overflow: "hidden",
                display: "-webkit-box",
                "-webkitLineClamp": 3,
                "-webkitBoxOrient": "vertical",
                height: "55px",
              },
            },
            "& div.cardBtns": {
              visibility: "visible",
              display: "flex",
              justifyContent: "space-between",
              width: "72%",
              maxWidth: "150px",
              marginRight: "auto",
              marginLeft: "auto",

              "& button": {
                width: "60px",
                height: "29px",
                padding: 0,
                background: theme.palette.secondary.light,
                borderRadius: "5px",
                border: 0,
                "& svg": {
                  fontSize: "23px",
                  lineHeight: 0,
                  color: theme.globals.colors.white,
                },
              },
              "& a": {
                width: "45px",
                height: "25px",
                padding: 0,
                borderRadius: "5px",
                border: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#89898926",
                "& svg": {
                  fontSize: "22px",
                  lineHeight: 0,
                  color: theme.palette.secondary.light,
                },
              },
              "& button:first-child svg": {
                fontSize: "30px",
              },
            },
          },
        },

        "& div.owl-item:not( div.owl-item.active) + div.owl-item.active": {
          [theme.breakpoints.down(1000)]: {
            display: "grid",
            placeItems: "center",
          },

          "& div.serviceCard": {
            borderRadius: "10px",
            width: "88%",
            float: "right!important",

            [theme.breakpoints.between(1000, 1400)]: {
              width: "95%",
            },

            [theme.breakpoints.between(600, 1000)]: {
              width: "95%",
              maxWidth: "250px",

              "& div.cardBtns": {
                visibility: "visible",
                display: "flex",
                justifyContent: "space-between",
                width: "72%",
                maxWidth: "150px",
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "15px",

                "& button": {
                  width: "60px",
                  height: "29px",
                  padding: 0,
                  background: theme.palette.secondary.light,
                  borderRadius: "5px",
                  border: 0,
                  "& svg": {
                    fontSize: "23px",
                    lineHeight: 0,
                    color: theme.globals.colors.white,
                  },
                },
                "& a": {
                  width: "60px",
                  height: "29px",
                  padding: 0,
                  background: theme.palette.secondary.light,
                  borderRadius: "5px",
                  border: 0,
                  "& svg": {
                    fontSize: "23px",
                    lineHeight: 0,
                    color: theme.globals.colors.white,
                  },
                },
                "& button:first-child svg": {
                  fontSize: "30px",
                },
              },
            },

            [theme.breakpoints.down(600)]: {
              width: "100%",
              maxWidth: "220px",
            },

            "& div.contentContainer": {
              "& div.icon": {
                marginBottom: "10px",

                [theme.breakpoints.between(600, 1000)]: {
                  height: "45px",
                },

                "& svg": {
                  fontSize: "30px",

                  [theme.breakpoints.between(1000, 1400)]: {
                    fontSize: "45px",
                  },

                  [theme.breakpoints.between(600, 1000)]: {
                    fontSize: "49px",
                  },
                },
                "& i": {
                  fontSize: "30px",

                  [theme.breakpoints.between(1000, 1400)]: {
                    fontSize: "45px",
                  },

                  [theme.breakpoints.between(600, 1000)]: {
                    fontSize: "49px",
                  },
                },
              },

              "& p": {
                fontSize: theme.globals.fontSize.xs,
                overflow: "hidden",
                display: "-webkit-box",
                "-webkitLineClamp": 3,
                "-webkitBoxOrient": "vertical",
                height: "55px",
              },
            },
          },

          "& + div.owl-item.active": {
            height: "185px",
            zIndex: "3",

            [theme.breakpoints.down(1000)]: {
              display: "grid",
              placeItems: "center",
            },

            "& div.serviceCard": {
              borderRadius: "10px",

              [theme.breakpoints.between(600, 1000)]: {
                width: "95%",
                maxWidth: "250px",

                "& div.cardBtns": {
                  visibility: "visible",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "72%",
                  maxWidth: "150px",
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginTop: "15px",

                  "& button": {
                    width: "60px",
                    height: "29px",
                    padding: 0,
                    background: theme.palette.secondary.light,
                    borderRadius: "5px",
                    border: 0,
                    "& svg": {
                      fontSize: "23px",
                      lineHeight: 0,
                      color: theme.globals.colors.white,
                    },
                  },
                  "& a": {
                    width: "60px",
                    height: "29px",
                    padding: 0,
                    background: theme.palette.secondary.light,
                    borderRadius: "5px",
                    border: 0,
                    "& svg": {
                      fontSize: "23px",
                      lineHeight: 0,
                      color: theme.globals.colors.white,
                    },
                  },
                  "& button:first-child svg": {
                    fontSize: "30px",
                  },
                },
              },
            },
          },
        },

        // "& div.owl-item.active": {
        //   "& div.cardBtns": {
        //     display: "none",
        //   },
        // },

        "& div.owl-item:not(div.owl-item.active)": {
          "& div.cardBtns": {
            display: "none",
          },
        },

        "& div.owl-item.active.center + div": {
          height: "185px",
          zIndex: "3",

          [theme.breakpoints.between(1000, 1400)]: {
            height: "155px",
            zIndex: 0,
          },

          "& div.serviceCard": {
            borderRadius: "10px",
          },

          "& + div": {
            "& div.serviceCard": {
              width: "88%",
              float: "left!important",
              borderRadius: "10px",

              "& div.contentContainer": {
                "& div.icon": {
                  marginBottom: "10px",

                  "& svg": {
                    fontSize: "30px",
                  },
                  "& i": {
                    fontSize: "30px",
                  },
                },

                "& p": {
                  fontSize: theme.globals.fontSize.xs,
                  overflow: "hidden",
                  display: "-webkit-box",
                  "-webkitLineClamp": 3,
                  "-webkitBoxOrient": "vertical",
                  height: "55px",
                },
              },
            },
          },
        },

        "& div.owl-item.active.center": {
          boxShadow: "0px 0px 15px rgb(0 0 0 / 51%)",
          borderRadius: "10px",
          zIndex: "4",
          height: "205px",

          [theme.breakpoints.down(600)]: {
            boxShadow: "unset",
            display: "grid",
            placeItems: "center",
          },

          "& div.serviceCard": {
            background: theme.palette.secondary.main,
            borderRadius: "10px",

            "& div.contentContainer": {
              width: "90%",

              "& div.icon": {
                "& svg": {
                  fontSize: "49px!important",
                  color: theme.globals.colors.white,
                },
                "& i": {
                  fontSize: "49px!important",
                  color: theme.globals.colors.white,
                },
              },
              "& p": {
                color: theme.globals.colors.white,
                fontWeight: "400",
                fontSize: theme.globals.fontSize.s,
                lineHeight: "19px",
                overflow: "hidden",
                display: "-webkit-box",
                "-webkitLineClamp": 3,
                "-webkitBoxOrient": "vertical",
                height: "55px",
              },
            },
          },

          "& div.cardBtns": {
            visibility: "visible",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
            width: "80%",
            maxWidth: "150px",
            marginRight: "auto",
            marginLeft: "auto",

            [theme.breakpoints.down(1400)]: {
              marginTop: "8px",
              width: "72%",
            },

            "& button": {
              width: "60px",
              height: "29px",
              padding: 0,
              background: theme.palette.secondary.light,
              borderRadius: "5px",
              border: 0,
              "& svg": {
                fontSize: "23px",
                lineHeight: 0,
                color: theme.globals.colors.white,
              },
            },
            "& a": {
              width: "60px",
              height: "29px",
              padding: 0,
              background: theme.palette.secondary.light,
              borderRadius: "5px",
              border: 0,
              "& svg": {
                fontSize: "23px",
                lineHeight: 0,
                color: theme.globals.colors.white,
              },
            },
            "& button:first-child svg": {
              fontSize: "30px",
            },
          },
        },
      },

      "& div.owl-dots": {
        display: "flex",
        justifyContent: "flex-start",
        position: "relative",
        width: "50%",
        marginRight: "0",
        marginLeft: "45px",

        [theme.breakpoints.up(450)]: {
          marginLeft: "34px",
          top: "70px",
        },

        "& button.owl-dot span": {
          background: theme.palette.primary.main,
          transform: "matrix(1, 0, 0, -1, 0, 0)",
          width: "10.42px",
          height: "10.42px",
          borderRadius: " 50%",
          borderBottom: "unset",
          borderTop: "unset",
          opacity: "1",
          marginRight: "11px",

          [theme.breakpoints.down(600)]: {
            width: "9px",
            height: "9px",
            marginRight: "10px",
          },
        },

        "& button.owl-dot.active span": {
          background: theme.palette.secondary.main,
        },
      },
    },
  },
  btnContainer: {
    width: "100%",
    height: "41px",
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
  },

  viewAllBtn: {
    width: "115px",
    height: "40px",
    background: "rgba(255, 255, 255, 0.78)",
    borderRadius: "5px",
    margin: "0% auto",

    "&:before": {
      content: '""',
      width: "12px",
      height: "12px",
      borderTop: `2px solid ${theme.palette.primary.main}`,
      borderLeft: `2px solid ${theme.palette.primary.main}`,
      borderTopLeftRadius: "5px",
      position: "absolute",
      top: "5px",
      left: "5px",
    },

    "& span.MuiButton-label": {
      fontSize: theme.globals.fontSize.s,
      fontWeight: "600",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      textTransform: "capitalize",
      "@media only screen and (max-device-width:1000px) and (max-device-height: 1500px)":
        {
          fontSize: theme.globals.fontSize.s - 4,
        },
      "@media only screen and (max-device-width: 1500) and (max-device-height: 1000px)":
        {
          fontSize: theme.globals.fontSize.s - 4,
        },
      [theme.breakpoints.down(600)]: {
        fontSize: theme.globals.fontSize.s - 4,
      },
    },

    "&:hover": {
      background: "rgba(255, 255, 255, 0.78)",
    },
  },
}));

export default useStyles;
