import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  eventsRoot: {
    textAlign: "start",

    [theme.breakpoints.down(1300)]: {
      width: "100%",
    },

    "& div.MuiContainer-root": {
      marginTop: "30px",

      "& div.pagination": {
        marginBottom: "50px",
      },
    },

    "& div.events": {
      minHeight: "calc(100vh - 370px)",
      justifyContent: "space-between",
      height: "fit-content",
      height: "100%",
      padding: "14px",
      paddingTop: "0px",
      backgroundColor: theme.globals.colors.bgWhite,
      borderRadius: "6px",

      [theme.breakpoints.down(950)]: {
        justifyContent: "space-evenly",
      },

      "& div.MuiGrid-root": {
        width: "49%",
        marginBottom: "20px",

        [theme.breakpoints.between(1300, 1400)]: {
          width: "100%",
        },

        [theme.breakpoints.down(940)]: {
          width: "75%",
        },

        [theme.breakpoints.down(750)]: {
          width: "90%",
          marginRight: "auto",
          marginLeft: "auto",
        },
        [theme.breakpoints.down(600)]: {
          width: "100%",
        },
        "& div.media": {
          background: theme.globals.colors.white,
          boxShadow: "0px 4px 50px rgb(0 0 0 / 7%)",
          borderRadius: "5px",
          padding: "10px",
          justifyContent: "space-between",

          [theme.breakpoints.down(960)]: {
            height: "unset",
            padding: "10px",
          },

          "& a.imageLink": {
            display: "inline-block",
            marginRight: "20px",
            width: "145px",
            height: "182px",

            [theme.breakpoints.between(1400, 1500)]: {
              width: "135px",
              marginRight: "10px",
            },

            [theme.breakpoints.between(950, 1030)]: {
              width: "130px",
            },

            [theme.breakpoints.down(950)]: {
              width: "135px",
              height: "182px",
            },

            [theme.breakpoints.down(580)]: {
              width: "125px",
              height: "160px",
            },

            [theme.breakpoints.down(445)]: {
              height: "174px",
            },

            "& img": {
              width: "100%",
              height: "100%",
              borderRadius: "10px",
            },
          },

          "& div.media-body": {
            height: "182px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",

            [theme.breakpoints.down(700)]: {
              paddingRight: "20px",
            },

            [theme.breakpoints.down(580)]: {
              height: "160px",
            },

            [theme.breakpoints.down(445)]: {
              height: "174px",
            },

            [theme.breakpoints.down(400)]: {
              paddingRight: "0px",
            },

            "& a": {
              textDecoration: "none",
            },

            "& h4": {
              overflow: "hidden",
              display: "-webkit-box",
              "-webkitLineClamp": 2,
              "-webkitBoxOrient": "vertical",
              height: "37px",
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: theme.globals.fontSize.s - 2,
              lineHeight: "19px",
              color: theme.globals.colors.textDark,
              marginBottom: "5px",

              [theme.breakpoints.between(1029, 1037)]: {
                fontSize: theme.globals.fontSize.s - 3,
              },

              [theme.breakpoints.between(960, 1000)]: {
                fontSize: theme.globals.fontSize.s - 3,
              },

              [theme.breakpoints.down(460)]: {
                fontSize: theme.globals.fontSize.xs,
                height: "48px",
              },
            },

            "& div.details span": {
              marginBottom: "6px",
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: theme.globals.fontSize.xs,
              lineHeight: "126%",
              color: theme.globals.colors.textLight,
              mixBlendMode: "normal",
              display: "flex",
              alignItems: "center",

              [theme.breakpoints.down(445)]: {
                fontSize: theme.globals.fontSize.xs - 1,
              },

              "& svg": {
                color: theme.globals.colors.textLight,
                display: "block",
                marginRight: "5px",
                fontSize: theme.globals.fontSize.m,

                [theme.breakpoints.down(610)]: {
                  width: "0.7em",
                  height: "0.7em",
                },

                "& path": {
                  [theme.breakpoints.down(610)]: {
                    fontSize: "1rem",
                  },
                },
              },
            },

            "& div:not(div.details)": {
              marginTop: "16px",
              width: "90%",
              display: "flex",
              justifyContent: "space-between",

              [theme.breakpoints.down(460)]: {
                marginTop: "21px",
              },

              "& button": {
                border: `1px solid ${theme.palette.secondary.main}`,
                height: "25px",
                width: "93px",
                borderRadius: "3px",
                backgroundColor: theme.globals.colors.white,
                padding: "0",
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: theme.globals.fontSize.s - 2,
                lineHeight: "19px",
                color: theme.palette.secondary.main,
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
  search: {
    height: "auto",
    minHeight: "75px",
    display: "flex",
    backgroundColor: theme.globals.colors.bgWhite,
    paddingLeft: "32px",
    boxShadow: "0px 1px 4px rgb(0 0 0 / 10%)",
    paddingBottom: "7px",
    borderRadius: "5px",
    marginBottom: "30px",
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
  page: {
    marginTop: 30,
  },
  TabPanel: {
    "&>div": {
      padding: "0px",
      "&>p": {
        "&>div": {
          display: "flex",
          flexWrap: "wrap",
        },
      },
    },
  },
  eventsTab: {
    "& header.MuiAppBar-colorPrimary": {
      boxShadow: "unset",
      color: "#3B4A72",
      backgroundColor: "transparent",
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: "center",
      marginBottom: 10,
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "transparent",
    },
    "& span.MuiTab-wrapper": {
      fontSize: theme.globals.fontSize.s + 2,
      fontWeight: "600",
      color: "#444444",
    },
    "& .Mui-selected": {
      "&>span.MuiTab-wrapper": {
        border: "1px solid",
        padding: "9px",
        color: theme.globals.colors.textGeneral,
        borderRadius: "45px",
        fontSize: theme.globals.fontSize.s + 2,
        fontWeight: "600",
        color: "#3B4A72",
      },
    },
  },
  table: {
    marginTop: "30px",
    "& > div > div table thead tr th span button": {
      width: "100%",
    },
  },
  EOnThisDay: {
    "& .media": {
      height: "180px !important",
    },
  },
}));

export default useStyles;
