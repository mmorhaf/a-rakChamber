import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "start",

    "& > div.MuiGrid-root": {
      padding: 0,
    },

    "& .controlContainer": {
      "& label": {
        fontSize: theme.globals.fontSize.s_2,
        color: theme.palette.primary.main,
      },
    },
  },

  captcha: {
    "& button": {
      height: 30,
      textTransform: "capitalize",
      justifyContent: "center",
      alignItems: "center",
      color: theme.palette.secondary.main,
      border: "1px solid",
      display: "flex",

      minWidth: 80,
      position: "relative",
      "&:hover": {
        backgroundImage: "url(/assets/images/home/btn.png)",
        color: "white",
      },
      "& .MuiButton-label": {
        width: "auto",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
    },
  },
  header: {
    color: theme.palette.primary.main,
    fontSize: theme.globals.fontSize.s + 4,
  },
  warnText: {
    fontSize: theme.globals.fontSize.s,
    color: theme.palette.primary.main,
  },
  secondHeader: {
    fontSize: theme.globals.fontSize.s,
    color: theme.palette.primary.main,
  },
}));
export default useStyles;
