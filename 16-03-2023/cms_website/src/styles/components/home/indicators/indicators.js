import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "130px",
    width: "100%",
    backgroundImage: "url(/assets/images/home/statestics.webp)",
    backgroundSize: "cover",

    [theme.breakpoints.down(700)]: {
      height: "fit-content",
    },

    "& div.cardsContainer": {
      height: "100%",
      display: "flex",
      justifyContent: "space-evenly",

      [theme.breakpoints.down(700)]: {
        flexWrap: "wrap",
        maxWidth: "460px",
        marginLeft: "auto",
        marginRight: "auto",
      },

      [theme.breakpoints.down(400)]: {
        justifyContent: "space-around",
      },

      "& div.cardContainer": {
        width: "20%",
        height: "100%",
        background: "transparent",
        boxShadow: "unset",

        [theme.breakpoints.down(700)]: {
          width: "50%",
        },

        "& div.MuiCardContent-root": {
          [theme.breakpoints.down(700)]: {
            maxWidth: "135px",
            marginLeft: "auto",
            marginRight: "auto",
          },

          "& div.contentContainer": {
            "& h2.description": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: theme.direction === "rtl" ? "normal" : "bold",
              fontSize:
                theme.direction === "rtl"
                  ? theme.globals.fontSize.s + 1
                  : theme.globals.fontSize.m - 1,
              lineHeight: "27px",
              color: theme.globals.colors.white,
              textTransform: "capitalize",
              textAlign: "center",
              overflow: "hidden",
              display: "-webkit-box",
              "-webkitLineClamp": 1,
              "-webkitBoxOrient": "vertical",

              [theme.breakpoints.down(950)]: {
                fontSize: theme.globals.fontSize.m - 2,
              },

              [theme.breakpoints.down(400)]: {
                fontSize: theme.globals.fontSize.s,
              },
            },

            "& div.icnNnum": {
              display: "flex",
              alignItems: "center",
              flexDirection: "column",

              "& div.iconPhoto": {
                width: "33px",
                height: "24px",
                backgroundSize: "contain",
              },

              "& span.number": {
                "& span": {
                  fontFamily:
                    theme.direction === "rtl"
                      ? theme.globals.fontFamily.ar
                      : theme.globals.fontFamily.en,
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize:
                    theme.direction === "rtl"
                      ? theme.globals.fontSize.xl + 2
                      : theme.globals.fontSize.xl + 6,
                  lineHeight: "49px",
                  color: theme.globals.colors.white,

                  [theme.breakpoints.down(950)]: {
                    fontSize: theme.globals.fontSize.xl + 2,
                  },

                  [theme.breakpoints.down(400)]: {
                    fontSize: theme.globals.fontSize.xl - 1,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}));

export default useStyles;
