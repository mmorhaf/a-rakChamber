import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "calc(100vh - 370px)",

    "& div.cardContainer": {
      width: "100%",
      marginRight: "auto",
      marginLeft: "auto",
      background: theme.globals.colors.white,
      boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      marginBottom: "8px",

      [theme.breakpoints.down(960)]: {
        width: "80%",
        marginRight: "auto",
        marginLeft: "auto",
      },

      [theme.breakpoints.down(650)]: {
        width: "90%",
      },

      "&  div.cardContentContainer": {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
      },

      "& div.title": {
        minHeight: "75px",
        height: "auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "27px",
        borderBottom: `2px solid #DFDBD2`,
        [theme.breakpoints.down(800)]: {
          display: "block",
        },
        "& h2": {
          width: "80%",
          textAlign: "start",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: theme.globals.fontSize.s,
          lineHeight: "22px",
          color: "#444444",
          paddingRight: "15px",
          paddingLeft: "30px",
          overflow: "hidden",
          [theme.breakpoints.down(800)]: {
            marginBottom: 8,
            marginTop: 8,
            width: "100%",
          },

          [theme.breakpoints.down(750)]: {
            fontSize: theme.globals.fontSize.s,
          },

          [theme.breakpoints.down(500)]: {
            fontSize: theme.globals.fontSize.s - 2,
          },
        },

        "& span": {
          width: "26%",
          display: "flex",
          placeItems: "center",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: theme.globals.fontSize.s - 2,
          lineHeight: "19px",
          color: theme.globals.colors.textLighter,
          [theme.breakpoints.down(1270)]: {
            width: "30%",
          },
          [theme.breakpoints.down(960)]: {
            width: "40%",
          },
          [theme.breakpoints.down(800)]: {
            paddingLeft: 30,
            width: "100%",
            placeItems: "flex-start",
          },
        },
      },

      "& div.MuiCardContent-root": {
        "& div.pollContainer": {
          width: "75%",
          marginRight: "auto",
          marginLeft: "auto",
          minHeight: "160px",
          height: "auto",
          overflow: "auto",

          "&::-webkit-scrollbar": {
            width: "0.4em",
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: "6px",
          },

          "& div.patrialContainer:nth-child(even)": {
            "& div.boxContainer": {
              "& div.outerBox": {
                "&  div.innerBox": {
                  background: theme.globals.colors.pollInnerBox,
                  borderRadius: "20px",
                },
              },
              "& span.rate": {
                color: theme.globals.colors.pollInnerBox,
              },
            },
          },

          "& div.patrialContainer": {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "14px",
            justifyContent: "space-between",

            [theme.breakpoints.down(960)]: {
              display: "block",
              marginBottom: "15px",
            },

            "& span.name": {
              display: "block",
              width: "100%",
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: theme.globals.fontSize.xs + 1,
              lineHeight: "19px",
              color: theme.palette.textMed.main,
              textAlign: "start",

              [theme.breakpoints.between(1300, 1360)]: {
                fontSize: theme.globals.fontSize.xs,
              },
            },

            "& div.boxContainer": {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              [theme.breakpoints.down(960)]: {
                height: "20px",
              },

              "& div.outerBox": {
                width: "90%",
                height: "10px",
                display: "flex",
                alignItems: "center",
                background: theme.globals.colors.pollOuterBox,
                borderRadius: "20px",

                [theme.breakpoints.down(960)]: {
                  width: "80%",
                },

                [theme.breakpoints.down(420)]: {
                  width: "100%",
                },

                "& div.innerBox": {
                  width: "23%",
                  height: "64%",
                  background: theme.palette.primary.main,
                  borderRadius: "20px",
                },
              },

              "& span.rate": {
                width: "50px",
                marginLeft: "50px",
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: theme.globals.fontSize.s - 2,
                lineHeight: "19px",
                color: theme.palette.primary.main,
                textAlign: "start",

                [theme.breakpoints.down(420)]: {
                  marginLeft: "10px",
                },
              },
            },
          },
        },

        "& div.votesNBtn": {
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginRight: "auto",
          marginLeft: "auto",

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
            // marginRight: "20px",
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
  },
}));

export default useStyles;
