import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  activeFormRoot: {
    position: "relative",

    [theme.breakpoints.down(960)]: {
      height: "380px",
    },

    "& div.radioGroup": {
      width: "84%",
      // maxHeight: "279px",
      flexDirection: "row",
      marginRight: "auto",
      marginLeft: "auto",
      overflow: "auto",

      "&::-webkit-scrollbar": {
        width: "0.4em",
        borderRadius: "5px",
      },
      "&::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "6px",
      },

      [theme.breakpoints.between(1300, 1490)]: {
        width: "90%",
      },

      [theme.breakpoints.between(960, 1100)]: {
        width: "90%",
      },

      "& div.MuiGrid-root": {
        textAlign: "start",

        "& label": {
          "& span.MuiFormControlLabel-label": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: theme.globals.fontSize.s - 2,
            lineHeight: "19px",
            color: "#444444",

            [theme.breakpoints.between(1300, 1490)]: {
              fontSize: theme.globals.fontSize.s - 2,
            },

            [theme.breakpoints.between(1100, 1300)]: {
              fontSize: theme.globals.fontSize.s - 2,
            },

            [theme.breakpoints.between(960, 1100)]: {
              fontSize: theme.globals.fontSize.xs + 1,
            },

            [theme.breakpoints.down(500)]: {
              fontSize: theme.globals.fontSize.xs,
            },
          },
        },
      },
    },

    "& div.btnContainer": {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      marginBottom: "50px",
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: "25px",
      textAlign: "start",
      // position: "absolute",
      top: "140px",

      "& button": {
        width: "130px",
        height: "35px",
        background: theme.globals.colors.white,
        border: `0.5px solid ${theme.palette.secondary.main}`,
        boxSizing: "border-box",
        boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        transition: "all 0.3s",
        [theme.breakpoints.down(370)]: {
          width: "100px",
        },
        "& span": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: theme.globals.fontSize.s - 2,
          lineHeight: "19px",
          textAlign: "center",
          color: theme.palette.primary.main,
          textTransform: "capitalize",
        },

        "&:hover": {
          backgroundImage: "url(/assets/images/home/btn.png)",
          backgroundSize: "cover",
          border: `0.5px solid ${theme.palette.secondary.main}`,

          "& span.MuiButton-label": {
            color: theme.globals.colors.white,
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
          },
        },
      },

      "& button:nth-child(1)": {
        marginRight: "20px",
        background: theme.globals.colors.white,
        backgroundSize: "cover",
        border: `0.5px solid ${theme.palette.secondary.main}`,
        transition: "all 0.3s",

        "& span.MuiButton-label": {
          color: "#263661",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
        },

        "&:hover": {
          backgroundImage: "url(/assets/images/home/btn.png)",

          border: `0.5px solid ${theme.palette.secondary.main}`,

          "& span.MuiButton-label": {
            color: "white",
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
          },
        },
      },

      "& a button": {
        marginRight: "0px!important",
      },
    },
  },
}));

export default useStyles;
