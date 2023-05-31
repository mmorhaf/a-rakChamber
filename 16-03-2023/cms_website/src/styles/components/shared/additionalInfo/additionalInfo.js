import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "50px",
    marginBottom: "50px",

    "& div.helpfulContainer": {
      display: "flex",
      textAlign: "start",
      marginBottom: "15px",
      justifyContent: "end",
      [theme.breakpoints.down(440)]: {
        flexDirection: "column",
      },
      "& h3": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize:
          theme.direction === "rtl"
            ? theme.globals.fontSize.s
            : theme.globals.fontSize.xs + 2,
        lineHeight: "19px",
        color: theme.palette.primary.main,
        marginRight: "20px",
        display: "flex",
        alignItems: "center",
      },

      "& div.btnContainer": {
        width: "158px",
        display: "flex",
        justifyContent: "space-between",
        [theme.breakpoints.down(440)]: {
          marginTop: 16,
        },
        "& button": {
          width: "74px",
          height: "25px",
          border: `1px solid ${theme.palette.secondary.main}`,

          "& span.MuiButton-label": {
            color: theme.palette.secondary.main,
            textTransform: "capitalize",
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
          },
        },

        "& button.Mui-disabled": {
          opacity: "0.7",
        },
      },
    },

    "& div.lastSectionContainer": {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "15px",
      [theme.breakpoints.down(440)]: {
        display: "block",
      },
      "& span.lastUpdate": {
        [theme.breakpoints.down(440)]: {
          marginTop: 8,
        },
      },
      "& span": {
        display: "block",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize:
          theme.direction === "rtl"
            ? theme.globals.fontSize.s
            : theme.globals.fontSize.xs + 2,
        lineHeight: "16px",
        color: theme.palette.primary.main,
        textTransform: "capitalize",
        [theme.breakpoints.down(440)]: {
          textAlign: "start",
        },
      },
    },
  },
}));

export default useStyles;
