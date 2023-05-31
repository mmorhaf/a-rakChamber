import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    backgroundColor: theme.globals.colors.white,
    display: "flex",
    backgroundImage: `url("/assets/images/notfound.png")`,
    backgroundSize: "cover",
    backgroundAttachment: "inherit",
    backgroundPosition: "center",
    flex: "1 1 auto",
    paddingTop: "40px",
  },
  notFoundContentBox: {
    color: theme.palette.primary.main,
    textAlign: "start",
    [theme.breakpoints.down(400)]: {
      maxWidth: "100%",
      flexBasis: "100%",
    },
  },
  errorHeader: {
    fontWeight: "bold",
    fontSize: theme.globals.fontSize.xl * 3 + 1,
    lineHeight: "95px",
    color: theme.palette.primary.main,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    [theme.breakpoints.down(1200)]: {
      fontSize: theme.globals.fontSize.xl * 2,
    },
    [theme.breakpoints.down(645)]: {
      fontSize: theme.globals.fontSize.xl + 12,
      lineHeight: "70px",
    },
  },
  errorMessage: {
    color: theme.palette.primary.main,
    fontSize: theme.globals.fontSize.xl + 2,
    fontWeight: "600",
    display: "block",
    marginBottom: "10%",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    lineHeight: "28px",
    textAlign: "start",
    [theme.breakpoints.down(1200)]: {
      fontSize: theme.globals.fontSize.xl - 5,
      lineHeight: "16px",
    },
    [theme.breakpoints.down(645)]: {
      fontSize: theme.globals.fontSize.lg - 4,
      lineHeight: "14px",
    },
    [theme.breakpoints.down(555)]: {
      fontSize: theme.globals.fontSize.s - 2,
    },
  },
  errorRedirectingBtn: {
    color: theme.globals.colors.white,
    fontweight: "600",
    fontSize: theme.globals.fontSize.m,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    lineHeight: "35px",
    textAlign: "center",
    background: theme.palette.primary.light,
    boxShadow: "0px 2px 20px rgba(0, 0, 0, 0.15)",
    width: "67%",
    borderRadius: "25px",
    marginTop: "10%",
    textTransform: "capitalize",
    "&:hover": {
      color: theme.palette.primary.light,
      backgroundColor: theme.globals.colors.white,
    },
    [theme.breakpoints.down(500)]: {
      width: "55%",
      lineHeight: "27px",
      fontSize: theme.globals.fontSize.m - 4,
    },
  },
  blueBox: {
    backgroundColor: theme.palette.primary.main,
    height: "100px",
  },
  gold: {
    color: theme.palette.secondary.main,
    fontSize: theme.globals.fontSize.xl * 5 - 5,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontWeight: "600",
    [theme.breakpoints.down(1200)]: {
      fontSize: theme.globals.fontSize.xl * 4,
    },
    [theme.breakpoints.down(645)]: {
      fontSize: theme.globals.fontSize.xl * 3,
    },
  },
  pageNotFound: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "end",
    [theme.breakpoints.down(555)]: {
      alignItems: "flex-start",
    },
    [theme.breakpoints.down(400)]: {
      display: "none",
    },
  },
}));

export default useStyles;
