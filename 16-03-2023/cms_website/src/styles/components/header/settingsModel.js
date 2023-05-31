import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    margin: 0,
    padding: theme.spacing(2),
    minWidth: "300px",
  },
  block: {
    [theme.breakpoints.down(600)]: {
      display: "block",
    },
  },
  DialogWrap: {
    "& div >div.MuiDialog-paper": {
      width: "500px",
      borderRadius: 20,
    },
    [theme.breakpoints.down(414)]: {
      "& div >div.MuiDialog-paper": {
        margin: "10px!important",
      },
    },
  },
  closeButton: {
    width: "35px",
    height: "35px",
    borderRadius: "20px",
    backgroundColor: theme.palette.primary.main,
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(1.5),
    color: theme.globals.colors.white,
  },
  rootTitle: {
    position: "absolute",
    left: theme.spacing(2),
    top: theme.spacing(2),
    fontSize: theme.globals.fontSize.m,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontWeight: "bold",
  },
  DialogContent: { padding: theme.spacing(2) },

  divider: {
    margin: "0 10px",
  },
  fontButtonsWrap: {
    display: "flex",
    justifyContent: theme.direction === "ltr" ? "flex-start" : "flex-end",
    margin: "10px 0 0 0",
  },
  fontButtons: {
    backgroundColor: theme.palette.primary.main,
    minWidth: " 30px",
    padding: " 3px 8px",
    margin: "0 7px",
    color: theme.globals.colors.white,
    width: "20px",
  },
  marginBottom16: {
    [theme.breakpoints.down(600)]: {
      marginBottom: 16,
    },
  },
  marginLeft16: {
    [theme.breakpoints.down(600)]: {
      marginLeft: 16,
    },
  },
  google: {
    "& span > div": {
      display: theme.direction === "ltr" ? "block" : "flex",
    },
  },
  marginBottom8: {
    [theme.breakpoints.down(600)]: {
      marginBottom: 8,
    },
  },
  colorButtonsWrap: {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: theme.globals.fontSize.m,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    alignItems: "center",
    flexFlow: theme.direction === "ltr" ? "row-reverse nowrap" : "row nowrap",
    [theme.breakpoints.down(600)]: {
      maxWidth: "100%!important",
    },
  },
  colorName: {
    textTransform: "capitalize",
    boxShadow: "none",
    fontSize: theme.globals.fontSize.s,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,

    cursor: "pointer",
  },
  colorButtons: {
    margin: theme.spacing(1.2, 1),
    boxShadow: "none",
    minWidth: "20px",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    padding: 0,
  },
  bgGold: {
    backgroundColor: "#C79D65",
    "&:hover": {
      backgroundColor: "#f3bf7b",
    },
  },
  colorDarkMode: {
    width: "40px",
    height: "40px",
    borderRadius: "20px",
    backgroundColor: "gainsboro",
    color: theme.globals.colors.white,
    margin: theme.spacing(1.2, 1),
    "&:hover": {
      backgroundColor: "#bbb9b9",
    },
  },
  reverse: {
    flexDirection: theme.direction === "rtl" ? "row" : "row-reverse",
  },
}));

export default useStyles;
