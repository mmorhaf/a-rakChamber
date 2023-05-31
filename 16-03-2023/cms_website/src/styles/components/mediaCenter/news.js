import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  newsRoot: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    width: "100%",
    justifyContent: "center",

    "& div.MuiContainer-root": {
      marginTop: "30px",
      textAlign: "start",

      "& div.pagination": {
        marginBottom: "50px",
      },
    },
  },

  latest: {
    "& div.latestHeader": {
      marginBottom: "20px",
      marginTop: "15px",
      display: "flex",

      marginRight: "auto",
      marginLeft: "auto",

      "& div.heading": {
        width: "max-content",
        margin: "0px 25px 0px 0px",
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

  news: {
    marginTop: "50px",
    minHeight: "39vh",
    justifyContent: "flex-start",
    [theme.breakpoints.between(379, 959)]: {
      justifyContent: "center",
      display: "flex",
    },
    "& .MuiGrid-item": {
      marginBottom: "30px",
      [theme.breakpoints.between(379, 959)]: {
        justifyContent: "center",
        display: "flex",
        flexBasis: "80%",
      },
    },

    "& .MuiGrid-item:nth-child(even)": {
      "& div.MuiPaper-root": {
        [theme.breakpoints.down(768)]: {
          float: "left",
        },
        float: "right",
      },
    },
    "& .MuiGrid-item:nth-child(odd)": {
      "& div.MuiPaper-root": {
        float: "left",
      },
    },
  },
  search: {
    [theme.breakpoints.down(768)]: {
      marginRight: "7px",
    },
    [theme.breakpoints.down(600)]: {
      display: "block",
      marginBottom: 26,
      marginTop: 24,
    },
    height: "auto",
    minHeight: "75px",
    display: "flex",
    backgroundColor: theme.globals.colors.bgWhite,
    paddingLeft: "32px",
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
  table: {
    marginTop: 30,
    "& > div > div table thead tr th span button": {
      width: "100%",
    },
  },
}));

export default useStyles;
