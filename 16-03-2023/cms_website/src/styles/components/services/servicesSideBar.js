import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  flexRoot: {
    flex: "1 1 auto",
    marginTop: "135px",
    marginBottom: "40px",
    // minHeight: "70.5vh",
  },

  profileRoot: {
    marginTop: "120px",
    marginBottom: "50px",

    marginRight: "auto",
    marginLeft: "auto",
  },
  sideBar: {
    position: "fixed",
    background: theme.globals.colors.white,
    boxShadow: "15px 0px 20px -2px rgba(0, 0, 0, 0.05)",
    borderRadius: "15px",
    height: "522px",
    display: "flex",
    flexDirection: "column",
    padding: "16px 8px",
    flexBasis: "unset",
    border: "0.5px solid rgb(245 245 245)",
    borderLeft: "none",
    bottom: 115,
    top: 125,
    [theme.breakpoints.down(600)]: {
      display: "none",
    },
  },
  avatar: {
    background: "#FFFFFF",
    border: "1px solid #BC9738",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
    width: 110,
    height: 110,
    borderRadius: "50%",
    alignSelf: "center",
    margin: "16px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiSvgIcon-root": {
      fontSize: "5rem",
      color: theme.palette.primary.main,
    },
  },
  mainTitle: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontStyle: "normal",
    fontSize: theme.globals.fontSize.xl,
    color: theme.palette.primary.main,
    fontWeight: "700",
    minHeight: "80px",
  },
  name: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontStyle: "normal",
    fontSize: theme.globals.fontSize.m,
    color: theme.palette.primary.main,
    fontWeight: "700",
    textAlign: "center",
    // paddingTop: 8,
  },
  companyName: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontStyle: "normal",
    fontSize: theme.globals.fontSize.s,
    color: theme.palette.primary.main,
    textAlign: "center",
    paddingTop: 8,
  },
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      flexShrink: 0,
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    position: "relative",
    border: "none",
  },
  content: {
    marginLeft: 120,
    flexGrow: 1,
    [theme.breakpoints.down(600)]: {
      marginLeft: 8,
    },
    // padding: theme.spacing(3),
  },
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    paddingTop: "0px",
    "& .MuiListItem-button": {
      flexDirection: "column",
      textAlign: "center",
      padding: "13px 0",
      color: theme.palette.primary.main,
      fontSize: theme.globals.fontSize.xl,
      [theme.breakpoints.down(750)]: {
        padding: "6px 0",
        fontSize: theme.globals.fontSize.xl - 4,
      },
      "&:hover": { color: "#0056b3" },
      "& .MuiListItemText-root .MuiTypography-body1": {
        color: theme.palette.primary.main,
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontSize: theme.globals.fontSize.xs,
        fontWeight: "700",
      },
      "& .MuiSvgIcon-root": { color: theme.palette.primary.main },
    },
    "& .MuiList-root": {
      "&:not(:last-child)": { borderBottom: " 1px solid #C4C4C4" },
    },
  },

  nested: {
    paddingLeft: theme.spacing(4),
    "& .MuiListItemText-root .MuiTypography-body1": {
      color: theme.palette.primary.main,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontSize: theme.globals.fontSize.s,
      fontWeight: "normal !important",
    },
  },
  loader: {
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    display: "flex",
    position: "fixed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff8a",
    zIndex: "1500",
    backdropFilter: "blur(4px)",
  },
}));

export default useStyles;
