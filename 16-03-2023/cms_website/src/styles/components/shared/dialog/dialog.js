import { makeStyles } from "@material-ui/styles";

const useDialogStyles = makeStyles((theme) => ({
  root: {
    direction: theme.direction === "rtl" ? "rtl!important" : "ltr!important",

    "& h4": {
      color: "#263661",
      fontSize: "13px",
      fontStyle: "normal",
      textAlign: "start",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontWeight: "normal",
      marginTop: "7px",
    },

    "& div.MuiDialog-paper": {
      width: "350px",

      "& div.MuiDialogTitle-root": {
        paddingBottom: 0,

        "& h2": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: theme.globals.fontSize.s,
          color: theme.palette.primary.main,
          textAlign: "start",
        },
      },

      "& div.MuiDialogContent-root": {
        "& p": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: theme.globals.fontSize.xs + 1,
          color: theme.palette.primary.main,
          textAlign: "start",
        },

        "& div.MuiTextField-root:hover fieldset": {
          border: `1px solid ${theme.palette.secondary.main}`,
        },

        "& div.MuiDialogActions-root": {
          marginTop: "15px",
          padding: "8px 0",

          "& button": {
            width: "74px",
            height: "30px",
            background: theme.palette.primary.main,
            cursor: "pointer",

            "& span.MuiButton-label": {
              color: theme.globals.colors.white,
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              textTransform: "capitalize",
            },
          },

          "& button.Mui-disabled": {
            opacity: "0.7",
          },
        },
      },
    },
  },
  fontFamily: {
    "& .MuiInputBase-root .MuiInputBase-input": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
}));

export default useDialogStyles;
