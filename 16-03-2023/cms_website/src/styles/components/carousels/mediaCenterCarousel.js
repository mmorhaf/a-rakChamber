import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    direction: `${theme.direction}`,

    "& div.slideContainer": {
      display: "flex",
      justifyContent: "space-around",
      width: "100%",
      [theme.breakpoints.down(768)]: {
        flexDirection: "column",
      },

      "& div.columnContainer": {
        width: "45%",
        marginTop: theme.spacing(2),

        [theme.breakpoints.down(768)]: {
          width: "unset",
          marginRight: "unset",
          marginLeft: "unset",
        },

        [theme.breakpoints.between(505, 768)]: {
          width: "90%",
          marginRight: "auto",
          marginLeft: "auto",
        },

        [theme.breakpoints.down(550)]: {
          padding: 10,
        },

        "& h2": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          textAlign: "left",
          fontWeight: "500",
          fontSize: theme.globals.fontSize.m - 2,
          lineHeight: "25px",
          color: theme.globals.colors.white,
          background: theme.globals.colors.pollOuterBox,
          borderRadius: 10,
          width: "100%",
          height: "49px",
          display: "flex",
          alignItems: "center",
          direction: theme.direction === "ltr" ? "ltr" : "rtl!important",
          marginBottom: "10px",
          backgroundImage: "url(/assets/images/home/category.webp)",
          backgroundSize: "cover",
          "& svg": {
            color: theme.globals.colors.white,
            marginRight: "14px",
            marginLeft: "14px",
          },
        },

        "& div.mediaCard": {
          background: theme.globals.colors.white,
          height: 180,
          direction:
            theme.direction === "rtl" ? "rtl!important" : "ltr!important",
          boxShadow: "0px 0 18px rgb(0 0 0 / 8%)",
          borderRadius: 10,
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "flex-end",
          position: "relative",
          transform: "scale(1)",
          transition: "all 300ms ease-in-out",
          marginBottom: "24px",
          marginTop: "16px",

          "&:before ": {
            position: "absolute",
            content: '""',
            backgroundColor: theme.palette.primary.main,
            zIndex: "1",
            WebkitTransition: "all 500ms cubic-bezier(0.445, 0.05, 0.55, 0.95)",
            transition: "all 500ms cubic-bezier(0.445, 0.05, 0.55, 0.95)",

            height: 1,
            width: "0%",
            transform: "translateX(0%)",
            top: 0,
            right: 0,
          },

          "& .MuiCardMedia-root": {
            minWidth: 107,
            maxWidth: 155,
            width: "40%",
            transform: "scale(1)",
            display: "flex",
            alignItems: "center",
            borderRadius: "10px",
            justifyContent: "center",
            margin: "10px",
            overflow: "hidden!important",
            border: "1px solid whitesmoke",
            transition: "all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95)",
            [theme.breakpoints.between(750, 950)]: {
              height: "170px",
            },

            [theme.breakpoints.down(750)]: {
              width: "135px",
              height: "160px",
              minWidth: "unset",
            },

            [theme.breakpoints.down(580)]: {
              width: "125px",
              height: "160px",
              minWidth: "unset",
            },

            [theme.breakpoints.down(400)]: {
              width: "107px",
              minWidth: "unset",
            },
          },
          "&:hover": {
            cursor: "pointer",

            transform: "scale(1.05)",

            "&:before ": {
              transform: "translateX(-100%)",
              opacity: "0.2",
              width: "100%",
            },

            "& .MuiCardMedia-root": {
              transform: "scale(1.05)",
              margin: "   0 0 0 15px",
              borderRadius: 0,
              border: "1px solid transparent",
            },
          },
          "& *": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
          },

          "& button": {
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

            [theme.breakpoints.between(768, 1050)]: {
              marginRight: 10,
            },

            [theme.breakpoints.down(450)]: {
              marginRight: 10,
            },

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
          "& .MuiCardContent-root , .MuiCardHeader-root": {
            padding: 0,
          },
          "& .MuiCardHeader-root": {
            marginBottom: theme.spacing(1),

            "& span.MuiCardHeader-title span": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: theme.globals.fontSize.xs + 1,
              color: theme.globals.colors.textLight,
              height: 14,
            },

            "& span.MuiCardHeader-subheader": {
              textAlign: "left",
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: theme.globals.fontSize.s,
              color: theme.globals.colors.textMed,
              height: 50,
              overflow: "hidden!important",
              display: "-webkit-box",
              "-webkitLineClamp": 2,
              "-webkitBoxOrient": "vertical",
            },
          },
          "& .MuiCardContent-root ": {
            height: 39,
            overflow: "hidden!important",
            marginBottom: 4,
            "& > p": {
              overflow: "hidden!important",
              display: "-webkit-box",
              "-webkitLineClamp": 2,
              "-webkitBoxOrient": "vertical",
              marginBottom: 0,
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,

              textAlign: "start",
              fontSize: theme.globals.fontSize.s - 2,
              fontWeight: "400!important",
              lineHeight: "18px",
              color: `${theme.globals.colors.textLight}!important`,
              backgroundColor: "#fff!important",
              "& *": {
                // wordBreak: "break-all",
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,

                textAlign: "start",
                fontSize: theme.globals.fontSize.s - 2,
                fontWeight: "400!important",
                lineHeight: "18px",
                color: `${theme.globals.colors.textLight}!important`,
                backgroundColor: "#fff!important",
              },
            },
          },

          "& div.contentContainer": {
            padding: "10px 10px 10px 10px",
            fontSize: theme.globals.fontSize.s - 2,
            fontStyle: "normal",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",

            [theme.breakpoints.between(960, 1000)]: {
              fontSize: theme.globals.fontSize.xs - 2,
            },

            [theme.breakpoints.between(580, 650)]: {
              fontSize: theme.globals.fontSize.xs + 1,
            },

            "& .MuiCardHeader-title": {
              overflow: "hidden!important",
              display: "-webkit-box",
              "-webkitLineClamp": 2,
              "-webkitBoxOrient": "vertical",
              textAlign: "start",
              fontSize: theme.globals.fontSize.s,
              textTransform: "capitalize",
              color: theme.globals.colors.textMed,
              fontWeight: "600",
              minHeight: 22,
              [theme.breakpoints.between(1500, 1550)]: {
                fontSize: theme.globals.fontSize.xs - 1,
              },

              [theme.breakpoints.between(1000, 1050)]: {
                fontSize: theme.globals.fontSize.xs - 1,
              },
            },

            "& span.MuiCardHeader-subheader": {
              "& span": {
                color: theme.globals.colors.textMed,
                display: "inline-block",
                fontSize: theme.globals.fontSize.s - 3,
                width: "100%",
                textAlign: "start",
                textTransform: "capitalize",

                "& svg": {
                  fontSize: theme.globals.fontSize.m + 2,
                  marginRight: 6,
                },
              },
            },
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

      [theme.breakpoints.up(450)]: {
        top: 30,
      },

      "& button.owl-dot span": {
        background: theme.palette.primary.main,
        transform: "matrix(1, 0, 0, -1, 0, 0)",
        width: 30,
        height: 6,
        borderRadius: 0,
        borderBottom: "unset",
        borderTop: "unset",
        opacity: "1",
      },

      "& button.owl-dot.active span": {
        background: theme.palette.secondary.main,
      },
    },
  },
  date: {
    // direction: "ltr!important",
    display: "flex",
    // flexDirection: theme.direction === "rtl" ? "row-reverse" : "row",
  },
}));

export default useStyles;
