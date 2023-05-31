import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0px 0 18px rgb(0 0 0 / 8%)!important",
    background: theme.globals.colors.white,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    marginTop: 25,
    borderRadius: "10px",

    "& .media": {
      height: "180px!important",
    },
    // [theme.breakpoints.between(450, 1490)]: {
    //   width: "90%!important",
    // },

    [theme.breakpoints.between(960, 1100)]: {
      width: "75%!important",
    },

    "& div.MuiCardMedia-root": {
      height: "213px",
    },

    "& div.MuiCardContent-root": {
      position: "relative",
      display: "flex",
      flex: "1 1 auto",
      "& div.calendar": {
        position: "absolute",
        top: "-31px",
        left: "5px",

        "& button": {
          borderRadius: 0,
          background: theme.globals.colors.white,
          width: "30px",
          height: "30px",
          boxShadow: "0px 4px 7px rgb(0 0 0 / 10%)!important",

          "& svg": {
            fontSize: "20px",
            color: theme.palette.secondary.main,
          },

          "&:hover svg": {
            transform: "scale(1.1)",
          },
        },
      },

      "& div.date": {
        borderRight: `1px solid ${theme.palette.primary.main}`,
        marginRight: "5px",
        paddingRight: "5px",
        display: "flex",
        flexDirection: "column",

        "& span": {
          display: "block",
          color: theme.palette.primary.main,
          fontSize: theme.globals.fontSize.xs + 2,
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          lineHeight: "18px",
          textAlign: "center",
          textTransform: "capitalize",
          color: "#263661",
        },

        "& span:nth-child(2)": {
          fontWeight: "bolder",
          fontSize: theme.globals.fontSize.s + 4,
        },
      },

      "& div.content": {
        textAlign: "start",

        "& h2": {
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: theme.globals.fontSize.s + 2,
          lineHeight: "20px",
          color: theme.globals.colors.textGeneral,
          height: "43px",
          marginBottom: "6px",
          textTransform: "capitalize",
          overflow: "hidden",
          display: "-webkit-box",
          "-webkitLineClamp": 2,
          "-webkitBoxOrient": "vertical",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
        },

        "& span.location": {
          textTransform: "capitalize",
          color: "#444444",
          fontSize: theme.globals.fontSize.s,
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          lineHeight: "24px",
          overflow: "hidden",
          display: "-webkit-box",
          "-webkitLineClamp": 2,
          "-webkitBoxOrient": "vertical",
        },
      },
    },
  },
  id: {
    right: "-2px",
    color: theme.globals.colors.white,
    textTransform: "capitalize",
    top: 31,
    width: 133,
    height: 25,
    position: "absolute",
    fontSize: 14,
    marginTop: "-10px",
    border: 3,
    paddingTop: 2,
    borderRadius: 3,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.38)",
  },
  blueButton: {
    backgroundColor: "#47799C!important",
    color: `${theme.globals.colors.white}!important`,
    borderRadius: "2px!important",
    width: 130,
    height: 41,
    marginBottom: "15px!important",
    marginTop: "15px!important",
    clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)",
    textTransform: "capitalize!important",
  },
  blueCardButton: {
    backgroundColor: "#47799C!important",
    color: `${theme.globals.colors.white}!important`,
    borderRadius: "2px!important",
    width: 176,
    height: 41,
    clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)",
    textTransform: "inherit!important",
  },
  grayCardButton: {
    color: "#47799c!important",
    width: 176,
    height: 41,
    clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)",
    borderRadius: 2,
    backgroundColor: "rgba(0, 0, 0, 0.12)!important",
    textTransform: "capitalize",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 15,
    "& button": {
      width: "140px",
    },
  },

  first: {
    textTransform: "capitalize",
    background: "#47799C!important",
    clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
    "&:hover": {
      color: "#47799c",

      backgroundColor: "#ccc",
    },

    "& span.MuiButton-label": {
      color: theme.globals.colors.white,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },

  second: {
    background: theme.palette.primary.main,
    clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)",
    "&:hover": {
      color: "#47799c",

      backgroundColor: "#7fa0b8",
    },
    "& span.MuiButton-label": {
      color: theme.globals.colors.white,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },

  // line: {
  //   width: "50%",
  //   backgroundColor: "#e63c49",
  //   height: 5,
  //   position: "absolute",
  //   right: 14,
  //   bottom: 6,
  //   borderRadius: 5,
  // },
  range: {
    marginTop: "5px",
    display: "flex",
    justifyContent: "space-between",
  },
  red: {
    color: "#E63C49",
    fontWeight: "bolder",
    fontSize: "19px",
  },
  range1: {
    fontSize: "16px",
    padding: "0px 8px",
  },
  range2: {
    fontSize: "16px",
    marginTop: "6px",
  },
  whitebutton: {
    boxShadow: "0px 0 18px rgb(0 0 0 / 8%)!important",
    height: "56px",
    display: "flex",
    alignItems: "center",
    maxWidth: "48.5% !important",
    margin: "10px 10px 10px 0px",
    "& button": {
      padding: "6px 8px",
      width: "100%",
      display: "flex",
      justifyContent: "start",
      height: "100%",
      "&:hover": {
        backgroundColor: "#d1d4dc",
      },
    },
  },
  buttons: {
    fontSize: "17px",
    marginLeft: "10px",
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordion: {
    width: "99%",
    backgroundColor: "white",
    boxShadow: "0px 0 18px rgb(0 0 0 / 12%)!important",
    padding: "22px",
    margin: "20px 20px 20px 0px",
    "& .MuiAccordion-rounded": {
      marginBottom: "14px",
      boxShadow: "0px 0 18px rgb(0 0 0 / 12%)!important",
    },
  },

  main: {
    color: '"#112C75"',
    fontSize: "16px",
  },
  aboutMainParagraph: {
    fontSize:
      theme.direction === "rtl"
        ? theme.globals.fontSize.s - 1
        : theme.globals.fontSize.s + 4,
    textTransform: "capitalize",
    fontWeight: 600,
    width: "187px",
    color: "#112C75",
    position: "relative",
    top: "16px",
    // padding: "1px 0px 0px 18px",
    alignSelf: "center",
    display: "flex",
    height: "30px",
    background: "white",
    margin: "0px",
    left: "17%",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    justifyContent: "center",
    [theme.breakpoints.down(1240)]: {
      left: "13%",
    },
    [theme.breakpoints.down(1170)]: {
      left: "12%",
    },
    [theme.breakpoints.down(1100)]: {
      left: "10%",
    },
    [theme.breakpoints.down(1065)]: {
      left: "8%",
    },
    [theme.breakpoints.down(1040)]: {
      left: "7%",
    },
    [theme.breakpoints.down(1020)]: {
      left: "6%",
    },
    [theme.breakpoints.down(990)]: {
      left: "5%",
    },
    [theme.breakpoints.down(960)]: {
      left: "14%",
    },
    [theme.breakpoints.down(900)]: {
      left: "13%",
    },
    [theme.breakpoints.down(850)]: {
      left: "11%",
    },
    [theme.breakpoints.down(800)]: {
      left: "2%",
    },
    [theme.breakpoints.down(745)]: {
      left: 0,
    },
    [theme.breakpoints.down(720)]: {
      left: "-4%",
    },
    [theme.breakpoints.down(690)]: {
      left: "-8%",
    },
    [theme.breakpoints.down(675)]: {
      left: "-9%",
    },
    [theme.breakpoints.down(670)]: {
      width: "175px",
    },
    [theme.breakpoints.down(632)]: {
      width: "173px",
    },
    [theme.breakpoints.down(625)]: {
      width: "167px",
    },
    [theme.breakpoints.down(600)]: {
      width: "187px",
      left: "28%",
    },
    [theme.breakpoints.down(470)]: {
      left: "24%",
    },
    [theme.breakpoints.down(435)]: {
      left: "20%",
    },
    [theme.breakpoints.down(380)]: {
      left: "15%",
    },
    [theme.breakpoints.down(350)]: {
      left: "13%",
    },
    [theme.breakpoints.down(340)]: {
      left: "11%",
    },
    [theme.breakpoints.down(320)]: {
      left: "9%",
    },
  },
  OnThisDay: {
    background: "white",
    boxShadow: "0px 10px 20px rgb(0 0 0 / 10%)",
    padding: "14px",
    borderRadius: "6px",
    height: "780px",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    [theme.breakpoints.down(800)]: {
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.down(600)]: {
      marginTop: 16,
    },
  },
  tb: {
    borderBottom: "3px solid #CACACA",
    [theme.breakpoints.down(790)]: {
      borderBottom: "none",
    },
    [theme.breakpoints.down(600)]: {
      borderBottom: "3px solid #CACACA",
    },
  },
}));

export default useStyles;
