import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    direction: `${theme.direction}`,

    [theme.breakpoints.down(1200)]: {
      width: "100%!important",
    },

    "& .owl-nav": {
      display: "none",
      "& > button": {
        fontSize: "36px!important",
      },
      "& .owl-prev": {
        position: "absolute",
        left: 40,
        top: "50%",
        [theme.breakpoints.down(550)]: {
          left: 0,
        },
      },
      "& .owl-next": {
        position: "absolute",
        right: 40,
        top: "50%",
        [theme.breakpoints.down(550)]: {
          right: 0,
        },
      },
      [theme.breakpoints.down(680)]: {
        display: "block",
      },
    },
    "& .slideContainer": {
      display: "flex",
    },
    "& div.owl-stage-outer": {
      "& div.owl-item.cloned.active + div.owl-item.cloned:not(div.owl-item.cloned.active)":
        {
          display: "none",
        },
    },

    "& div.cardContainer": {
      padding: 20,
      "& .controls": { padding: theme.spacing(0, 2) },
      "& a.moreBtn": {
        color: theme.palette.primary.main,
        width: "88px",
        fontWeight: "600",
        height: "25.68px",
        padding: 0,
        fontSize: theme.globals.fontSize.s - 2,

        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontWeight: "500",

        background: theme.globals.colors.white,
        textTransform: "capitalize",

        "&:hover": {
          textDecoration: "none",
          transform: "scale(1.03)",
        },
      },
      "& .info": {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: theme.spacing(1),
        color: theme.globals.colors.textLight,
        textTransform: "capitalize",
        "& .date": {
          marginBottom: "0!important",
        },
      },

      "& .MuiCardMedia-root": {
        height: 200,
      },
      [theme.breakpoints.between(980, 1000)]: {
        padding: "18px",
      },

      [theme.breakpoints.between(450, 700)]: {
        padding: "18px",
        height: "100%",
      },

      "& div.MuiCard-root": {
        border: 0,
        width: "100%",
        maxWidth: "380px",

        background: theme.globals.colors.white,
        boxShadow: "0px 0 18px rgb(0 0 0 / 8%)",
        display: "block",
        height: 320,
        borderRadius: 10,

        "& button": {
          marginRight: "auto",
          marginLeft: "auto",
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
        [theme.breakpoints.down(1000)]: {
          width: "95%",
          maxWidth: "360px",
        },

        [theme.breakpoints.down(700)]: {
          maxWidth: "380px",
          marginLeft: "auto",
          marginRight: "auto",
        },

        "& div.MuiCardContent-root": {
          textAlign: "start",
          direction: theme.direction === "rtl" ? "rtl!important" : "ltr",

          "& span.date": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: theme.globals.fontSize.s - 3,
            lineHeight: "16px",
            color: theme.globals.colors.textLight,
            marginBottom: "10px",
            display: "flex",
            textAlign: "start",
            alignItems: "center",
            textTransform: "capitalize",
            // direction: "ltr!important",
            display: "flex",
            // flexDirection: theme.direction === "rtl" ? "row-reverse" : "row",
            "& svg": {
              fontSize: theme.globals.fontSize.s,
              marginRight: theme.spacing(1),
            },
          },

          "& p.title": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: theme.globals.fontSize.s - 1,

            color: theme.globals.colors.textMed,
            height: 21,
            overflow: "hidden",
            display: "-webkit-box",
            "-webkitLineClamp": 2,
            "-webkitBoxOrient": "vertical",
          },
        },
      },
    },

    "& div.owl-dots": {
      display: "flex",
      justifyContent: "center",
      position: "relative",
      width: "100%",
      textAlign: "start",
      direction: theme.direction === "rtl" ? "rtl!important" : "ltr",

      [theme.breakpoints.down(680)]: {
        display: "none",
      },

      [theme.breakpoints.up(450)]: {
        top: 30,
      },

      "& button.owl-dot span": {
        background: `${theme.palette.primary.main} 80`,
        transform: "matrix(1, 0, 0, -1, 0, 0)",
        width: 30,
        height: 6,
        borderRadius: 0,
        borderBottom: "unset",
        borderTop: "unset",
        opacity: "1",
        marginRight: "11px",
      },

      "& button.owl-dot.active span": {
        background: theme.palette.primary.main,
      },
    },
  },
}));

export default useStyles;
