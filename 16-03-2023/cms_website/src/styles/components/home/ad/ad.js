import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    //position: "absolute",
    top: 0,
    left: 0,
    width: 400,
    marginTop: 90,

    [theme.breakpoints.down(1280)]: {
      width: "100%",
      maxWidth: "500px",
    },
    [theme.breakpoints.down(600)]: {
      marginTop: 0,
    },
    "& div.slick-slider.slick-initialized": {
      "& div.slick-list": {
        direction: "ltr!important",

        "& div.slick-track": {
          direction: "ltr!important",

          "& div.slick-active.slick-slide": {
            zIndex: 10,
          },

          "& div.slick-slide": {
            float: "left!important",

            "& > div:not(div.cardContainer)": {
              padding: "5px 5px 5px 0",
            },
          },
        },
      },
    },

    "& div.cardContainer": {
      height: "510px",
      width: "100%",
      background: "#F4F4F4",
      borderRadius: "0 30px 30px 0",
      overflow: "hidden",
      boxShadow: "0px 0 18px rgb(0 0 0 / 8%)",
      marginBottom: 40,
      [theme.breakpoints.down(1280)]: {
        borderRadius: 0,
        marginTop: "50px",
      },

      [theme.breakpoints.down(1280)]: {
        borderRadius: "0 30px 30px 0",
      },

      [theme.breakpoints.down(600)]: {
        height: "425px",
      },

      [theme.breakpoints.down(530)]: {
        borderRadius: 0,
      },

      "& div.card": {
        width: "75%",
        height: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        boxShadow: "unset",
        border: 0,
        background: "transparent",
        overflow: "unset",
        zIndex: 1000,
        position: "static",
        direction:
          theme.direction === "rtl" ? "rtl!important" : "ltr!important",

        [theme.breakpoints.down(400)]: {
          marginRight: "10px",
          width: "80%",
        },

        "& div.MuiCardContent-root": {
          padding: "16px 0 16px 5px",

          "& div.ad": {
            position: "absolute",
            left: "0",
            top: "27px",
            width: "46px",
            height: "48px",
            background: theme.palette.primary.main,
            borderRadius: "0px 20px 20px 0px",
            display: "grid",
            placeItems: "center",

            "& span": {
              width: "25px",
              height: "22px",
              background: theme.globals.colors.white,
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: theme.globals.fontSize.xs,
              color: theme.palette.primary.main,
              display: "grid",
              placeItems: "center",
              borderRadius: "6px",
            },
          },

          "& h2": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: theme.globals.fontSize.lg - 4,
            lineHeight: "28px",
            color: theme.palette.primary.main,
            marginTop: "20px",
            marginBottom: "20px",
            textAlign: "start",
          },

          "& p": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: theme.globals.fontSize.s - 2,
            lineHeight: "19.7px",
            color: theme.palette.primary.main,
            marginBottom: "10px",
            textAlign: "start",
            overflow: "hidden",
            display: "-webkit-box",
            "-webkitLineClamp": 3,
            "-webkitBoxOrient": "vertical",
          },
        },

        "& div.MuiCardMedia-root": {
          height: "150px",
          width: "100%",
          backgroundSize: "cover",
          backgroundColor: theme.globals.colors.white,
          backgroundPosition: "center",
          marginBottom: "25px",
        },

        "& div.MuiCardActions-root": {
          display: "flex",
          justifyContent: "center",

          "& button": {
            border: `1px solid ${theme.globals.colors.textLight}`,
            borderRadius: "5px",

            "& span.MuiButton-label": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: theme.globals.fontSize.s - 2,
              lineHeight: "22px",
              textAlign: "center",
              color: theme.globals.colors.textMed,
              textTransform: "capitalize",
            },
          },
        },
      },

      "& div.cardImge": {
        width: "100%",
        height: "100%",
        boxShadow: "unset",
        border: 0,
        background: "transparent",
        zIndex: 1000,

        "& div.MuiCardMedia-root": {
          width: "100%!important",
          height: "100%!important",
          backgroundSize: "cover",
        },
      },
    },
  },
}));

export default useStyles;
