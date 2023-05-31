import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down(1300)]: {
      width: "100%",
    },

    "& div.mediaContainer": {
      minHeight: "calc(100vh - 370px)",
      justifyContent: "space-between",

      [theme.breakpoints.down(600)]: {
        margin: 0,
      },

      [theme.breakpoints.down(950)]: {
        justifyContent: "space-evenly",
      },

      "& > div": {
        width: "49%",

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
        [theme.breakpoints.down(600)]: {
          width: "100%",
        },

        "& div.media": {
          height: "205px",
          display: "flex",
          background: theme.globals.colors.white,
          boxShadow: "0px 4px 50px rgb(0 0 0 / 7%)",
          alignItems: "center",
          paddingLeft: "14px",
          borderRadius: "5px",
          marginBottom: "15px",
          paddingRight: "10px",
          justifyContent: "space-around",

          [theme.breakpoints.down(960)]: {
            height: "unset",
            padding: "10px",
          },

          "& a.imageLink": {
            display: "inline-block",
            marginRight: "20px",
            width: "145px",
            height: "182px",

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

            "& img": {
              width: "100%",
              height: "100%",
              borderRadius: "10px",
            },
          },

          "& div.media-body": {
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            height: "90%",
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
              fontSize:
                theme.direction === "rtl"
                  ? theme.globals.fontSize.s
                  : theme.globals.fontSize.s - 2,
              lineHeight: "19px",
              color: theme.palette.primary.main,
              marginBottom: "8px",

              [theme.breakpoints.between(1300, 1400)]: {
                fontSize: theme.globals.fontSize.s,
              },
            },

            "& div.details": {
              height: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",

              "& span": {
                overflow: "hidden",
                display: "-webkit-box",
                "-webkitLineClamp": 5,
                "-webkitBoxOrient": "vertical",

                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: theme.globals.fontSize.xs + 1,
                lineHeight: "16px",
                color: theme.palette.primary.main,
                whiteSpace: "pre",

                [theme.breakpoints.between(1300, 1400)]: {
                  fontSize: theme.globals.fontSize.s - 2,
                },
              },
            },

            "& .gold": {
              color: theme.palette.secondary.main,
              display: "block",
              marginBottom: "5px",
            },

            "& a": {
              "& button": {
                color: theme.palette.secondary.main,
                width: "115px",
                border: `1px solid ${theme.palette.secondary.main}`,
                height: "25.68px",
                display: "block",
                padding: "0",
                fontSize: theme.globals.fontSize.s - 2,
                boxSizing: "border-box",
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontWeight: "500",
                lineHeight: "16px",
                borderRadius: "3px",
                background: theme.globals.colors.white,
              },
            },

            "& a:hover": {
              textDecoration: "none",
              boxShadow: "unset",
            },
          },
        },
      },
    },
  },
  search: {
    marginBottom: 35,
    [theme.breakpoints.down(768)]: {
      marginRight: "7px",
    },
    [theme.breakpoints.down(600)]: {
      display: "block",
      marginBottom: 26,
      marginTop: 24,
      paddingLeft: "16px",
    },
    height: "auto",
    minHeight: "75px",
    display: "flex",
    backgroundColor: theme.globals.colors.bgWhite,
    padding: "8px",
    boxShadow: "0px 1px 4px rgb(0 0 0 / 10%)",
    paddingBottom: "7px",
    borderRadius: "5px",
  },
  searchTitle: {
    "& .MuiTextField-root": {
      width: "95%",

      "& label.MuiFormLabel-root": {
        textTransform: "capitalize",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
    },
    "& .MuiInputBase-root > input": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
  searchSelect: {
    "& div.MuiFormControl-root": {
      width: "96%",

      "& label": {
        textTransform: "capitalize",
        textAlign: "start",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },

      "& div.MuiInputBase-root": {
        display: "flex",
        justifyContent: "flex-end",

        "& svg.MuiSelect-icon.MuiSvgIcon-root": {
          right: "unset!important",
          left: "unset!important",
        },
      },
    },

    "& span.error": {
      color: "red",
      fontSize: theme.globals.fontSize.xs - 1,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
  btns: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBtn: {
    height: 30,
    textTransform: "capitalize",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.secondary.main,
    border: "1px solid",
    display: "flex",
    minWidth: 95,
    position: "relative",
    [theme.breakpoints.down(600)]: {
      marginTop: 16,
      marginBottom: 26,
    },
    "&:hover": {
      backgroundImage: "url(/assets/images/home/btn.png)",
      color: "white",
    },
    "& .MuiButton-label": {
      width: "auto",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
  table: {
    marginTop: 30,
    "& > div > div table thead tr th span button": {
      width: "100%",
    },
  },
}));

export default useStyles;
