import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "auto",
    marginTop: 30,

    "& div.contents": {
      width: "100%",
      minHeight: "calc(100vh - 370px)",
    },
  },
  committeesImage: {
    width: "100%",
    paddingBottom: "5%",
  },
  committeesParagraph: {
    width: "100%",
    color:
      theme.palette.type === "dark"
        ? theme.globals.colors.white
        : theme.globals.colors.textMed,
    fontSize: theme.globals.fontSize.s,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontWeight: 100,
  },
}));
export default useStyles;
