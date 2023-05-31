import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginRight: "auto",
    marginLeft: "auto",

    "& div.slick-slider.slick-initialized": {
      "& div.slick-list": {
        direction: "ltr!important",

        "& div.slick-track": {
          direction: "ltr!important",

          "& div.slick-slide": {
            float: "left!important",
          },
        },
      },
    },

    "& div.card": {
      width: "100%",
      maxWidth: "245px",
      marginRight: "auto",
      marginLeft: "auto",
      marginBottom: "24px",
      marginTop: "20px",
      height: "315px",
      background: theme.globals.colors.white,
      boxShadow: "0px 0 18px rgb(0 0 0 / 8%)",
      borderRadius: "10px",
      alignItems: "center",
      border: "0",
      display: "block",
      overflow: "hidden",
      [theme.breakpoints.between(900, 1000)]: {
        width: "250px",
      },

      "& div.cardImage": {
        width: "100%",
        height: "50%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      },

      "& div.card-body": {
        display: "flex",
        padding: 10,
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "50%",
        width: "100%",
        marginTop: 5,
        textAlign: "start",
        direction:
          theme.direction === "rtl" ? "rtl!important" : "ltr!important",

        "& div.cont": {
          width: "100%",

          "& div.upperSec": {
            display: "flex",
            justifyContent: "space-between",
            width: "100%",

            "& div.visitors": {
              display: "flex",
              width: "fit-content",
              alignItems: "center",
              fontSize: theme.globals.fontSize.xs,
              color: "#A7A7A7",

              "& svg": {
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontSize: theme.globals.fontSize.s,
                color: "#A7A7A7",
                marginLeft: 5,
              },
            },

            "& div.date": {
              width: "100%",
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: theme.globals.fontSize.s - 2,
              lineHeight: "20px",
              textTransform: "capitalize",
              color: "#A7A7A7",
            },
          },

          "& > a": {
            display: "block",
            width: "100%",
          },

          "& p": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: theme.globals.fontSize.s,
            lineHeight: "22px",
            textTransform: "capitalize",
            color: theme.globals.colors.textMed,
            overflow: "hidden",
            display: "-webkit-box",
            "-webkitLineClamp": 2,
            "-webkitBoxOrient": "vertical",
          },
        },

        "& div.btnContainer": {
          display: "flex",
          justifyContent: "center",
          flexBasis: "unset",
          flexGrow: "unset",
          marginBottom: 8,
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
