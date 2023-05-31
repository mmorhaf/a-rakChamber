import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",

    [theme.breakpoints.down(430)]: {
      width: "100%",
    },

    "& div.media.second": {
      "& p": {
        fontSize: theme.globals.fontSize.xs,
        fontFamily: `${theme.globals.fontFamily.en}!important`,
      },
    },
  },

  btnsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    [theme.breakpoints.down(600)]: {
      marginTop: "30px",
      flexDirection: "row",
      justifyContent: "space-around",
    },

    [theme.breakpoints.down(430)]: {
      justifyContent: "space-between",
    },
  },

  goldenBox: {
    width: "155px",
    height: "155px",
    border: `1px solid ${theme.palette.secondary.main}`,
    textAlign: "center",
    paddingTop: "20px",
    borderRadius: "5px",

    "& p:first-of-type": {
      marginBottom: "5px",
    },
  },

  boxHeader: {
    color: theme.palette.primary.main,
    fontFamily: `${theme.globals.fontFamily.en}!important`,
    fontSize:
      theme.direction === "rtl"
        ? theme.globals.fontSize.s - 1
        : theme.globals.fontSize.s - 2,
    fontWeight: "600",
  },

  iconColor: {
    color: theme.palette.secondary.main,
    fontSize: theme.globals.fontSize.xl - 1,
    marginBottom: "10px",
  },
  content: {
    color: theme.palette.primary.main,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontSize: theme.globals.fontSize.s - 2,
    direction: "ltr!important",
  },

  phoneIcon: {
    transform: theme.direction === "rtl" ? "rotate(+262deg)" : "unset",
  },
}));
export default useStyles;
