import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  aboutMainParagraph: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    marginBottom: 30,
    color: "#444444",
    fontSize: 16,
    fontWeight: 400,
    textAlign: "start",
    "& ul": {
      marginLeft: 16,
    },
  },
  title: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    color: "##263661",
    fontSize: 18,
    fontWeight: 700,
    textAlign: "start",
  },

  head: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    color: "#444444",
    fontSize: "16px",
    fontWeight: 600,
    textAlign: "start",
  },
}));
export default useStyles;
