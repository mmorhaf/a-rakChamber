import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    flex: "1 1 auto",
    marginLeft: "auto",
    marginRight: "auto",

    [theme.breakpoints.between(960, 1450)]: {
      maxWidth: "396px",
    },

    "&  div.cardContentContainer": {
      width: "100%",
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      "& > .MuiBox-root": {
        height: "100%",
      },
    },
    "& h2": {
      textAlign: "start",
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      height: "55px",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: theme.globals.fontSize.s,
      lineHeight: "22px",
      textTransform: "capitalize",
      color: theme.palette.primary.main,
      paddingRight: "15px",
      paddingLeft: "15px",
      overflow: "hidden",
      display: "-webkit-box",
      "-webkitLineClamp": 2,
      "-webkitBoxOrient": "vertical",

      [theme.breakpoints.down(800)]: {
        marginBottom: "30px",
      },

      [theme.breakpoints.down(750)]: {
        fontSize: theme.globals.fontSize.s - 1,
      },

      [theme.breakpoints.down(500)]: {
        fontSize: theme.globals.fontSize.s - 2,
      },
    },

    "& div.MuiCardContent-root": {
      "& div.pollContainer": {
        width: "96%",
        marginRight: "15px",
        marginLeft: "15px",
        height: "260px",
        overflow: "auto",

        "&::-webkit-scrollbar": {
          width: "0.4em",
          borderRadius: "5px",
        },
        "&::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.primary.main,
          borderRadius: "6px",
        },

        "& div.patrialContainer:nth-child(even)": {
          "& div.boxContainer": {
            "& div.outerBox": {
              "&  div.innerBox": {
                background: theme.globals.colors.pollInnerBox,
                borderRadius: "20px",
              },
            },
            "& span.rate": {
              color: theme.globals.colors.pollInnerBox,
            },
          },
        },

        "& div.patrialContainer": {
          width: "95%",
          display: "flex",
          flexDirection: "column",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "14px",
          justifyContent: "space-between",

          [theme.breakpoints.down(960)]: {
            display: "block",
            marginBottom: "15px",
          },

          "& span.name": {
            display: "block",
            width: "100%",
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: theme.globals.fontSize.xs + 1,
            lineHeight: "19px",
            color: theme.palette.textMed.main,
            textAlign: "start",
            textTransform: "capitalize",

            [theme.breakpoints.between(1300, 1360)]: {
              fontSize: theme.globals.fontSize.xs,
            },
          },

          "& div.boxContainer": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            [theme.breakpoints.down(960)]: {
              height: "20px",
            },

            "& div.outerBox": {
              width: "90%",
              height: "10px",
              display: "flex",
              alignItems: "center",
              background: theme.globals.colors.pollOuterBox,
              borderRadius: "20px",

              [theme.breakpoints.down(960)]: {
                width: "80%",
              },

              [theme.breakpoints.down(420)]: {
                width: "100%",
              },

              "& div.innerBox": {
                width: "23%",
                height: "64%",
                background: theme.palette.primary.main,
                borderRadius: "20px",
              },
            },

            "& span.rate": {
              width: "50px",
              marginLeft: "50px",
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: theme.globals.fontSize.s - 2,
              lineHeight: "19px",
              color: theme.palette.primary.main,
              textAlign: "start",

              [theme.breakpoints.down(420)]: {
                marginLeft: "10px",
              },
            },
          },
        },
      },

      "& div.totalVotes": {
        width: "75%",
        marginRight: "auto",
        marginLeft: "auto",
        textAlign: "center",
      },

      "& div.votesNBtn": {
        "& button": {
          width: "130px",
          height: "35px",
          background: theme.globals.colors.white,
          border: `0.5px solid ${theme.palette.secondary.main}`,
          boxSizing: "border-box",
          boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          transition: "all 0.3s",

          "& span": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: theme.globals.fontSize.s - 2,
            lineHeight: "19px",
            textAlign: "center",
            color: theme.palette.primary.main,
            textTransform: "capitalize",
          },

          "&:hover": {
            backgroundImage: "url(/assets/images/home/btn.png)",
            backgroundSize: "cover",
            border: `0.5px solid ${theme.palette.secondary.main}`,

            "& span.MuiButton-label": {
              color: theme.globals.colors.white,
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
            },
          },
        },
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50%",
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: "20px",

        "& span": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: theme.globals.fontSize.s - 2,
          lineHeight: "19px",
          color: theme.palette.textMed.main,
        },
      },
    },

    "& div.pollBtnContainer": {
      height: "fit-content",

      "& div.pollBtns": {
        width: "80%",
        marginRight: "auto",
        marginLeft: "auto",
        display: "flex",
        justifyContent: "space-evenly",

        [theme.breakpoints.down(850)]: {
          width: "80%",
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
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: theme.globals.fontSize.s - 2,
            lineHeight: "19px",
            textTransform: "capitalize",
            color: theme.palette.primary.main,
          },
        },

        "& button:hover": {
          backgroundImage: "url(/assets/images/home/btn.png)",
          backgroundSize: "cover",
          borderRadius: 7,
          color: "white",
          padding: "4px 8px",
        },
      },
    },
  },
}));

export default useStyles;
