import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& div.contentContainer": {
      marginTop: "30px",
    },

    [theme.breakpoints.down(1300)]: {
      width: "100%",
    },

    "& div.tabs": {
      minHeight: "calc(100vh - 370px)",
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

          // [theme.breakpoints.down(960)]: {
          //   width: "95%",
          //   marginLeft: "auto",
          //   marginRight: "auto",
          // },

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
              [theme.breakpoints.down(350)]: {
                fontSize: theme.globals.fontSize.m - 4,
              },
              "&:hover": {
                border: 0,
              },
            },

            "& a.active": {
              border: `1px solid ${theme.palette.primary.main}!important`,
              borderRadius: "35px",
              [theme.breakpoints.down(350)]: {
                maxWidth: 120,
              },
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
  cardRoot: {
    background: theme.globals.colors.white,
    borderRadius: "10px",
    width: "100%",
    maxWidth: 345,
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "20px",
    marginTop: "20px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    alignItems: "center",
    paddingBottom: 10,
    border: "0",
    [theme.breakpoints.down(410)]: {
      maxWidth: 275,
    },
    [theme.breakpoints.down(370)]: {
      maxWidth: 240,
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
    height: "auto",
    minHeight: "75px",
    display: "flex",
    backgroundColor: theme.globals.colors.bgWhite,
    padding: "8px",
    boxShadow: "0px 1px 4px rgb(0 0 0 / 10%)",
    paddingBottom: "7px",
    borderRadius: "5px",
    paddingTop: 10,
    [theme.breakpoints.down(600)]: {
      display: "block",
      marginBottom: 26,
      marginTop: 24,
    },
  },
  searchTitle: {
    "& .MuiTextField-root": {
      width: "95%",
      "& label": {
        textTransform: "capitalize",
        textAlign: "start",
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
        textAlign: "start",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },

      "& div.MuiInputBase-root": {
        display: "flex",
        justifyContent: "flex-end",

        "& svg.MuiSelect-icon.MuiSvgIcon-root": {
          right: "unset!important",
          left: "unset!important",
        },
      },
    },
  },
  btns: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down(600)]: {
      marginTop: 16,
      marginBottom: 26,
    },
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
    minHeight: "calc(100vh - 370px)",

    "& h2.title": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: theme.globals.fontSize.m,
      lineHeight: "23px",
      color: theme.globals.colors.textDark,
      textAlign: "start",
    },
    "& .summary": {
      marginTop: 16,

      "& > p": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontSize: theme.globals.fontSize.s,
        lineHeight: "23px",
        color: theme.globals.colors.textDark,
        textAlign: "start",
        "& *": {
          background: "none!important",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontSize: theme.globals.fontSize.s,
          lineHeight: "23px",
          color: theme.globals.colors.textDark,
          textAlign: "start",
        },
      },
    },
  },
  cc: {
    padding: 15,

    "& div.MuiCard-root": {
      background: theme.globals.colors.white,
      borderRadius: "10px",
      width: "100%",
      maxWidth: 345,
      marginRight: "auto",
      marginLeft: "auto",
      marginBottom: "20px",
      marginTop: "20px",
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      alignItems: "center",
      paddingBottom: 10,
      border: "0",

      [theme.breakpoints.between(900, 1000)]: {
        width: "250px",
      },
    },
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
    width: "calc(100% - 100px)",
    paddingRight: 0,

    "& div.MuiCardHeader-content": {
      width: "100%",
    },

    "& .MuiCardHeader-title": {
      display: "block",
      fontSize: "16px",
      color: "#444444",
      fontWeight: "600",
      textTransform: "capitalize",
      display: "-webkit-box",
      overflow: "hidden",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 1,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .MuiCardHeader-subheader": {
      color: "#A7A7A7",
      fontSize: 14,
      textTransform: "capitalize",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      display: "flex",
    },
  },
  CardActions: {
    display: "flex",
    justifyContent: "space-around",
    "& button": {
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
        display: "flex",
        justifyContent: "space-evenly",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
    },
  },
  counters: {
    marginTop: "15px",
    marginRight: "10px",
    width: 100,
    display: "flex",
    justifyContent: "end",

    "& > span": {
      margin: "3px",
      color: "#A7A7A7",
      fontSize: theme.globals.fontSize.s - 2,
      "& > svg": {
        color: "#CDCFD6",
        fontSize: theme.globals.fontSize.s + 2,
        margin: "0px 5px 0px 3px",
      },
    },
  },
}));

export default useStyles;
