import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  adRoot: {
    width: "347px",
    height: "433px",
    background: theme.globals.colors.white,
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: "5px 0px 0px 5px",

    [theme.breakpoints.down(768)]: {
      width: "365px",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: "50px",
    },

    "& .adBadge": {
      marginTop: "20px",
      "& span": {
        height: "27px",
        width: "36px",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        background: theme.palette.secondary.main,
        borderRadius: "7px",
        color: theme.globals.colors.white,
        fontSize: theme.globals.fontSize.m - 2,
        fontWeight: "bold",
      },
    },

    "& h1": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: theme.globals.fontSize.lg,
      lineHeight: "28px",
      color: theme.palette.primary.main,
      width: "100%",
      height: "28px",
      marginTop: "20px",
      marginBottom: "20px",
      textAlign: "center",
    },

    "& p": {
      width: "250px",
      marginRight: "auto",
      marginLeft: "auto",
      height: "64px",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: theme.globals.fontSize.s - 2,
      lineHeight: "16px",
      color: theme.palette.primary.main,
    },

    "& .contactInfo": {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "25px",

      "& .numbers": {
        "& ul": {
          "& li": {
            "& span": {
              textAlign: "left",
            },
          },
        },
      },

      "& div.phoneImg": {
        backgroundImage: "url(/assets/images/13.png)",
        width: "100px",
        height: "114.66px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      },
    },

    "& .adBtn": {
      textAlign: "center",

      "& button": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: theme.globals.fontSize.s,
        lineHeight: "19px",
        textAlign: "center",
        color: theme.globals.colors.white,
        width: "182px",
        height: "41px",
        background: theme.palette.secondary.main,
        borderRadius: "5px",
      },
    },
  },
}));

export default useStyles;
