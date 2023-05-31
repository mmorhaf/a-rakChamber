import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  dropZone: {
    // minWidth: "100%",
    [theme.breakpoints.between(960, 1170)]: {
      minWidth: "100%",
    },
    "& .react-tooltip": {
      zIndex: "2!important",
    },
    "& .MuiDropzoneArea-root": {
      border: "1px solid #ABABAB!important",
      borderRadius: "5px 4px 4px 3px!important",
      boxShadow: `inset 5px 0 0 0 ${theme.palette.primary.main}!important`,
      [theme.breakpoints.between(960, 1170)]: {
        height: "40px!important",
      },
      "& .react-tooltip": {
        bottom: "20px!important",
        backgroundColor: "red",
      },
      "& .MuiGrid-spacing-xs-8 > .MuiGrid-item": {
        padding: "0px 4px!important",
      },
      "& .MuiDropzoneArea-text": {
        display: "none",
      },
      "& .MuiDropzoneArea-icon": {
        // right: "40px!important",
        top: "4px!important",

        position: "absolute",
        // marginTop: 35,

        color: "#ABABAB!important",
      },
    },
    "& .MuiTypography-root": {
      color: "#9C9C9C",
      marginTop: 0,
      fontWeight: "400!important",
      marginBottom: 0,
      padding: "6px",
      paddingBottom: "0px!important",
      overflowWrap: "anywhere",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 1,
      overflow: "hidden",
    },
  },
  root: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
    overflow: "hidden",
    paddingTop: 25,
    [theme.breakpoints.between(960, 1170)]: {
      paddingTop: 8,
    },
    [theme.breakpoints.down(600)]: {
      paddingTop: 16,
    },
    "& .MuiGrid-root .MuiGrid-root": {
      [theme.breakpoints.between(960, 1170)]: {
        display: "block",
      },
    },
    "& div.captcha": {
      marginBlock: 10,
      [theme.breakpoints.between(960, 1170)]: {
        marginBlock: 3,
      },
      [theme.breakpoints.down(600)]: {
        marginTop: 0,
      },
      // [theme.breakpoints.between(960, 1170)]: {
      //   marginTop: "-11px",
      // },
      "& > div > div > div > div > iframe": {
        [theme.breakpoints.down(600)]: {
          WebkitTransform: "scale(0.85) !important",
          WebkitTransformOrigin: "0 0 !important",
          marginTop: "8px",
          position: "absolute",
          marginLeft: theme.direction === "rtl" ? "-45px" : "0px",
          left: 0,
        },
        [theme.breakpoints.between(960, 1270)]: {
          WebkitTransform: "scale(0.60) !important",
          marginLeft: theme.direction === "rtl" ? "-100px" : "-60px",
        },
        [theme.breakpoints.down(370)]: {
          WebkitTransform: "scale(0.75) !important",
          marginLeft: theme.direction === "rtl" ? "-75px" : "0px",
        },
        [theme.breakpoints.down(335)]: {
          WebkitTransform: "scale(0.65) !important",
          marginLeft: theme.direction === "rtl" ? "-105px" : "0px",
        },
      },
      "& p.MuiFormHelperText-root": {
        left: 2,
        color: "#f44336",
        bottom: 57,
        position: "absolute",
        fontSize: "0.75rem",
        [theme.breakpoints.between(960, 1170)]: {
          bottom: 46,
        },
        [theme.breakpoints.down(600)]: {
          left: 5,
          bottom: theme.direction === "rtl" ? "65px" : "55px",
        },
        [theme.breakpoints.down(335)]: {
          bottom: 60,
        },
      },
    },
    "& div .marginTop10": {
      marginTop: 10,
    },
    "& div.controlContainer": {
      "& .MuiFormControl-root": {
        "& .MuiFormHelperText-root.Mui-error": {
          marginRight: 0,
          marginLeft: 0,
          marginTop: 0,
        },
      },
      [theme.breakpoints.down(600)]: {
        display: "block",
      },
      "& div.MuiGrid-grid-sm-8": {
        [theme.breakpoints.between(960, 1170)]: {
          maxWidth: "100%",
          flexBasis: "100%",
        },
      },
      "& div.label": {
        [theme.breakpoints.between(960, 1170)]: {
          maxWidth: "40%",
          flexBasis: "40%",
        },
        "& label": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: theme.globals.fontSize.s - 2,
          color: "#444444",
          textAlign: "start",

          [theme.breakpoints.between(960, 1260)]: {
            fontSize: theme.globals.fontSize.xs,
          },
          [theme.breakpoints.down(600)]: {
            fontSize: theme.globals.fontSize.s - 2,
          },
        },
      },
    },

    "& div.controlContainer:nth-child(-n+2)": {
      "& div.MuiFormControl-root": {
        height: "40px",
        marginBottom: 5,
        "& p.MuiFormHelperText-contained": {
          marginLeft: 0,
        },
      },

      "& div.MuiInputBase-root": {
        height: "40px",

        "& input": {
          padding: "10px 14px",
        },

        "& fieldset": {
          border: "1px solid #ABABAB",
          borderRadius: "5px 4px 4px 3px",
          boxShadow: `inset 5px 0 0 0 ${theme.palette.primary.main}`,
        },
      },
    },

    "& div.controlContainer:nth-child(3)": {
      "& div.MuiFormControl-root": {
        height: "129px",

        "& fieldset": {
          border: "1px solid #ABABAB",
          borderRadius: "5px 4px 4px 3px",
          boxShadow: `inset 5px 0 0 0 ${theme.palette.primary.main}`,
        },
      },
    },
    "& div.message": {
      marginTop: "27px",
      [theme.breakpoints.between(960, 1170)]: {
        marginTop: "14px",
      },
      "& .MuiInputBase-root ": {
        [theme.breakpoints.between(960, 1170)]: {
          padding: "7px 14px",
        },
      },
    },
    "& div.uploadContainer": {
      position: "relative",
      "& div.block": {
        [theme.breakpoints.down(600)]: {
          display: "block",
        },
        "& div.uploadTitle": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: theme.globals.fontSize.s - 2,
          color: "#444444",
          textAlign: "start",
          [theme.breakpoints.between(960, 1170)]: {
            maxWidth: "40%",
            flexBasis: "40%",
            // marginBottom: "10px",
          },
          [theme.breakpoints.between(960, 1260)]: {
            fontSize: theme.globals.fontSize.xs,
          },
          [theme.breakpoints.down(600)]: {
            fontSize: theme.globals.fontSize.s - 2,
            marginBottom: 8,
          },
        },
      },

      "& div.uploadControl": {
        position: "relative",
        height: "40px",
        border: "1px solid #ABABAB",
        borderRadius: "5px 4px 4px 3px",
        boxShadow: `inset 5px 0 0 0 ${theme.palette.primary.main}`,
        [theme.breakpoints.between(960, 1170)]: {
          maxWidth: "100%",
          flexBasis: "100%",
        },
        "& input": {
          display: "none",
        },

        "& div.guide": {
          cursor: "pointer",
          position: "absolute",
          top: "40px",
          left: 13,
          lineHeight: "17px",
          width: "100%",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: theme.globals.fontSize.xs,
          color: "#444444",
          textAlign: "start",
          [theme.breakpoints.down(400)]: {
            fontSize: theme.globals.fontSize.xs - 2,
          },
          [theme.breakpoints.between(960, 1260)]: {
            left: 8,
          },
        },

        "& svg": {
          position: "absolute",
          right: 10,
          top: 14,
          color: theme.palette.primary.main,
          cursor: "pointer",
          transform: "scale(1)",
          transition: "transform 0.4s",

          [theme.breakpoints.between(960, 1260)]: {
            right: 4,
          },

          "&:hover": {
            transform: "scale(1.3)",
          },
        },
      },

      "& p.MuiFormHelperText-root.MuiFormHelperText-contained.Mui-error": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: theme.globals.fontSize.xs,
        color: "#f44336",
        textAlign: "start",
        marginLeft: "95px",
        marginTop: "5px",
      },
    },

    "& div.btnContainer": {
      display: "flex",
      margin: " 15px 0px",
      bottom: "20px",
      [theme.breakpoints.between(960, 1170)]: {
        margin: " 5px 0px",
      },

      "& button": {
        width: "130px",
        height: "35px",
        background: theme.globals.colors.white,
        border: `0.5px solid ${theme.palette.secondary.main}`,
        boxSizing: "border-box",
        boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        backgroundSize: "cover",
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
    },
  },
}));

export default useStyles;
