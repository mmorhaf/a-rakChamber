import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "25px",
    marginBottom: "65px",
    marginTop: "20px",

    "& div.bcrContainer": {
      display: "flex",
      height: "100%",
      justifyContent: "space-between",
      [theme.breakpoints.down(768)]: {
        display: "block",
      },
      "& div.breadCrumb": {
        [theme.breakpoints.down(768)]: {
          display: "none",
        },
        display: "flex",
        justifyContent: "space-between",

        "& nav": {
          display: "flex",
          alignItems: "center",
          textTransform: "capitalize",

          [theme.breakpoints.down(960)]: {
            width: "100%",
            marginRight: "auto",
            marginLeft: "auto",
          },

          "& ol li:nth-child(odd) a": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: theme.globals.fontSize.s - 2,
            lineHeight: "19px",
            color: theme.palette.primary.main,
          },

          "& ol li:nth-child(odd) p": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: theme.globals.fontSize.s - 2,
            lineHeight: "19px",
            color: theme.palette.primary.main,
          },

          "& ol li:nth-child(even) ": {
            color: theme.palette.secondary.main,
          },
        },
      },

      "& div.ratingNBtns": {
        display: "flex",
        justifyContent: "space-between",
        [theme.breakpoints.down(435)]: {
          flexDirection: "column",
        },
        "& div.rtaing": {
          display: "flex",
          width: theme.direction === "rtl" ? 215 : "195px",
          marginRight: "30px",
          justifyContent: "space-between",

          "& h2.rateTitle": {
            display: "flex",
            alignItems: "center",
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: theme.globals.fontSize.xs + 2,
            lineHeight: "19px",
            color: theme.palette.primary.main,
            textTransform: "capitalize",
          },

          "& span.MuiRating-root": {
            width: "100px",
            justifyContent: "space-between",
            alignItems: "center",

            "& svg": {
              width: "20px",
              height: "20px",
              fontSize: theme.globals.fontSize.m + 2,
            },

            "& label": {
              marginBottom: 0,

              "& svg": {
                width: "20px",
                height: "20px",
                fontSize: theme.globals.fontSize.m + 2,
              },
            },
          },
        },

        "& div.btns": {
          [theme.breakpoints.down(435)]: {
            marginTop: 16,
          },
          "& .image-to-print": {
            display: "none",
          },
          "& div.MuiButtonGroup-groupedContainedPrimary:not(:last-child)": {
            borderColor: "transparent",
          },

          "& div.MuiButtonGroup-root": {
            height: "100%",

            "& > div": {
              zIndex: 1000,

              "& ul li": {
                paddingTop: 0,
                paddingBottom: 0,

                "& button": {
                  "&:hover": {
                    backgroundColor: "transparent",
                  },

                  "& span.MuiButton-label": {
                    fontFamily:
                      theme.direction === "rtl"
                        ? theme.globals.fontFamily.ar
                        : theme.globals.fontFamily.en,
                    "& svg": {
                      width: "30px",
                      height: "30px",
                    },
                  },
                },
              },
            },

            "& button": {
              "& span.MuiButton-label": {
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                "& svg": {
                  width: "17px",
                  height: "17px",
                },
              },
            },

            "& button.printBtn": {
              background: theme.palette.primary.main,
              color: theme.globals.colors.white,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            },
          },
        },
      },
    },
  },
}));

export default useStyles;
