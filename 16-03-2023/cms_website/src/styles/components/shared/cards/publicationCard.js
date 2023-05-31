import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 20,
    flexBasis: "unset!important",
    flexGrow: "unset!important",

    "& div.card": {
      width: "100%",
      marginRight: "auto",
      marginLeft: "auto",
      marginBottom: "20px",
      marginTop: "20px",
      height: "315px",
      background: theme.globals.colors.white,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      alignItems: "center",
      padding: "24px 0 0 0",
      border: "0",

      [theme.breakpoints.between(900, 1000)]: {
        width: "250px",
      },

      "& div.cardImage": {
        width: 152,
        marginLeft: "auto",
        marginRight: "auto",
        height: 150,
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        flexBasis: "unset!important",
        flexGrow: "unset!important",
      },

      "& div.card-body": {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        padding: "17px",
        width: "100%",
        textAlign: "start",
        direction:
          theme.direction === "rtl" ? "rtl!important" : "ltr!important",

        "& h2": {
          // wordBreak: "break-all",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: theme.globals.fontSize.m - 2,
          lineHeight: "23px",
          textTransform: "capitalize",
          color: theme.globals.colors.textMed,
          overflow: "hidden",
          display: "-webkit-box",
          "-webkitLineClamp": 1,
          "-webkitBoxOrient": "vertical",
          [theme.breakpoints.down(820)]: {
            width: "84%",
          },
          [theme.breakpoints.down(700)]: {
            width: "70%",
          },
          [theme.breakpoints.down(600)]: {
            width: "100%",
          },
        },

        "& p": {
          height: 32,
          fontFamily:
            theme.direction === "rtl"
              ? `${theme.globals.fontFamily.ar}!important`
              : `${theme.globals.fontFamily.en}!important`,
          fontStyle: "normal!important",
          fontWeight: "600!important",
          fontSize: `${theme.globals.fontSize.xs}px!important`,
          lineHeight: "16px",
          textTransform: "capitalize",
          color: `${theme.globals.colors.textMed}!important`,
          overflow: "hidden",
          display: "-webkit-box",
          "-webkitLineClamp": 2,
          "-webkitBoxOrient": "vertical",
          "& *": {
            color: `${theme.globals.colors.textMed}!important`,
            fontFamily:
              theme.direction === "rtl"
                ? `${theme.globals.fontFamily.ar}!important`
                : `${theme.globals.fontFamily.en}!important`,
            fontSize: theme.globals.fontSize.xs,
            fontStyle: "normal",
            background: "none!important",
          },
        },

        "& div.btnContainer": {
          display: "flex",
          justifyContent: "center",

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

              "& span.MuiButton-label": {
                color: theme.globals.colors.white,
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
              },
            },
            "& .MuiButton-label": {
              width: "auto",
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: theme.globals.fontSize.s - 2,
              lineHeight: "19px",
              textTransform: "capitalize",
              color: theme.palette.primary.main,
            },
          },
        },
      },
    },
  },
}));

export default useStyles;
