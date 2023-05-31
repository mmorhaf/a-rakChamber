import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  linkRoot: {
    boxShadow: "unset",
    background: "transparent",

    [theme.breakpoints.down(960)]: {
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
      flexGrow: "unset",
      height: "unset",
    },

    "& > h1": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: theme.globals.fontSize.lg,
      lineHeight: "41px",
      color:
        theme.palette.type === "dark"
          ? theme.globals.colors.darkPrimary
          : theme.globals.colors.textMed,
      height: 110,
      position: "relative",
      textAlign: "start",
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",

      [theme.breakpoints.down(1250)]: {
        fontSize: theme.globals.fontSize.lg,
      },

      [theme.breakpoints.down(768)]: {
        fontSize: theme.globals.fontSize.lg,
      },
    },

    "& h1:before": {
      content: '""',
      position: "absolute",
      top: "-9px",
      width: "95%",
      height: 1,
      backgroundColor: theme.palette.primary.main,

      [theme.breakpoints.down(1450)]: {
        width: "100%",
      },
    },

    "& div.linksContainer": {
      width: "100%",
      height: "500px",
      marginLeft: "auto",
      marginRight: "auto",
      background: theme.globals.colors.white,
      boxShadow: "0px 10px 40px rgb(0 0 0 / 10%)",
      borderRadius: "10px",

      [theme.breakpoints.down(960)]: {
        width: "100%",
        maxWidth: "450px",
        height: "409px",
      },

      "& > div.MuiBox-root": {
        height: "100%",
        width: "100%",

        "& div.slick-slider": {
          height: "100%",
          width: "100%",

          "& div.slick-list": {
            direction: "ltr!important",

            "& div.slick-track": {
              direction: "ltr!important",

              "& div.slick-slide": {
                float: "left!important",
              },
            },

            "& ul": {
              marginTop: "35px",

              [theme.breakpoints.down(768)]: {
                marginTop: "20px",
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
                marginTop: "20px",
                marginBottom: "20px",
                position: "static",
                textAlign: "start",
              },
              "& li": {
                cursor: "pointer",
                direction: theme.direction === "rtl" ? "rtl!important" : "ltr",
                height: "35px",
                width: "90%",
                marginRight: "auto",
                marginLeft: "auto",
                paddingLeft: "5px",
                paddingRight: "0",
                backgroundImage: "url(/assets/images/home/category.webp)",
                backgroundSize: "cover",
                borderRadius: "10px",
                marginBottom: "17px",
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: theme.globals.fontSize.s,
                lineHeight: "291.69%",
                color: theme.globals.colors.white,

                [theme.breakpoints.down(960)]: {
                  height: "30px",
                },

                "& div.MuiListItemIcon-root": {
                  color: theme.globals.colors.white,
                  paddingLeft: "5px",

                  [theme.breakpoints.down(900)]: {
                    minWidth: "32px",
                  },

                  "& span": {
                    fontSize: theme.globals.fontSize.xs,
                  },
                },

                "& div.MuiListItemText-root": {
                  "& span": {
                    fontFamily:
                      theme.direction === "rtl"
                        ? theme.globals.fontFamily.ar
                        : theme.globals.fontFamily.en,
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: theme.globals.fontSize.s,
                    lineHeight: "291.69%",
                    color: theme.globals.colors.white,
                    overflow: "hidden",
                    display: "-webkit-box",
                    "-webkitLineClamp": 1,
                    "-webkitBoxOrient": "vertical",

                    [theme.breakpoints.down(900)]: {
                      fontSize: theme.globals.fontSize.xs,
                    },
                  },
                },
              },
            },
          },

          "& ul.slick-dots": {
            bottom: "20px",
            display: "flex!important",
            justifyContent: "center",

            "& li": {
              "& button": {
                "&:before": {
                  content: "''",
                  width: "22px",
                  height: "5px",
                  background: theme.globals.colors.textLight,
                  borderRadius: "0",
                },
              },
            },

            "& li.slick-active": {
              "& button": {
                "&:before": {
                  background: theme.palette.primary.main,
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
