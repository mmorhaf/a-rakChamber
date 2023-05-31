import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",

    "&  div.MuiGrid-root": {
      padding: "30px 20px",
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: "10px",
    },

    "& div.MuiAccordion-root": {
      background: theme.globals.colors.white,
      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      boxSizing: "border-box",
      borderRadius: "10px",
      marginBottom: "10px",

      "&:before": {
        content: "unset",
      },

      "& div.MuiAccordionSummary-root.border-bottom": {
        borderBottom: `1px solid #DFDBD2!important`,
      },

      "& div.MuiAccordionSummary-root": {
        minHeight: "55px",
        height: "auto",

        "& h2": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkitLineClamp": 2,
          "-webkitBoxOrient": "vertical",
          width: "90%",
          marginRight: "auto",
          marginLeft: "auto",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: theme.globals.fontSize.s,
          lineHeight: "22px",
          color: theme.palette.primary.main,
          textAlign: "start",

          [theme.breakpoints.down(780)]: {
            width: "100%",
            fontSize: theme.globals.fontSize.s - 2,
          },

          [theme.breakpoints.down(450)]: {
            fontSize: theme.globals.fontSize.xs + 1,
          },
        },

        "& span.MuiIconButton-label": {
          display: "block",
          borderRadius: "8px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
          width: "33px",
          color: theme.palette.secondary.main,
          background: theme.globals.colors.white,
          fontSize: "20px",
        },
      },

      "& div.MuiAccordionDetails-root": {
        paddingTop: "20px",
        // wordBreak: "break-all",
        "& > div": {
          whiteSpace: "pre-line",
          width: "90%",
          marginRight: "auto",
          marginLeft: "auto",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: theme.globals.fontSize.s - 2,
          lineHeight: "20px",
          color: theme.palette.primary.main,
          textAlign: "start",

          [theme.breakpoints.down(780)]: {
            width: "100%",
            fontSize: theme.globals.fontSize.xs + 1,
          },
        },
      },
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

  allBtn: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "10px",
    marginBottom: "15px",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",

    "& button": {
      "& span.MuiButton-label": {
        "& span.collaBtn": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontSize: theme.globals.fontSize.s - 2,
          color: theme.palette.primary.main,
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "27px",
          textTransform: "capitalize",
          display: "flex",
          alignItems: "canter",

          "& span": {
            display: "flex",
            alignItems: "center",
            marginLeft: "5px",

            "& svg": {
              fontSize: theme.globals.fontSize.m - 2,
            },
          },
        },
      },
    },
  },

  search: {
    marginBottom: 35,
    [theme.breakpoints.down(768)]: {
      marginRight: "7px",
      paddingRight: "58px",
    },
    [theme.breakpoints.down(600)]: {
      display: "block",
      marginBottom: 26,
      marginTop: 24,
    },
    height: "auto",
    minHeight: "75px",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.globals.colors.bgWhite,
    paddingLeft: theme.direction === "rtl" ? 0 : "32px",
    boxShadow: "0px 1px 4px rgb(0 0 0 / 10%)",
    paddingBottom: "7px",
    borderRadius: "5px",
    paddingTop: 10,
  },
  searchTitle: {
    "& .MuiTextField-root": {
      width: "95%",

      "& label.MuiFormLabel-root": {
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
  btns: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    [theme.breakpoints.down(600)]: {
      justifyContent: "space-evenly",
    },
    [theme.breakpoints.down(335)]: {
      justifyContent: "space-between",
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
    position: "relative",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    [theme.breakpoints.down(600)]: {
      marginTop: 16,
      marginBottom: 26,
    },
    [theme.breakpoints.down(335)]: {
      marginRight: 8,
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

  ask: {
    width: theme.direction === "rtl" ? "unset" : 115,
    padding: "6px 0",
  },
}));

export default useStyles;
