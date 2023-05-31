import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "95%",
    marginLeft: "auto",

    "& div.carousel-inner": {
      "& div.carousel-item": {
        "& img": {
          width: "100%!important",
        },
      },
    },
  },
  contents: {
    minHeight: "calc(100vh - 370px)",
  },

  aboutMainParagraph: {
    minHeight: "calc(100vh - 370px)",
    lineHeight: "2.1",
    color:
      theme.palette.type === "dark"
        ? theme.globals.colors.white
        : theme.palette.textMed.main,
    fontSize: theme.globals.fontSize.s,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,

    textAlign: "justify",
    width: "100%",
    paddingTop: "5%",
    paddingBottom: "5%",
    "& *": {
      fontFamily:
        theme.direction === "rtl"
          ? `${theme.globals.fontFamily.ar}!important`
          : `${theme.globals.fontFamily.en}!important`,
    },
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
}));
export default useStyles;
