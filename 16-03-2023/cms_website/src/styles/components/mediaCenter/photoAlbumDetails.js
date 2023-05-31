import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  detailedPhotoesRoot: {
    marginTop: 70,
    [theme.breakpoints.down(1300)]: {
      width: "100%",
    },

    "& div.albumDetails": {
      "& h2": {
        color:
          theme.palette.type === "dark"
            ? theme.globals.colors.white
            : theme.palette.textMed.main,
        fontSize: theme.globals.fontSize.s + 4,
        fontStyle: "normal",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontWeight: "600",
        lineHeight: "22px",
        marginBottom: "10px",
        textAlign: "start",
      },

      "& span": {
        color: "#A7A7A7",
        display: "block",
        fontSize: theme.globals.fontSize.s,
        fontStyle: "normal",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        textTransform: "capitalize",
        lineHeight: "19px",
        marginBottom: "20px",
        textAlign: "start",
        display: "flex",
      },
    },

    "& div.gallery": {
      display: "flex",
      justifyContent: "center",
      marginTop: "50px",

      "& div.ReactGridGallery": { width: "100%" },
    },

    "& div.actualContent": {
      minHeight: "calc(100vh - 370px)",

      "& div.dividTitle": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        marginTop: "60px",

        "& h2": {
          color: theme.palette.primary.main,
          fontSize: theme.globals.fontSize.m,
          fontStyle: "normal",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontWeight: "600",
          lineHeight: "19px",
        },

        "& hr": {
          height: "1px",
          width: "60%",
          background: theme.palette.secondary.main,
        },
      },

      "& div.albums": {
        display: "flex",
        justifyContent: "space-between",

        [theme.breakpoints.down(950)]: {
          justifyContent: "space-evenly",
        },

        "& a": {
          marginBottom: "30px",
          width: "45%",
          textDecoration: "none",

          [theme.breakpoints.between(1300, 1400)]: {
            width: "100%",
          },

          [theme.breakpoints.down(950)]: {
            width: "45%",
          },

          [theme.breakpoints.down(700)]: {
            width: "90%",
            marginRight: "auto",
            marginLeft: "auto",
          },

          "& div.card": {
            background: theme.globals.colors.white,
            boxShadow: "0px 4px 50px rgb(0 0 0 / 7%)",
            borderRadius: "5px",

            "& div.MuiCardContent-root": {
              height: "75px",
              width: "95%",
              marginRight: "auto",
              marginLeft: "auto",
              padding: "16px 0",

              "& span": {
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: theme.globals.fontSize.s - 2,
                lineHeight: "19px",
                color: theme.palette.secondary.main,
                display: "block",
                marginBottom: "6px",
              },

              "& p": {
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: theme.globals.fontSize.s - 2,
                lineHeight: "19px",
                color: theme.globals.colors.textDark,
                overflow: "hidden",
                display: "-webkit-box",
                "-webkitLineClamp": 1,
                "-webkitBoxOrient": "vertical",
              },
            },

            "& button": {
              width: "95%",
              marginRight: "auto",
              marginLeft: "auto",
              marginBottom: "8px",

              "&:hover": {
                transform: "scale(1.01)",
              },

              "& div:not(div.circle)": {
                width: "100%",
                height: "233px",
              },
            },
          },
        },
      },
    },
  },
  page: {
    marginTop: "30px",
  },
}));

export default useStyles;
