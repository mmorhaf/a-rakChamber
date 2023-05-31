import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& div.searchContainer": {
      marginTop: "50px",
      marginBottom: "50px",
      minHeight: "20vh",

      "& h1": {
        textAlign: "start",
        height: `calc(100vh - 654px)`,
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: theme.globals.fontSize.s,
        color: theme.palette.primary.main,
        marginTop: "15px",
        marginBottom: "15px",
      },

      "& a.containerLink": {
        textDecoration: "none",

        "& div.MuiPaper-root": {
          transition: "all 0.3s",
          marginBottom: "10px",
          border: 0,
          boxShadow: "0 0 2px 1px rgb(0 0 0 / 20%)",
          padding: 16,
          textAlign: "start",
          fontFamily:
            theme.direction === "rtl"
              ? `${theme.globals.fontFamily.ar}!important`
              : `${theme.globals.fontFamily.en}!important`,
          "& .MuiTypography-root": {
            lineHeight: 1.7,
          },
          "& *": {
            fontFamily:
              theme.direction === "rtl"
                ? `${theme.globals.fontFamily.ar}!important`
                : `${theme.globals.fontFamily.en}!important`,
          },
          "&:hover": {
            transform: "scale(1.01)",
            boxShadow: "0 0 8px 1px rgb(0 0 0 / 20%)",
          },

          "& div.category": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: theme.globals.fontSize.s - 2,
            color: theme.palette.primary.main,
            textAlign: "start",
            marginTop: "5px",
            marginBottom: "1px",
            textTransform: "capitalize",
          },

          "& h3": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: theme.globals.fontSize.s - 2,
            color: theme.palette.primary.main,
            textAlign: "start",
            marginTop: "15px",
            marginBottom: "15px",
            textTransform: "capitalize",
          },
          "& p.text": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: theme.globals.fontSize.xs,
            color: theme.palette.primary.main,
            textAlign: "start",
            marginTop: "15px",
            marginBottom: "15px",
            paddingLeft: "12px",
            overflow: "hidden",
            display: "-webkit-box",
            "-webkitLineClamp": 3,
            "-webkitBoxOrient": "vertical",
          },

          "& p.text :nth-child(n+2)": {
            display: "none!important",
          },
        },
      },
    },
  },
  search: {
    display: "flex",
    backgroundColor: theme.globals.colors.bgWhite,
    paddingLeft: "32px",
    paddingRight: "32px",
    boxShadow: "0px 1px 4px rgb(0 0 0 / 10%)",
    paddingBottom: "7px",
    borderRadius: "5px",
    paddingTop: 10,
    justifyContent: "space-between",
    [theme.breakpoints.down(600)]: {
      display: "block",
      marginBottom: 26,
      marginTop: 24,
    },
    height: "auto",
    minHeight: "75px",
  },
  searchTitle: {
    // position: "relative",
    // bottom: 0,
    "& .MuiTextField-root": {
      width: "95%",
      "& label": {
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
  btns: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    [theme.breakpoints.down(600)]: {
      justifyContent: "center",
    },
  },
}));

export default useStyles;
