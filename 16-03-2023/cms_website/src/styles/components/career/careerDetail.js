import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& button.applyBtn": {
      height: 30,
      textTransform: "capitalize",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid",
      display: "flex",
      minWidth: 80,
      position: "relative",
      marginTop: 40,

      "&:hover": {
        backgroundImage: "url(/assets/images/home/btn.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      },

      "& .MuiButton-label": {
        width: "auto",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        color:
          theme.palette.type === "dark"
            ? "white"
            : theme.palette.secondary.main,

        "&:hover": {
          color: "white",
        },
      },
    },
    "& div.mediaContainer": {
      width: "100%",

      marginBottom: "15px",

      "& div.media": {
        width: "100%",
        padding: "20px",
        display: "flex",
        background: theme.globals.colors.white,
        alignItems: "center",
        paddingLeft: "14px",
        borderRadius: "5px",
        marginBottom: "15px",
        paddingRight: "10px",
        justifyContent: "space-between",
        marginRight: "auto",
        marginLeft: "auto",

        [theme.breakpoints.down(960)]: {
          width: "95%",
        },

        "& a.imageLink": {
          display: "inline-block",
          width: "200px",
          height: "200px",
          boxShadow: "0px 4px 50px rgb(0 0 0 / 7%)",
          borderRadius: "10px",

          [theme.breakpoints.between(750, 950)]: {
            height: "170px",
          },

          [theme.breakpoints.down(750)]: {
            width: "135px",
            height: "160px",
          },

          [theme.breakpoints.down(580)]: {
            width: "125px",
            height: "160px",
          },

          [theme.breakpoints.down(510)]: {
            display: "none",
          },

          "& img": {
            width: "100%",
            height: "100%",
          },
        },

        "& div.media-body": {
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          height: "200px",
          justifyContent: "space-between",

          [theme.breakpoints.between(750, 950)]: {
            height: "170px",
          },

          [theme.breakpoints.down(750)]: {
            width: "135px",
            height: "160px",
          },

          [theme.breakpoints.down(580)]: {
            width: "125px",
            height: "160px",
          },

          "& a": {
            textDecoration: "none",
          },

          "& p": {
            overflow: "hidden",
            display: "-webkit-box",
            "-webkitLineClamp": 2,
            "-webkitBoxOrient": "vertical",
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: theme.globals.fontSize.lg,
            lineHeight: "19px",
            color: theme.globals.colors.textDark,
            paddingBottom: "10px",

            [theme.breakpoints.down(750)]: {
              fontSize: theme.globals.fontSize.lg - 2,
            },

            [theme.breakpoints.down(650)]: {
              fontSize: theme.globals.fontSize.m,
            },

            [theme.breakpoints.down(550)]: {
              fontSize: theme.globals.fontSize.m - 2,
            },
          },

          "& span": {
            overflow: "hidden",
            display: "-webkit-box",
            "-webkitLineClamp": 5,
            "-webkitBoxOrient": "vertical",
            color: theme.globals.colors.textLight,
            fontSize: theme.globals.fontSize.s,
            paddingBottom: "15px",
            whiteSpace: "pre",

            [theme.breakpoints.down(550)]: {
              fontSize: theme.globals.fontSize.s - 2,
            },
          },

          "& div": {
            display: "flex",
            justifyContent: "space-between",
            width: "90%",

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
              "& .MuiButton-endIcon": {
                position: "absolute",
                opacity: "0",

                right: -20,
                transition: "0.5s",
                transform: theme.direction === "rtl" ? "rotateY(180deg)" : "",
              },
              "& .MuiButton-label": {
                width: "auto",
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                color: theme.palette.secondary.main,
              },
              "&:hover": {
                borderRadius: 7,
                padding: "4px 8px",

                "& .MuiButton-endIcon": { opacity: "1", right: 3 },
              },
            },
          },
        },
      },
    },
  },
  dateDirection: {
    // direction: theme.direction === "rtl" ? "rtl!important" : "ltr!important",
    display: "flex",
    // flexDirection: theme.direction === "rtl" ? "row-reverse" : "row",
    padding: "0px 4px",
  },
  latest: {
    marginTop: "40px",

    "& div.latestHeader": {
      marginBottom: "20px",
      marginTop: "15px",
      display: "flex",

      marginRight: "auto",
      marginLeft: "auto",

      "& div.heading": {
        width: "15%",
        [theme.breakpoints.down(1135)]: {
          width: "20%",
        },
        [theme.breakpoints.down(870)]: {
          width: "25%",
        },
        [theme.breakpoints.down(710)]: {
          width: "30%",
        },
        [theme.breakpoints.down(710)]: {
          width: "40%",
        },
        [theme.breakpoints.down(450)]: {
          width: "50%",
        },

        "& h2": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: theme.globals.fontSize.lg - 4,
          lineHeight: "30px",
          color: theme.palette.primary.main,
          textAlign: "start",

          [theme.breakpoints.between(600, 700)]: {
            fontSize: theme.globals.fontSize.m,
          },
          [theme.breakpoints.down(370)]: {
            fontSize: theme.globals.fontSize.s,
          },
        },
      },

      "& div.divider": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        "& hr": {
          height: 1,
          width: "100%",
          backgroundColor: theme.palette.primary.main,

          opacity: "0.6",
        },
      },
    },
  },

  date: {
    fontSize: "14px",
    fontWeight: "700",
    color:
      theme.palette.type === "dark"
        ? theme.globals.colors.white
        : theme.palette.textMed.main,
    marginBottom: "15px",
    textAlign: "start",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    display: "flex",
  },

  heading: {
    fontSize: "18px",
    fontWeight: "700",
    color:
      theme.palette.type === "dark"
        ? theme.globals.colors.white
        : theme.palette.textMed.main,
    marginBottom: "15px",
    textAlign: "start",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
  },
  main: {
    overflow: "hidden",
    display: "-webkit-box",
    "-webkitLineClamp": 2,
    "-webkitBoxOrient": "vertical",
    textAlign: "start",
    fontSize: theme.globals.fontSize.s + 2,
    color: "#444444",
    fontWeight: "600",
    minHeight: 22,
  },
  label: {
    color:
      theme.palette.type === "dark"
        ? theme.globals.colors.white
        : theme.palette.textMed.main,
    fontWeight: 600,
    fontSize: theme.globals.fontSize.s - 2,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
  },
  MainParagraph: {
    color:
      theme.palette.type === "dark"
        ? theme.globals.colors.white
        : theme.palette.textMed.main,
    fontWeight: 400,
    fontSize: theme.globals.fontSize.s - 2,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
  },
}));

export default useStyles;
