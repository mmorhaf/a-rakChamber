import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    boxShadow: "unset",
    height: "370px",

    "&:after": {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      content: "''",
      background:
        "linear-gradient(180deg, rgba(38, 54, 97, 0.7) 0%, rgba(38, 54, 97, 0.176072) 51.87%, rgba(38, 54, 97, 0) 69.3%)",
    },

    "& img.MuiCardMedia-root": {
      height: "370px",
      width: "100%",
    },

    "& div.MuiContainer-root": {
      position: "absolute",
      top: "60%",
      padding: 0,
      zIndex: 3,

      "& a": {
        display: "block",
        width: "fit-content",

        "& button.MuiButtonBase-root": {
          [theme.breakpoints.between(379, 768)]: {
            margin: "7px",
            minWidth: "150px",
            height: "45px",
          },
          width: "fit-content",
          minWidth: "215px",
          padding: "0 20px",
          height: "56px",
          background: `${theme.palette.primary.main}99`,

          "& span.MuiButton-label": {
            [theme.breakpoints.between(379, 768)]: {
              fontSize: theme.globals.fontSize.s,
            },

            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: theme.globals.fontSize.lg,
            lineHeight: "38px",
            color: theme.globals.colors.white,
            textTransform: "capitalize",
          },
        },
      },
    },
  },
}));

export default useStyles;
