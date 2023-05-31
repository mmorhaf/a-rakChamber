import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30,
    "& .MuiTypography-h5": {
      fontSize: theme.globals.fontSize.s + 4,
      color:
        theme.palette.type === "dark"
          ? theme.globals.colors.white
          : theme.globals.colors.textMed,
      fontWeight: 700,
      marginTop: "100px",
      marginBottom: 30,
      textAlign: "start",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },

    "& div.contents": {
      minHeight: "calc(100vh - 370px)",
    },
  },
  flex: {
    display: "flex",
  },
}));
export default useStyles;
