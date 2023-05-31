import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  mediaCard: {
    height: 247,
    width: "97%",
    boxShadow: "0px 0px 15px 2px rgb(0 0 0 / 8%)",
    background: theme.globals.colors.white,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    position: "relative",
    transform: "scale(1)",
    transition: "all 300ms ease-in-out",
    alignItems: "center",
    "& mark": {
      backgroundColor: "white",
    },
    "&:before ": {
      position: "absolute",
      content: '""',
      backgroundColor: theme.palette.secondary.main,
      zIndex: "1",
      WebkitTransition: "all 0.4s ease-in",
      transition: "all 500ms cubic-bezier(0.445, 0.05, 0.55, 0.95)",

      height: 1,
      width: "0%",
      transform: "translateX(0%)",
      top: 0,
      right: 0,
    },

    "& .MuiCardMedia-root": {
      minWidth: 155,
      maxWidth: 155,
      height: "200px",
      width: "40%",
      transform: "scale(1)",
      display: "flex",
      alignItems: "center",
      borderRadius: "10px",
      justifyContent: "center",
      margin: "10px",
      overflow: "hidden",
      border: "1px solid whitesmoke",
      transition: "all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95)",
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
        minWidth: 94,
      },
    },
    "&:hover": {
      cursor: "pointer",

      transform: "scale(1.02)",

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
      height: 30,
      textTransform: "capitalize",
      justifyContent: "center",
      alignItems: "center",
      color: theme.palette.secondary.main,
      border: "1px solid",
      display: "flex",

      minWidth: 100,
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

    "& .MuiCardContent-root , .MuiCardHeader-root": {
      padding: 0,
    },
    "& .MuiCardHeader-root": {
      marginBottom: theme.spacing(1),
    },
    "& .MuiCardContent-root ": {
      flex: "1 1 auto",
      "& > span ": {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkitLineClamp": 1,
        "-webkitBoxOrient": "vertical",
        textAlign: "start",
        "& *": {
          color: "#505050!important",
        },
      },
    },
  },
  disabledBtn: {
    background: "#ebebeb!important",
    cursor: "initial!important",
    "& :hover": {
      cursor: "initial!important",
    },
  },
  block: {
    display: "block!important",
  },
  contentContainer: {
    padding: "10px 0 10px 10px",
    fontSize: theme.globals.fontSize.xs,
    fontStyle: "normal",
    width: "60%",
    fontWeight: "400",
    lineHeight: "18px",
    color: "#444444",
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
      height: 28,
      overflow: "hidden",
      display: "-webkit-box",
      "-webkitLineClamp": 1,
      "-webkitBoxOrient": "vertical",
      textAlign: "start",
      fontSize: theme.globals.fontSize.s + 2,
      color: "#444444",
      fontWeight: "600",
      marginTop: 10,
      minHeight: 22,
    },
  },
  enableIcon: {
    color: "#F02525",
    fontSize: theme.globals.fontSize.s + 2,
  },
  enable: {
    color: "#F02525",
  },
  dis: {
    color: "#C4C4C4",
    fontSize: theme.globals.fontSize.s + 2,
    marginLeft: "3px",
  },
  detail: {
    color: "#505050",
    display: "inline-block",
    fontSize: theme.globals.fontSize.s - 2,
    width: "100%",
    textAlign: "start",
    marginBottom: "5px",
    "& .enableIcon": {
      color: "#F02525",
    },
    "& .enable": {
      color: "#F02525",
    },

    "& svg": {
      fontSize: theme.globals.fontSize.s + 2,
      marginRight: 6,
      color: "#C4C4C4",
    },
  },
  calendarIcon: {
    fontSize: "24px",
    color: "#DD6B20",
    top: "22px",
    right: 8,
    position: "absolute",
    marginLeft: "6px",
  },
  ext: {
    background: "#DD6B20",
    color: "white !important",
    width: "82px !important",
    padding: "3px 13px",

    height: "30px",
    fontWeight: "600",
    // margin: "0px 26px",
    borderRadius: "4px",
  },
  int: {
    background: "#B2C900",
    color: "white !important",
    width: "82px !important",
    padding: "3px 13px",
    height: "30px",
    fontWeight: "600",
    // margin: "0px 26px",
    borderRadius: "4px",
  },
  sands: {
    // "& > span:first-Child": {
    //   position: "relative",
    //   left: "500px",
    // },
    "& .enableIcon": {
      color: "#F02525 !important",
    },
    "& .enable": {
      color: "#F02525 !important",
    },
    "& > span": {
      display: "flex !important",
      justifyContent: "center",
    },
  },
  diableCard: {
    "& > div.MuiPaper-root": {
      position: "relative",
      cursor: "unset",

      "&:hover": {
        transform: "scale(1)",

        "& .MuiCardMedia-root": {
          transform: "scale(1)",
          margin: "10px",
          borderRadius: "10px",
          border: "1px solid whitesmoke",
        },
      },
    },
  },
  locationName: {
    color: "#505050 !important",
    fontSize: "16px !important",
    fontWeight: "500",
    alignItems: "center",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    "& > svg": {
      minWidth: "30px",
      margin: "6px 0px 6px -7px",
    },
  },
  calendar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    cursor: "pointer",
    "& > svg": {
      fontSize: "35px !important",
    },
  },
  Etitle: {
    position: "relative",
    width: "85%",
    display: "flex",
  },
}));

export default useStyles;
