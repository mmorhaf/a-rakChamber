import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& p.actualContent": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: theme.globals.fontSize.xs + 2,
      lineHeight: "19px",
      textAign: "justify",
      color:
        theme.palette.type === "dark"
          ? theme.globals.colors.white
          : theme.palette.textMed.main,
    },
    "& *": {
      fontFamily:
        theme.direction === "rtl"
          ? `${theme.globals.fontFamily.ar}!important`
          : `${theme.globals.fontFamily.en}!important`,
    },
  },
}));

export default useStyles;
