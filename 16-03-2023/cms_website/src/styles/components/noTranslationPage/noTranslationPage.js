import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  sorry: {
    color: "#263661",
    fontSize: theme.globals.fontSize.lg + 66,
    marginBottom: "40px",
  },

  content: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: theme.globals.fontSize.lg + 6,

    color:
      theme.palette.type === "dark"
        ? `${theme.globals.colors.white}!important`
        : `${theme.palette.primary.main}!important`,
    textAlign: "start",

    minHeight: "48vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
  },
}));

export default useStyles;
