import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  cardText: {
    fontSize:
      theme.direction === "rtl"
        ? `${theme.globals.fontSize.s - 2}px!important`
        : `${theme.globals.fontSize.s}px!important`,
    [theme.breakpoints.down(600)]: {
      fontSize:
        theme.direction === "rtl"
          ? `${theme.globals.fontSize.s - 4}px!important`
          : `${theme.globals.fontSize.s - 2}px!important`,
    },
  },
  morePaddingTop: {
    paddingTop: "41px!important",
  },
  noDataText: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    width: "100%",
    textAlign: "center",
    fontSize:
      theme.direction === "rtl"
        ? theme.globals.fontSize.lg - 2
        : theme.globals.fontSize.lg,
    color: theme.palette.primary.main,
    fontWeight: "700",
    paddingTop: 16,
    minHeight: 110,
    [theme.breakpoints.down(600)]: {
      fontSize:
        theme.direction === "rtl"
          ? theme.globals.fontSize.s
          : theme.globals.fontSize.s + 2,
    },
  },
}));

export default useStyles;
