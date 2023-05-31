import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "auto",

    "& div.mediaContainer": {
      marginTop: "50px",
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",

      "& > div": {
        width: "49%",

        "& div.media": {
          height: "205px",
          display: "inline-flex",
          background: theme.globals.colors.white,
          boxShadow: "0px 4px 50px rgb(0 0 0 / 7%)",
          alignItems: "center",
          paddingLeft: "14px",
          borderRadius: "5px",
          marginBottom: "15px",
          paddingRight: "10px",
          justifyContent: "space-around",
          width: "95%",
          marginRight: "120px",

          "& a": {
            display: "inline-block",
            marginRight: "20px",
            "& img": {
              width: "140px",
              height: "160px",
              borderRadius: "10px",
              border: `1px solid ${theme.palette.secondary.main}`,
              padding: "25px",
            },
          },

          "& div.media-body": {
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            height: "90%",
            justifyContent: "space-around",

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
              paddingTop: "35px",
            },
            "& span": {
              color: theme.palette.secondary.main,
            },

            "& div": {
              display: "flex",
              justifyContent: "space-between",
              width: "90%",

              "& button": {
                cursor: "pointer",
                width: "103px",
                height: "25px",
                border: `1px solid ${theme.palette.secondary.main}`,
                boxSizing: "border-box",
                borderRadius: "3px",
                backgroundColor: theme.globals.colors.white,
                padding: "0",
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: theme.globals.fontSize.s - 2,
                lineHeight: "19px",
                color: theme.palette.secondary.main,
              },
            },
          },
        },
      },
    },
  },
  minHeight76: {
    minHeight: "76vh",
  },
  search: {
    marginBottom: 30,
    [theme.breakpoints.down(600)]: {
      display: "block",
      marginBottom: 26,
      marginTop: 24,
    },
    [theme.breakpoints.down(768)]: {
      marginRight: "7px",
      paddingRight: "58px",
    },
    height: "auto",
    minHeight: "75px",
    display: "flex",
    backgroundColor: theme.globals.colors.bgWhite,
    paddingLeft: "32px",
    boxShadow: "0px 1px 4px rgb(0 0 0 / 10%)",
    paddingBottom: "7px",
    borderRadius: "5px",
    paddingTop: 10,
  },
  searchTitle: {
    "& .MuiTextField-root": {
      width: "95%",

      "& label.MuiFormLabel-root": {
        textTransform: "capitalize",
        textAlign: "start",
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
  },
  btns: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchBtn: {
    height: 30,
    textTransform: "capitalize",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.secondary.main,
    border: "1px solid",
    display: "flex",
    [theme.breakpoints.down(600)]: {
      marginTop: 16,
      marginBottom: 26,
    },
    minWidth: 95,
    position: "relative",
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
  allBtn: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "10px",
    marginBottom: "15px",

    "& button": {
      "& span.MuiButton-label": {
        "& span.collaBtn": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontSize: theme.globals.fontSize.s - 2,
          color: theme.palette.primary.main,
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "27px",
          textTransform: "capitalize",
          display: "flex",
          alignItems: "canter",

          "& span": {
            display: "flex",
            alignItems: "center",
            marginLeft: "5px",

            "& svg": {
              fontSize: theme.globals.fontSize.m - 2,
            },
          },
        },
      },
    },
  },
}));

export default useStyles;
