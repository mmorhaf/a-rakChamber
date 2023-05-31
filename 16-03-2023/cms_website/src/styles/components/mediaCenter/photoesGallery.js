import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  photoesRoot: {
    width: "100%",
    marginLeft: "auto",
    textAlign: "start",

    "& div.MuiContainer-root": {
      marginTop: "30px",

      "& div.pagination": {
        marginBottom: "50px",
      },
    },

    [theme.breakpoints.down(1300)]: {
      width: "100%",
    },

    "& div.albums": {
      minHeight: "calc(100vh - 370px)",
      marginTop: "50px",
      justifyContent: "space-between",

      [theme.breakpoints.down(950)]: {
        justifyContent: "space-evenly",
      },

      "& .MuiGrid-item": {
        marginBottom: "30px",
      },

      "& .MuiGrid-item:nth-child(even)": {
        "& div.MuiPaper-root": {
          float: "right",
          [theme.breakpoints.down(960)]: {
            float: "none",
          },
        },
      },
      "& .MuiGrid-item:nth-child(odd)": {
        "& div.MuiPaper-root": {
          float: "left",
          [theme.breakpoints.down(960)]: {
            float: "none",
          },
        },
      },

      "& div.card": {
        width: "95%",
        background: theme.globals.colors.white,
        boxShadow: "0px 4px 50px rgba(0, 0, 0 , 0.07)",
        borderRadius: 7,
        transition: "all 300ms ease-in-out",
        border: "none",
        position: "relative",
        [theme.breakpoints.down(600)]: {
          width: "100%",
        },
        "&:before": {
          top: "0",
          right: "0",
          width: "0%",
          height: "1px",
          content: '""',
          zIndex: "1",
          position: "absolute",
          transform: "translateX(0%)",
          transition: "all 500ms cubic-bezier(0.445, 0.05, 0.55, 0.95)",
          backgroundColor: "#bf9e66",
          WebkitTransition: "all 0.4s ease-in",
        },
        "&:hover": {
          "&:before": {
            width: "100%",
            opacity: "0.2",
            transform: "translateX(-100%)",
          },
        },
        "& .MuiCardHeader-content": {
          "& .MuiCardHeader-title": {
            fontWeight: 600,
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,

            fontSize: theme.globals.fontSize.s - 2,
            overflow: "hidden",
            display: "-webkit-box",
            "-webkitLineClamp": 1,
            "-webkitBoxOrient": "vertical",
            color: "#A7A7A7",
            fontWeight: "500",
            textTransform: "capitalize",
            display: "flex",
          },
          "& .MuiCardHeader-subheader": {
            color: theme.palette.primary.main,
            fontSize: theme.globals.fontSize.s + 1,
            fontWeight: 600,
            WebkitLineClamp: "1",
            lineHeight: "21px",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
          },
        },

        "& button": {
          width: "95%",
          marginRight: "auto",
          marginLeft: "auto",
          marginBottom: "8px",

          "& div:not(div.circle)": {
            width: "100%",
            height: "265px",
            backgroundSize: "contain",
          },
        },
      },
    },
  },
  date: {
    color: " #A7A7A7",
    fontWeight: 600,
    textTransform: "capitalize",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    display: "flex",
  },
  title: {
    color: "#263661",
    fontWeight: "600",
    fontSize: theme.globals.fontSize.s + 2,
    display: "-webkit-box",
    overflow: "hidden",
    lineHeight: "21px",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "1",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    textTransform: "capitalize",
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
  search: {
    display: "flex",
    backgroundColor: theme.globals.colors.bgWhite,
    paddingLeft: "32px",
    paddingRight: "32px",
    boxShadow: "0px 1px 4px rgb(0 0 0 / 10%)",
    paddingBottom: "7px",
    borderRadius: "5px",
    paddingTop: 10,
    [theme.breakpoints.down(600)]: {
      display: "block",
      marginBottom: 26,
      marginTop: 24,
    },
    height: "auto",
    minHeight: "75px",
  },
  searchTitle: {
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
  btns: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

export default useStyles;
