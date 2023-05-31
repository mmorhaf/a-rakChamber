import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  servicesHeader: { background: `${theme.palette.primary.main} !important` },
  headerRoot: {
    height: "112px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    background: "transparent",
    zIndex: 10,
    animation: "$FromTopBase 1.5s 1",
    animationFillMode: "forwards",

    "& div.header": {
      width: "75%",
      height: "100%",
      marginLeft: "auto",
      marginRight: "auto",

      [theme.breakpoints.down(1480)]: {
        width: "79%",
      },

      [theme.breakpoints.down(1400)]: {
        width: "85%",
      },

      [theme.breakpoints.down(1000)]: {
        width: "88%",
        marginRight: "11px",
      },

      [theme.breakpoints.down(700)]: {
        width: "85%",
        marginRight: "0px",
      },

      [theme.breakpoints.down(500)]: {
        width: "81%",
      },

      "& div.notifiContainer": {
        height: "45px",
        display: "flex",
        width: "92%",
        marginLeft: "auto",

        [theme.breakpoints.down(1000)]: {
          height: "40px",
          marginLeft: "unset",
          width: "100%",
        },

        [theme.breakpoints.down(700)]: {
          height: "32px",
        },

        "& div.title": {
          width: "96px",
          height: "100%",
          background: "#A52222",
          display: "flex",
          justifyContent: "center",
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
            textTransform: "capitalize",
            letterSpacing: "1px",

            [theme.breakpoints.down(1000)]: {
              paddingRight: "15px",
              paddingLeft: "15px",
            },

            [theme.breakpoints.down(700)]: {
              paddingRight: "10px",
              paddingLeft: "10px",
            },

            [theme.breakpoints.down(650)]: {
              fontSize: theme.globals.fontSize.xs,
              paddingRight: "6px",
              paddingLeft: "6px",
            },
          },
        },

        "& div.content": {
          position: "relative",
          width: "calc(100% - 96px)",
          background: "rgba(255, 255, 255, 0.16)",
          display: "flex",
          alignItems: "center",

          "& div.slick-slider": {
            width: "calc(100% - 50px)",

            [theme.breakpoints.down(700)]: {
              width: "calc(100% - 30px)",
            },

            [theme.breakpoints.down(400)]: {
              width: "calc(100% - 21px)",
            },

            "& div.slick-slide": {
              "& > div": {
                width: "100%",

                "& div.slideContainer": {
                  height: "100%!important",

                  "& div.actualContent": {
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto",

                    [theme.breakpoints.down(700)]: {
                      width: "95%",
                    },

                    "& a": {
                      width: "100%",

                      "&  span.contentContainer": {
                        direction:
                          theme.direction === "rtl" ? "rtl!important" : "ltr",
                        textAlign: "start",
                        fontFamily:
                          theme.direction === "rtl"
                            ? theme.globals.fontFamily.ar
                            : theme.globals.fontFamily.en,
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: theme.globals.fontSize.xs + 1,
                        lineHeight: "19px",
                        color: theme.globals.colors.white,
                        overflow: "hidden",
                        display: "-webkit-box",
                        "-webkitLineClamp": 1,
                        "-webkitBoxOrient": "vertical",

                        [theme.breakpoints.down(700)]: {
                          fontSize: theme.globals.fontSize.xs,
                        },

                        [theme.breakpoints.down(500)]: {
                          fontSize: theme.globals.fontSize.xs - 2,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },

        "& button.close": {
          position: "absolute",
          top: 0,
          right: 0,
          width: "50px",
          height: "100%",
          background: "rgba(255, 255, 255, 0.16)",
          transform: "matrix(1, 0, 0, -1, 0, 0)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 0,

          [theme.breakpoints.down(700)]: {
            width: "30px",
          },

          [theme.breakpoints.down(400)]: {
            width: "21px",
          },

          "& svg": {
            color: "#A52222",

            [theme.breakpoints.down(400)]: {
              fontSize: theme.globals.fontSize.s,
            },
          },

          "&:hover svg": {
            transform: "scale(1.1)",
          },
        },
      },

      "& div.headerContainer": {
        width: "92%",
        marginLeft: "auto",
        marginTop: 6,
        position: "relative",

        [theme.breakpoints.down(1000)]: {
          width: "100%",
          marginTop: 0,
          display: "flex",
        },

        "& div.navBarC": {
          [theme.breakpoints.between(1280, 1300)]: {
            flexGrow: 0,
            maxWidth: "100%",
            flexBasis: "100%",
          },

          "& div.navBar": {
            "& header": {
              background: "transparent",
              boxShadow: "unset",

              "& div.MuiToolbar-root": {
                height: "40px!important",
                minHeight: "unset",
                paddingLeft: 0,
                paddingRight: 0,
                position: "unset",

                [theme.breakpoints.down(1000)]: {
                  height: "40px!important",
                  background: theme.palette.primary.main,
                },

                [theme.breakpoints.down(700)]: {
                  height: "35px!important",
                },

                "& button": {
                  marginLeft: 0,
                  marginRight: 0,
                  padding: "7px",
                },

                "& button.siteMapBtn, & button.homeBtn": {
                  height: "40px",
                  width: "48px",
                  borderRadius: 0,
                  transition: "all 0s",

                  [theme.breakpoints.down(1000)]: {
                    height: "40px!important",
                  },

                  [theme.breakpoints.down(700)]: {
                    height: "35px!important",
                  },

                  "& svg": {
                    [theme.breakpoints.down(700)]: {
                      fontSize: theme.globals.fontSize.m,
                    },
                  },
                },

                "& button.siteMapBtn": {
                  background: theme.palette.primary.main,
                  color: theme.globals.colors.white,
                },

                "& a": {
                  "& button.homeBtn": {
                    color: theme.palette.primary.main,
                    background: theme.globals.colors.white,
                  },
                },

                "& a.navLink": {
                  color: "inherit",
                },

                "& div.forDesktop": {
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  postion: "relative",
                  padding: "0 30px",

                  // [theme.breakpoints.down(1300)]: {
                  //   flexGrow: 1,
                  //   justifyContent: "space-between",
                  //   padding: "0 0 0 20px",
                  // },

                  [theme.breakpoints.down(1300)]: {
                    display: "none",
                  },

                  "& div.itemContainer": {
                    display: "flex",
                    alignItems: "center",
                    height: "100%",

                    "& > a.navLink": {
                      height: "100%",

                      [theme.breakpoints.down(1300)]: {
                        marginLeft: "16px",
                      },

                      [theme.breakpoints.down(1000)]: {
                        marginLeft: "5px",
                      },

                      "& h6.title": {
                        fontFamily:
                          theme.direction === "rtl"
                            ? theme.globals.fontFamily.ar
                            : theme.globals.fontFamily.en,
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: theme.globals.fontSize.s - 2,
                        lineHeight: "21px",
                        textAlign: "center",
                        color: theme.globals.colors.white,
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        textTransform: "capitalize",

                        [theme.breakpoints.down(1060)]: {
                          fontSize: theme.globals.fontSize.xs + 1,
                        },
                      },
                    },

                    "& a.active.baseLink": {
                      position: "relative",

                      "&::after": {
                        position: "absolute",
                        top: "80%",
                        left: 0,
                        content: "''",
                        width: "100%",
                        height: 3,
                        background: theme.globals.colors.white,
                      },
                    },

                    "& a.baseLink:hover": {
                      position: "relative",

                      "&::after": {
                        position: "absolute",
                        top: "80%",
                        left: 0,
                        content: "''",
                        width: "100%",
                        height: 3,
                        background: theme.globals.colors.white,
                      },
                    },

                    "& div.childrenContainer": {
                      display: "none",
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      width: "100%",
                      minHeight: "125px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      paddingTop: "10px",
                      zIndex: 100,
                      background: `${theme.globals.colors.white}f2`,
                      borderRadius: "0 0 5px 5px",
                      paddingLeft: 125,
                      alignContent: "flex-start",

                      "& a": {
                        marginBottom: "10px",
                        height: 30,
                        width: "fit-content",
                        minWidth: "15%",
                        display: "flex",
                        alignItems: "center",
                        marginRight: 35,

                        "& h6": {
                          fontFamily:
                            theme.direction === "rtl"
                              ? theme.globals.fontFamily.ar
                              : theme.globals.fontFamily.en,
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: theme.globals.fontSize.xs + 2,
                          lineHeight: "19px",
                          textAlign: "center",
                          color: theme.palette.primary.main,
                          opacity: 0.8,

                          textTransform: "capitalize",
                        },

                        "&:hover": {
                          "& h6": {
                            opacity: 1,
                          },
                        },
                      },
                      "& div.navItemWithChilds": {
                        display: "flex",
                        flexDirection: "column",
                        flex: "1 1 auto",
                        flexBasis: "content",
                        "& a": {
                          width: "auto",
                          "& h6": { fontSize: theme.globals.fontSize.xs },
                        },
                        "& .navLinkParent": {
                          position: "relative",
                          "&::after": {
                            width: "30px",
                            height: "2px",
                            content: "''",
                            position: "absolute",
                            background: theme.palette.primary.main,
                            top: "30px",
                          },
                          "& h6": { fontSize: theme.globals.fontSize.xs + 2 },
                        },
                      },
                    },
                  },

                  "& div.itemContainer:hover div.childrenContainer": {
                    display: "flex",
                    flexWrap: "wrap",
                  },

                  "& div.itemContainer.no:hover div.childrenContainer": {
                    display: "none",
                    flexWrap: "wrap",
                  },

                  "& button.settingsBtn": {
                    width: 50,

                    [theme.breakpoints.up(1300)]: {
                      display: "none",
                    },

                    "& svg": {
                      color: theme.globals.colors.white,
                    },
                  },
                },

                "& div.smtoolBar": {
                  [theme.breakpoints.up(1300)]: {
                    display: "none",
                  },

                  padding: "0px 20px",
                  flexGrow: 1,
                  justifyContent: "space-between",

                  "& div.toolsContainer": {
                    display: "flex",
                    justifyContent: "center",
                    height: "40px",

                    [theme.breakpoints.between(500, 800)]: {
                      width: "85%",
                      marginRight: "auto",
                      marginLeft: "auto",
                      justifyContent: "space-between",
                    },

                    [theme.breakpoints.down(700)]: {
                      height: "35px",
                    },

                    [theme.breakpoints.down(400)]: {
                      justifyContent: "space-evenly",
                    },

                    "& div.searchBar": {
                      width: "100%!important",

                      "& div.MuiTextField-root": {
                        height: "100%",
                        width: "calc(100% - 40px)",

                        "& div.MuiInputBase-root": {
                          height: "100%",

                          "& input::placeholder": {
                            fontFamily:
                              theme.direction === "rtl"
                                ? theme.globals.fontFamily.ar
                                : theme.globals.fontFamily.en,
                            fontStyle: "normal",

                            fontWeight: "normal",
                            fontSize: theme.globals.fontSize.xs + 1,
                            lineHeight: "16px",
                            color: theme.globals.colors.white,
                            paddingLeft: "10px",
                          },
                        },
                      },

                      "& button.close": {
                        width: "40px!important",
                        marginRight: "0!important",
                      },
                    },

                    "& div.bar": {
                      width: "100%",
                      justifyContent: "space-between",
                    },

                    "& button.searchIcon": {
                      width: "35px",
                      marginRight: 0,

                      [theme.breakpoints.down(500)]: {
                        width: "fit-content",
                      },

                      "& span.MuiIconButton-label": {
                        height: "100%",

                        "& svg": {
                          marginRight: "unset",
                        },
                      },
                    },

                    "& button": {
                      padding: 0,
                      height: "100%",
                      marginRight: "10px",

                      [theme.breakpoints.down(400)]: {
                        marginRight: 0,
                      },

                      "& svg": {
                        color: theme.globals.colors.white,
                        fontSize: theme.globals.fontSize.s + 1,
                        marginRight: "3px",
                      },

                      "& span.MuiBox-root": {
                        fontFamily:
                          theme.direction === "rtl"
                            ? theme.globals.fontFamily.ar
                            : theme.globals.fontFamily.en,
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize:
                          theme.direction === "rtl"
                            ? theme.globals.fontSize.xs - 2
                            : theme.globals.fontSize.xs - 1,
                        whiteSpace: "nowrap!important",
                        lineHeight: "21px",
                        textAlign: "center",
                        color: theme.globals.colors.white,
                        height: "100%",
                        display: "flex",
                        alignItems: "center",

                        [theme.breakpoints.down(800)]: {
                          fontSize: theme.globals.fontSize.s - 2,
                        },

                        [theme.breakpoints.down(625)]: {
                          fontSize: theme.globals.fontSize.s - 4,
                        },

                        [theme.breakpoints.down(600)]: {
                          fontSize: theme.globals.fontSize.xs - 2,
                        },

                        [theme.breakpoints.down(455)]: {
                          fontSize: theme.globals.fontSize.xs - 1,
                        },

                        [theme.breakpoints.down(555)]: {
                          display: "none",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },

        "& div.toolBarC": {
          [theme.breakpoints.down(1300)]: {
            display: "none",
          },

          "& div.toolBar": {
            background: theme.palette.primary.main,

            "& div.toolsContainer": {
              display: "flex",
              justifyContent: "center",
              height: "40px",

              [theme.breakpoints.between(500, 800)]: {
                width: "85%",
                marginRight: "auto",
                marginLeft: "auto",
                justifyContent: "space-between",
              },

              [theme.breakpoints.down(700)]: {
                height: "35px",
              },

              [theme.breakpoints.down(400)]: {
                justifyContent: "space-evenly",
              },

              "& div.searchBar": {
                width: "100%!important",

                "& div.MuiTextField-root": {
                  height: "100%",
                  width: "calc(100% - 40px)",

                  "& div.MuiInputBase-root": {
                    height: "100%",

                    "& input::placeholder": {
                      fontFamily:
                        theme.direction === "rtl"
                          ? theme.globals.fontFamily.ar
                          : theme.globals.fontFamily.en,
                      fontStyle: "normal",
                      fontWeight: "normal",
                      fontSize: theme.globals.fontSize.xs + 1,
                      lineHeight: "16px",
                      color: theme.globals.colors.white,
                      paddingLeft: "10px",
                    },
                  },
                },

                "& button.close": {
                  width: "40px!important",
                  marginRight: "0!important",
                },
              },

              "& button.searchIcon": {
                width: "35px",
                marginRight: 0,

                [theme.breakpoints.down(500)]: {
                  width: "fit-content",
                },

                "& span.MuiIconButton-label": {
                  height: "100%",

                  "& svg": {
                    marginRight: "unset",
                  },
                },
              },

              "& button": {
                padding: 0,
                height: "100%",
                marginRight: "8px",
                [theme.breakpoints.down(1327)]: {
                  marginRight: 5,
                },
                [theme.breakpoints.down(400)]: {
                  marginRight: 0,
                },

                "& svg": {
                  color: theme.globals.colors.white,
                  fontSize: theme.globals.fontSize.m,
                  marginRight: "3px",

                  [theme.breakpoints.down(400)]: {
                    fontSize: theme.globals.fontSize.xs + 1,
                  },
                },

                "& span.MuiBox-root": {
                  fontFamily:
                    theme.direction === "rtl"
                      ? theme.globals.fontFamily.ar
                      : theme.globals.fontFamily.en,
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize:
                    theme.direction === "rtl"
                      ? theme.globals.fontSize.xs - 5
                      : theme.globals.fontSize.xs - 2,
                  lineHeight: "21px",
                  textAlign: "center",
                  color: theme.globals.colors.white,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  [theme.breakpoints.down(800)]: {
                    fontSize:
                      theme.direction === "rtl"
                        ? theme.globals.fontSize.xs - 5
                        : theme.globals.fontSize.s - 2,
                  },

                  [theme.breakpoints.down(625)]: {
                    fontSize:
                      theme.direction === "rtl"
                        ? theme.globals.fontSize.xs - 5
                        : theme.globals.fontSize.s - 4,
                  },

                  [theme.breakpoints.down(600)]: {
                    fontSize:
                      theme.direction === "rtl"
                        ? theme.globals.fontSize.xs - 5
                        : theme.globals.fontSize.s - 2,
                  },

                  [theme.breakpoints.down(455)]: {
                    fontSize:
                      theme.direction === "rtl"
                        ? theme.globals.fontSize.xs - 5
                        : theme.globals.fontSize.xs - 1,
                  },
                  [theme.breakpoints.down(400)]: {
                    fontSize:
                      theme.direction === "rtl"
                        ? theme.globals.fontSize.xs - 5
                        : theme.globals.fontSize.xs - 2,
                  },
                },
              },
            },
          },
        },
      },
    },

    "& div.smallScreens": {
      [theme.breakpoints.up(900)]: {
        display: "none",
      },
    },

    "& div.logoContainer": {
      "& > a > div": {
        top: "0",
        left: "11%",
        height: "100px",
        width: "112px",
        display: "grid",

        [theme.breakpoints.down(1480)]: {
          left: "5%",
        },

        [theme.breakpoints.down(1300)]: {
          left: "1%",
        },

        [theme.breakpoints.between(940, 1000)]: {
          height: "86px",
          width: "100px",
        },

        [theme.breakpoints.down(940)]: {
          width: "80px",
          height: "67px",
          top: "14%",
        },

        [theme.breakpoints.down(800)]: {
          width: "69px",
          height: "58px",
          top: "24%",
        },
        [theme.breakpoints.down(700)]: {
          left: "2%",
          top: "12%",
        },

        [theme.breakpoints.down(400)]: {
          left: "2%",
          width: "60px",
          height: "45px",
          top: "19%",
        },
        [theme.breakpoints.down(350)]: {
          width: "55px",
          height: "42px",
          top: "23%",
        },
      },
    },
  },
  language: {
    fontFamily:
      theme.direction === "rtl"
        ? `${theme.globals.fontFamily.en}!important`
        : `${theme.globals.fontFamily.ar}!important`,
  },
  onScroll: {
    height: "55px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    background: "transparent !important",
    zIndex: 10,
    animation: "$FromTop 1.5s 1",
    animationFillMode: "forwards",
    [theme.breakpoints.down(1300)]: {
      height: "75px",
    },
    "& div.header": {
      position: "relative",
      width: "83%",
      height: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      background: theme.globals.colors.white,
      [theme.breakpoints.down(1050)]: {
        width: "100%",
      },

      "& div.MuiGrid-container": {
        height: "100%",
      },

      "& div.notificationContainer": {
        "& div.notifiContainer": {
          display: "none",
        },
      },

      "& div.headerContainer": {
        width: "92%",
        marginLeft: "auto",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",

        "& > div.MuiGrid-root:nth-child(2)": {
          height: "100%",
        },

        "& div.navBarC": {
          height: "100%",

          [theme.breakpoints.between(1280, 1300)]: {
            flexGrow: 0,
            maxWidth: "100%",
            flexBasis: "100%",
          },
        },

        "& div.navBar": {
          height: "100%",

          "& header": {
            height: "100%",
            background: "transparent",
            boxShadow: "unset",

            "& div.MuiToolbar-root": {
              height: "100%",
              minHeight: "unset",
              paddingLeft: 0,
              paddingRight: 0,
              position: "unset",

              "& button": {
                marginLeft: 0,
                marginRight: 0,
                padding: "7px",
              },

              "& button.siteMapBtn, & button.homeBtn": {
                height: "40px",
                width: "48px",
                borderRadius: 0,
                transition: "all 0s",
              },

              "& button.siteMapBtn": {
                background: theme.globals.colors.white,
                color: theme.palette.primary.main,

                [theme.breakpoints.down(1000)]: {
                  marginLeft: 30,
                },
              },

              "& button.homeBtn": {
                color: theme.palette.primary.main,
                background: theme.globals.colors.white,
              },

              "& a.navLink": {
                color: "inherit",
              },

              "& div.forDesktop": {
                display: "flex",
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 30px",

                [theme.breakpoints.down(1300)]: {
                  display: "none",
                },

                "& a": {
                  height: "100%",
                  marginLeft: "21px",

                  "& h6.title": {
                    fontFamily:
                      theme.direction === "rtl"
                        ? theme.globals.fontFamily.ar
                        : theme.globals.fontFamily.en,
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: theme.globals.fontSize.s - 2,
                    lineHeight: "21px",
                    textAlign: "center",
                    color: theme.palette.primary.main,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    textTransform: "capitalize",
                  },
                },

                "& div.itemContainer": {
                  height: "100%",
                  display: "flex",
                  alignItems: "center",

                  "& > a.navLink": {
                    height: "100%",
                    marginLeft: 0,

                    "& h6.title": {
                      fontFamily:
                        theme.direction === "rtl"
                          ? theme.globals.fontFamily.ar
                          : theme.globals.fontFamily.en,
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: theme.globals.fontSize.s - 2,
                      lineHeight: "21px",
                      textAlign: "center",
                      color: theme.palette.primary.main,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      textTransform: "capitalize",

                      [theme.breakpoints.between(1300, 1430)]: {
                        fontSize: theme.globals.fontSize.xs,
                      },

                      [theme.breakpoints.down(1150)]: {
                        fontSize: theme.globals.fontSize.xs + 1,
                      },
                    },
                  },

                  "& a.active.baseLink": {
                    position: "relative",

                    "&::after": {
                      position: "absolute",
                      top: "80%",
                      left: 0,
                      content: "''",
                      width: "100%",
                      height: 3,
                      background: theme.palette.primary.main,
                    },
                  },

                  "& a.baseLink:hover": {
                    position: "relative",

                    "&::after": {
                      position: "absolute",
                      top: "80%",
                      left: 0,
                      content: "''",
                      width: "100%",
                      height: 3,
                      background: theme.palette.primary.main,
                    },
                  },

                  "& div.childrenContainer": {
                    display: "none",
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                    minHeight: "125px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    paddingTop: "10px",
                    alignContent: "flex-start",
                    zIndex: 100,
                    background: `${theme.globals.colors.white}f2`,
                    borderRadius: "0 0 5px 5px",
                    paddingLeft: 188,

                    "& a": {
                      marginBottom: "10px",
                      height: 30,
                      width: "fit-content",
                      minWidth: "15%",
                      display: "flex",
                      alignItems: "center",
                      marginRight: 35,
                      "& h6": {
                        fontFamily:
                          theme.direction === "rtl"
                            ? theme.globals.fontFamily.ar
                            : theme.globals.fontFamily.en,
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: theme.globals.fontSize.xs + 2,
                        lineHeight: "19px",
                        textAlign: "center",
                        color: theme.palette.primary.main,
                        opacity: 0.8,

                        textTransform: "capitalize",
                      },

                      "&:hover": {
                        "& h6": {
                          opacity: 1,
                        },
                      },
                    },
                    "& div.navItemWithChilds": {
                      display: "flex",
                      flexDirection: "column",
                      flex: "1 1 auto",
                      flexBasis: "content",
                      "& a": {
                        width: "auto",
                        "& h6": { fontSize: theme.globals.fontSize.xs },
                      },
                      "& .navLinkParent": {
                        position: "relative",
                        "&::after": {
                          width: "30px",
                          height: "2px",
                          content: "''",
                          position: "absolute",
                          background: theme.palette.primary.main,
                          top: "30px",
                        },
                        "& h6": { fontSize: theme.globals.fontSize.xs + 2 },
                      },
                    },
                  },
                },

                "& div.itemContainer:hover div.childrenContainer": {
                  display: "flex",
                  flexWrap: "wrap",
                },

                "& div.itemContainer.no:hover div.childrenContainer": {
                  display: "none",
                  flexWrap: "wrap",
                },

                "& button.settingsBtn": {
                  width: 50,

                  [theme.breakpoints.up(1300)]: {
                    display: "none",
                  },

                  "& svg": {
                    color: theme.palette.primary.main,
                  },
                },
              },

              "& div.smtoolBar": {
                [theme.breakpoints.up(1300)]: {
                  display: "none",
                },

                height: "100%",
                padding: "0 0 0 20px",
                flexGrow: 1,
                justifyContent: "space-between",

                "& div.toolsContainer": {
                  display: "flex",
                  justifyContent: "center",
                  height: "40px",

                  [theme.breakpoints.down(800)]: {
                    width: "85%",
                    height: "100%",
                    marginRight: "auto",
                    marginLeft: "auto",
                    justifyContent: "space-between",
                  },

                  [theme.breakpoints.down(700)]: {
                    height: "35px",
                  },

                  [theme.breakpoints.down(400)]: {
                    justifyContent: "space-evenly",
                  },

                  "& div.searchBar": {
                    width: "100%!important",

                    "& div.MuiTextField-root": {
                      height: "100%",
                      width: "calc(100% - 40px)",

                      "& div.MuiInputBase-root": {
                        height: "100%",

                        "& input::placeholder": {
                          fontFamily:
                            theme.direction === "rtl"
                              ? theme.globals.fontFamily.ar
                              : theme.globals.fontFamily.en,
                          fontStyle: "normal",
                          fontWeight: "normal",
                          fontSize: theme.globals.fontSize.xs + 1,
                          lineHeight: "16px",
                          color: theme.globals.colors.white,
                          paddingLeft: "10px",
                        },
                      },
                    },

                    "& button.close": {
                      width: "40px!important",
                      marginRight: "0!important",
                    },
                  },

                  "& div.bar": {
                    width: "100%",
                    justifyContent: "space-around",
                    alignItems: "baseline",
                  },

                  "& button.searchIcon": {
                    width: "35px",
                    marginRight: 0,

                    [theme.breakpoints.down(500)]: {
                      width: "fit-content",
                    },

                    "& span.MuiIconButton-label": {
                      height: "100%",

                      "& svg": {
                        marginRight: "unset",
                      },
                    },
                  },

                  "& button": {
                    padding: 0,
                    height: "100%",
                    marginRight: "8px",

                    [theme.breakpoints.down(400)]: {
                      marginRight: 0,
                    },

                    "& svg": {
                      color: theme.globals.colors.white,
                      fontSize: theme.globals.fontSize.s + 1,
                      marginRight: "3px",
                    },

                    "& span.MuiBox-root": {
                      fontFamily:
                        theme.direction === "rtl"
                          ? theme.globals.fontFamily.ar
                          : theme.globals.fontFamily.en,
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize:
                        theme.direction === "rtl"
                          ? theme.globals.fontSize.xs - 2
                          : theme.globals.fontSize.xs - 1,
                      whiteSpace: "nowrap!important",
                      lineHeight: "21px",
                      textAlign: "center",
                      color: theme.globals.colors.white,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",

                      [theme.breakpoints.down(800)]: {
                        fontSize: theme.globals.fontSize.s - 2,
                      },
                      [theme.breakpoints.down(625)]: {
                        fontSize: theme.globals.fontSize.s - 4,
                      },
                      [theme.breakpoints.down(600)]: {
                        fontSize: theme.globals.fontSize.xs - 2,
                      },

                      [theme.breakpoints.down(455)]: {
                        fontSize: theme.globals.fontSize.xs - 1,
                      },

                      [theme.breakpoints.down(555)]: {
                        display: "none",
                      },
                    },
                  },
                },
              },
            },
          },
        },

        "& div.toolBarC": {
          [theme.breakpoints.down(1300)]: {
            display: "none",
          },
        },

        "& div.toolBar": {
          height: "100%",
          background: theme.palette.primary.main,

          "& div.toolsContainer": {
            display: "flex",
            justifyContent: "space-evenly",
            height: "100%!important",

            "& div.searchBar": {
              width: "100%!important",

              "& button.close": {
                width: "40px!important",
              },
            },

            "& button.searchIcon": {
              width: "35px",
              marginRight: 0,

              "& span.MuiIconButton-label": {
                height: "100%",

                "& svg": {
                  marginRight: "unset",
                },
              },
            },

            "& button": {
              padding: 0,
              height: "100%",
              marginRight: "8px",
              marginBottom: 8,
              "& svg": {
                color: theme.globals.colors.white,
                fontSize: theme.globals.fontSize.s + 1,
                marginRight: "3px",

                [theme.breakpoints.down(1430)]: {
                  fontSize: theme.globals.fontSize.s - 1,
                },
              },

              "& span.MuiBox-root": {
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontWeight: "500",
                fontSize:
                  theme.direction === "rtl"
                    ? theme.globals.fontSize.xs - 5
                    : theme.globals.fontSize.xs,
                whiteSpace: "nowrap!important",
                lineHeight: "21px",
                textAlign: "center",
                color: theme.globals.colors.white,
                height: "100%",
                display: "flex",
                alignItems: "center",

                [theme.breakpoints.down(1430)]: {
                  fontSize:
                    theme.direction === "rtl"
                      ? theme.globals.fontSize.xs - 2
                      : theme.globals.fontSize.xs - 1,
                },
                [theme.breakpoints.down(800)]: {
                  fontSize:
                    theme.direction === "rtl"
                      ? theme.globals.fontSize.xs - 5
                      : theme.globals.fontSize.s - 2,
                },

                [theme.breakpoints.down(625)]: {
                  fontSize:
                    theme.direction === "rtl"
                      ? theme.globals.fontSize.xs - 5
                      : theme.globals.fontSize.s - 4,
                },

                [theme.breakpoints.down(600)]: {
                  fontSize:
                    theme.direction === "rtl"
                      ? theme.globals.fontSize.xs - 5
                      : theme.globals.fontSize.s - 2,
                },

                [theme.breakpoints.down(455)]: {
                  fontSize:
                    theme.direction === "rtl"
                      ? theme.globals.fontSize.xs - 5
                      : theme.globals.fontSize.xs - 1,
                },
                [theme.breakpoints.down(400)]: {
                  fontSize:
                    theme.direction === "rtl"
                      ? theme.globals.fontSize.xs - 5
                      : theme.globals.fontSize.xs - 2,
                },
              },
            },
          },
        },
      },
    },

    "& div.smallScreens": {
      [theme.breakpoints.up(900)]: {
        display: "none",
      },
    },

    "& div.logoContainer": {
      "& > a > div": {
        left: "11.4%!important",
        top: 0,
        height: "51px",
        width: "67px",
        display: "flex",
        alignItems: "center",
        padding: 0,
        [theme.breakpoints.down(1400)]: {
          left: "10.4%!important",
        },
        [theme.breakpoints.down(1300)]: {
          left: "9.4%!important",
          height: "70px",
          width: "70px",
        },
        [theme.breakpoints.down(1050)]: {
          left: "1%!important",
        },

        "& img": {
          height: "100%",
          objectFit: "contain",
        },
      },
    },
  },

  search: {
    height: "100%",
    width: "100%",
    position: "relative",

    "& button": {
      marginRight: "0",
    },
  },

  searchIcon: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    width: "40px",
    zIndex: "1000",

    "& svg": {
      color: theme.globals.colors.textLight,
      fontSize: "20px",
    },
  },

  inputRoot: {
    color: "inherit",
    fontSize: "unset",
    width: "100%",
    height: "100%",

    "& input": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: theme.globals.fontSize.xs + 1,
      lineHeight: "16px",
      color: theme.globals.colors.white,
    },

    "& input::placeholder": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: theme.globals.fontSize.xs + 1,
      lineHeight: "16px",
      color: theme.globals.colors.white,
    },
  },

  inputInput: {
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "100%",
    padding: "4px 0 7px",
  },

  "@keyframes FromTopBase": {
    "0%": {
      opacity: "0.1",
    },

    "100%": {
      opacity: "1",
    },
  },

  "@keyframes FromTop": {
    "0%": {
      transform: "translate3d(0,-20px,0)",
      opacity: "0.1",
    },

    "100%": {
      transform: "none",
      opacity: "1",
    },
  },
  dialog: {
    "& .MuiDialogTitle-root": {
      borderBottom: "2px dashed #eee",
      "& h2": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        textAlign: "center",
      },
    },
    "& .MuiDialogContentText-root": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .MuiButton-label": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
}));

export default useStyles;
