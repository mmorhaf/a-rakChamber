import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& *": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& div.contentContainer": {
      marginTop: "30px",
      padding: 0,
    },

    [theme.breakpoints.down(1300)]: {
      width: "100%",
    },

    "& div.tabs": {
      marginTop: "50px",
      marginBottom: 50,
      justifyContent: "space-between",

      [theme.breakpoints.down(950)]: {
        justifyContent: "space-evenly",
      },

      "& div.tabContainer": {
        width: "100%",

        "& ul.nav.nav-tabs": {
          width: "320px",
          marginRight: "auto",
          marginLeft: "auto",
          marginBottom: "50px",
          borderBottom: `unset`,
          justifyContent: "space-between",

          [theme.breakpoints.down(960)]: {
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
          },

          "& li": {
            width: "160px",
            height: "83px",

            "& a": {
              width: "100%",
              height: "55px",
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: theme.globals.fontSize.m - 2,
              lineHeight: "19px",
              textAlign: "center",
              color: theme.palette.primary.main,
              cursor: "pointer",
              display: "grid",
              placeItems: "center",

              "&:hover": {
                border: 0,
              },
            },

            "& a.active": {
              border: `2px solid ${theme.palette.primary.main}!important`,
              borderRadius: "35px",
            },
          },
        },

        "& div.tab-content": {
          marginTop: "30px",

          "& div.tab-pane.active": {
            "& div.row": {
              "& div.actualContent": {
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",

                [theme.breakpoints.down(950)]: {
                  justifyContent: "space-evenly",
                },

                "& div.mediaContainer": {
                  width: "49%",

                  [theme.breakpoints.between(1300, 1400)]: {
                    width: "100%",
                  },

                  [theme.breakpoints.down(950)]: {
                    width: "45%",
                  },

                  [theme.breakpoints.down(830)]: {
                    width: "49%",
                  },

                  [theme.breakpoints.down(700)]: {
                    width: "90%",
                    marginRight: "auto",
                    marginLeft: "auto",
                  },

                  "& div.media": {
                    height: "205px",
                    display: "flex",
                    background: theme.globals.colors.white,
                    boxShadow: "0px 4px 50px rgb(0 0 0 / 7%)",
                    alignItems: "center",
                    paddingLeft: "14px",
                    borderRadius: "5px",
                    marginBottom: "15px",
                    paddingRight: "10px",
                    justifyContent: "space-around",

                    [theme.breakpoints.down(960)]: {
                      height: "unset",
                      padding: "10px",
                    },

                    "& a.imag": {
                      display: "inline-block",
                      marginRight: "20px",
                      width: "140px",
                      height: "160px",

                      [theme.breakpoints.between(750, 950)]: {
                        height: "170px",
                      },

                      [theme.breakpoints.down(750)]: {
                        width: "135px",
                        height: "160px",
                      },

                      [theme.breakpoints.down(580)]: {
                        width: "125px",
                        height: "160px",
                      },

                      "& img": {
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                      },
                    },

                    "& div.media-body": {
                      display: "flex",
                      flexDirection: "column",
                      height: "160px",
                      justifyContent: "space-between",
                      textAlign: "start",

                      [theme.breakpoints.between(750, 950)]: {
                        height: "170px",
                      },

                      [theme.breakpoints.down(750)]: {
                        width: "135px",
                        height: "160px",
                      },

                      [theme.breakpoints.down(580)]: {
                        width: "125px",
                        height: "160px",
                      },

                      [theme.breakpoints.between(700, 830)]: {
                        width: "50%",
                      },

                      [theme.breakpoints.down(700)]: {
                        paddingRight: "20px",
                      },

                      [theme.breakpoints.down(400)]: {
                        paddingRight: "0px",
                      },

                      "& a": {
                        textDecoration: "none",
                      },

                      "& p": {
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
                        fontSize: theme.globals.fontSize.s - 2,
                        lineHeight: "19px",
                        color: theme.globals.colors.textDark,

                        [theme.breakpoints.down(960)]: {
                          height: "90px",
                        },

                        [theme.breakpoints.between(700, 830)]: {
                          fontSize: theme.globals.fontSize.xs,
                        },

                        [theme.breakpoints.between(580, 650)]: {
                          fontSize: theme.globals.fontSize.xs + 1,
                        },
                      },

                      "& div": {
                        display: "flex",
                        justifyContent: "space-between",
                        width: "90%",
                        marginRight: "auto",
                        marginLeft: "auto",

                        [theme.breakpoints.between(1400, 1540)]: {
                          width: "100%",
                        },

                        [theme.breakpoints.between(960, 1040)]: {
                          width: "100%",
                        },

                        [theme.breakpoints.between(830, 915)]: {
                          width: "100%",
                        },

                        [theme.breakpoints.between(700, 830)]: {
                          width: "95%",
                        },

                        [theme.breakpoints.down(440)]: {
                          width: "100%",
                        },

                        "& button": {
                          marginLeft: "17px",
                          height: 30,
                          textTransform: "capitalize",
                          justifyContent: "center",
                          alignItems: "center",
                          color: theme.palette.secondary.main,
                          border: "1px solid",
                          display: "flex",
                          background: theme.globals.colors.white,
                          minWidth: 80,
                          position: "relative",
                          "&:hover": {
                            backgroundImage: "url(/assets/images/home/btn.png)",
                            color: "white",
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
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  searchBtn: {
    height: 30,
    textTransform: "capitalize",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.secondary.main,
    border: "1px solid",
    display: "flex",
    minWidth: 95,
    position: "relative",
    [theme.breakpoints.down(600)]: {
      marginTop: 16,
      marginBottom: 26,
    },
    "&:hover": {
      backgroundImage: "url(/assets/images/home/btn.png)",
      color: "white",
    },
    "& .MuiButton-label": {
      width: "auto",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
  search: {
    display: "flex",
    paddingLeft: theme.direction === "rtl" ? 0 : "32px",
    paddingBottom: "7px",
    marginBottom: 30,
    backgroundColor: theme.globals.colors.bgWhite,
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    justifyContent: "space-around",
    paddingTop: 10,
    [theme.breakpoints.down(600)]: {
      display: "block",
      marginBottom: 26,
      marginTop: 24,
    },
    height: "auto",
    minHeight: "75px",
  },
  searchTitle: {
    "& .MuiTextField-root": {
      width: "95%",
      "& label": {
        textTransform: "capitalize",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
    },
    "& .MuiInputBase-root > input": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
  searchSelect: {
    "& div.MuiFormControl-root": {
      width: "96%",

      "& label": {
        textTransform: "capitalize",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },

      "& div.MuiInputBase-root": {
        display: "flex",
        justifyContent: "flex-end",
      },
    },
  },
  btns: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    height: 30,
    textTransform: "capitalize",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.secondary.main,
    border: "1px solid",
    display: "flex",

    minWidth: 100,
    position: "relative",
    "&:hover": {
      backgroundImage: "url(/assets/images/home/btn.png)",
      color: "white",
    },
    "& .MuiButton-label": {
      width: "auto",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },

  card: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "20px",
    background: theme.globals.colors.white,
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",

    "& .MuiCardMedia-img": {
      width: "200px",
      height: "200px",
      alignSelf: "center",
      justifySelf: "center",
      padding: "23px 0px",
    },
    "& .MuiCardContent-root": {
      alignSelf: "flex-start",
      height: "65px",
    },

    "& .MuiCard-root": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    "& .MuiCardActions-root": {
      justifyContent: "center",
      height: "55px",
    },
    "& .MuiTypography-gutterBottom": {
      fontSize: "18px",
      fontWeight: "600",
      color: "#444444",
      display: "-webkit-box",
      overflow: "hidden",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: "2",
    },
  },
  pub: {
    marginTop: "50px",
    marginBottom: "50px",
  },
  cc: {
    padding: 7,
  },
  imgContainer: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    "& .media": {
      width: "200px",
      height: "200px",
      marginTop: 20,
    },
    "& .MuiCardActions-root": {
      justifyContent: "center",
    },
  },
  CardHeader: {
    width: "calc(100% - 60px)",
    textAlign: "start",
    [theme.breakpoints.down(745)]: {
      width: "80%",
    },
    "& .MuiCardHeader-title": {
      color: "#A7A7A7",
      fontSize: 14,
      textTransform: "capitalize",
      direction: theme.direction === "rtl" ? "rtl!important" : "ltr!important",
      display: "flex",
      flexDirection: "row",
      padding: "0px 4px",
      textAlign: "start",
      [theme.breakpoints.down(735)]: {
        fontSize: 12,
      },
    },
    "& .MuiCardHeader-subheader": {
      display: "block",
      fontSize: theme.globals.fontSize.s + 2,
      color: "#444444",
      fontWeight: "600",
      display: "-webkit-box",
      overflow: "hidden",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 1,
      [theme.breakpoints.down(600)]: {
        fontSize: theme.globals.fontSize.s,
      },
    },
  },
  CardActions: {
    display: "flex",
    justifyContent: "center",
    "& button": {
      marginLeft: "17px",
      height: 30,
      textTransform: "capitalize",
      justifyContent: "center",
      alignItems: "center",
      color: theme.palette.secondary.main,
      border: "1px solid",
      display: "flex",
      background: theme.globals.colors.white,
      minWidth: 100,
      position: "relative",
      "&:hover": {
        backgroundImage: "url(/assets/images/home/btn.png)",
        color: "white",
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
  counters: {
    marginTop: "9px",
    marginRight: "10px",
    width: "60px",
    display: "flex",
    justifyContent: "center",

    "& > span": {
      margin: "3px",
      color: "#A7A7A7",
      fontSize: theme.globals.fontSize.s - 2,
      display: "flex",
      "& > svg": {
        color: "#CDCFD6",
        fontSize: theme.globals.fontSize.s + 2,
        margin: "0px 5px 0px 3px",
      },
    },
  },
}));

export default useStyles;
