import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "flex-start",
    height: "100%",
    flexDirection: "column",
    minHeight: "100%",
    maxHeight: "100%",
    flex: "1 1 auto",
    "& div.contentContainer": {
      display: "flex",
      flexDirection: "column",
      // justifyContent: "space-evenly",
      flex: "1",
      padding: 10,

      "& div.cardContainer": {
        height: "100%",
        width: "100%",
        textAlign: "start",
        boxShadow: "unset",
        background: theme.globals.colors.white,

        "& div.MuiCardContent-root": {
          width: "100%",
          height: "100%",

          "& h2": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: theme.globals.fontSize.s,
            lineHeight: "19px",
            color: theme.palette.primary.main,
            marginBottom: "10px",
            overflow: "hidden",
            display: "-webkit-box",
            "-webkitLineClamp": 3,
            "-webkitBoxOrient": "vertical",
          },

          "& span.date": {
            display: "block",
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: theme.globals.fontSize.s - 1,
            lineHeight: "17px",
            color: "rgba(0, 0, 0, 0.54)",
            marginBottom: "15px",
            textTransform: "capitalize",
            direction: "ltr!important",
            display: "flex",
            flexDirection: theme.direction === "rtl" ? "row-reverse" : "row",
          },

          "& p.text": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: theme.globals.fontSize.xs + 2,
            lineHeight: "24px",
            color: `${theme.globals.colors.textLight}!important`,
            overflow: "hidden",
            display: "-webkit-box",
            "-webkitLineClamp": 10,
            "-webkitBoxOrient": "vertical",

            "& *": {
              backgroundColor: "transparent!important",
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontWeight: "normal!important",
              fontSize: theme.globals.fontSize.xs + 2,
              lineHeight: "24px",
              color: `${theme.globals.colors.textLight}!important`,

              [theme.breakpoints.between(960, 1200)]: {
                fontSize: theme.globals.fontSize.s - 1,
              },
            },
          },

          "& p.text :nth-child(n+2)": {
            display: "none!important",
          },
        },

        "& div.btnContainer": {
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
          marginBottom: "50px",
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: "25px",
          textAlign: "start",
          position: "absolute",
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
        },
      },
    },

    "& div.btnContainer": {
      display: "flex",
      justifyContent: "space-evenly",
      padding: 10,
      "& button": {
        width: "130px",
        height: "35px",
        background: theme.globals.colors.white,
        border: `0.5px solid ${theme.palette.secondary.main}`,
        boxSizing: "border-box",
        boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        transition: "all 0.3s",
        textTransform: "capitalize",
        justifyContent: "center",
        alignItems: "center",
        color: theme.palette.secondary.main,
        display: "flex",
        minWidth: 80,
        position: "relative",
        [theme.breakpoints.down(400)]: {
          width: 100,
        },
        "&:hover": {
          backgroundImage: "url(/assets/images/home/btn.png)",
          backgroundSize: "cover",
          color: "white",
        },
        "& .MuiButton-label": {
          width: "auto",
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
      },
      "& button.Mui-disabled": {
        "& span.MuiButton-label": {
          color: `${theme.globals.colors.textMed}B3`,
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
        },
      },
    },
  },
}));

export default useStyles;
