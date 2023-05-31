import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down(1300)]: {
      width: "100%",
    },

    "& div.MuiContainer-root": {
      marginTop: "30px",

      "& div.pagination": {
        marginBottom: "50px",
      },
    },

    "& div.actualContent": {
      marginTop: "50px",

      "& > div.MuiBox-root": {
        marginRight: "auto",
        marginLeft: "auto",
        textAlign: "start",
        "& *": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
        },
        [theme.breakpoints.down(1000)]: {
          width: "95%",
        },

        [theme.breakpoints.down(750)]: {
          width: "90%",
        },

        "& h2": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: theme.globals.fontSize.s + 2,
          lineHeight: "209%",
          color:
            theme.palette.type === "dark"
              ? theme.globals.colors.white
              : theme.palette.textMed.main,
          marginBottom: "10px",
          letterSpacing: "0.2px",
        },
      },
    },
  },
  header2: {
    color:
      theme.palette.type === "dark"
        ? theme.globals.colors.white
        : theme.palette.textMed.main,
    fontSize: theme.globals.fontSize.s,
    fontWeight: 600,
    marginTop: "30px",
  },
  subHeader: {
    color:
      theme.palette.type === "dark"
        ? theme.globals.colors.white
        : theme.palette.textMed.main,
    fontSize: theme.globals.fontSize.s,
    fontWeight: 400,
  },
}));

export default useStyles;
