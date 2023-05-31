import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  mediaCard: {
    display: "flex",
    flexDirection: "row",
    textAlign: "start",
    alignItems: "center",
    margin: "10px 0px",
    background: theme.globals.colors.white,
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    marginBottom: 20,
    "& mark": {
      backgroundColor: "white",
    },
    [theme.breakpoints.down(600)]: {
      display: "block",
    },
    "& > div > div": {
      "&:first-child": {
        padding: "15px 0px 0px 15px",

        "& span": {
          fontSize: theme.globals.fontSize.xs,
          fontWeight: 600,
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          "& *": {
            color: "#505050!important",
          },
        },
      },

      "&:last-child": {
        padding: "0px 15px 15px 15px",
        // maxWidth: 2000,
        // minWidth: 1060,
        textAlign: "justify",

        "& *": {
          fontFamily:
            theme.direction === "rtl"
              ? `${theme.globals.fontFamily.ar}!important`
              : `${theme.globals.fontFamily.en}!important`,
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: theme.globals.fontSize.xs,
          lineHeight: "20px",
          color: `${theme.palette.primary.main}!important`,
          backgroundColor: "unset!important",
        },
      },
    },
    "& .MuiCardMedia-root": {
      width: 120,
      height: "105px",
      margin: "5px 12px",
      backgroundSize: "50px",
      backgroundSize: "contain",
      backgroundColor: "#f2f2f2",
      minWidth: 120,
      maxWidth: 120,
    },
    "& .MuiCardHeader-title": {
      fontSize: theme.globals.fontSize.xs,
      fontWeight: 600,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      color: theme.palette.primary.main,
    },
  },
}));
export default useStyles;
