import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  header: {
    paddingBottom: 10,
    fontWeight: 600,
    color: theme.palette.primary.main,
    fontSize: theme.globals.fontSize.s,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    textTransform: "capitalize",
  },
  body: {
    color: theme.globals.colors.textLight,
    paddingBottom: 15,
    fontSize: theme.globals.fontSize.xs + 2,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    textTransform: "capitalize",
  },
  location: {
    fontSize: theme.globals.fontSize.xs + 2,
    marginLeft: "-10px",
    color: theme.globals.colors.textLight,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    textTransform: "capitalize",
    "& .MuiSvgIcon-root": {
      color: theme.globals.colors.textLight,
      marginLeft: 5,
    },
  },
  gray: {
    fontSize: theme.globals.fontSize.s,
    color: theme.globals.colors.textDark,
    backgroundColor: "#E5E5E5",
    paddingLeft: 10,
    // width: 370,
    fontWeight: 500,
    height: 40,
    paddingTop: 20,
    marginBottom: 0,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    // [theme.breakpoints.down(425)]: {
    //   width: 300,
    // },
  },
  blue: {
    fontSize: theme.globals.fontSize.xs + 2,
    color: theme.palette.info.main,
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    fontWeight: 600,
    // width: 370,
    height: 40,
    paddingTop: 20,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    // [theme.breakpoints.down(425)]: {
    //   width: 300,
    // },
  },
  margin: {
    marginTop: 20,
  },
  marginBottom15: {
    marginBottom: 15,
  },

  send: {
    fontSize: theme.globals.fontSize.s,
    color: theme.globals.colors.white,
    minWidth: 110,
    height: 34,
    padding: "0 16px",
    marginTop: "20px",
    backgroundColor: theme.palette.primary.main,
    textTransform: "capitalize",
    borderRadius: 5,
    overflow: "hidden",
    transition: "background-color 500ms cubic-bezier(0.215, 0.61, 0.355, 1)",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    "& .MuiButton-label": {
      transition: "color 500ms  cubic-bezier(0.215, 0.61, 0.355, 1)",
      color: "#fff",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .MuiButton-endIcon": {
      position: "absolute",
      transition: "all 500ms  cubic-bezier(0.215, 0.61, 0.355, 1)",
      top: "50%",
      left: "0",
      right: "0",
      display: "flex",
      justifyContent: "center",
      margin: "0",
      padding: "0",
      listStyleType: "none",
      transform: "translateY(-175%)",
      width: "100%",
      "& svg": {
        fontSize: 26,
      },
    },
    "&:hover": {
      backgroundColor: "#fff",
      boxShadow: "none",
      border: "1px dashed #ccc",
      "& .MuiButton-label": {
        color: "#fff",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      "& .MuiButton-endIcon": {
        transform: "translateY(-50%)",
        color: theme.palette.primary.main,
      },
    },
  },
}));

export default useStyles;
