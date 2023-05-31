import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  mediaCard: {
    marginBottom: "10px",
    height: 200,
    width: "97%",
    boxShadow: "0px 0px 15px 2px rgba(0, 0 ,0 , 0.08)",
    background: theme.globals.colors.white,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "start",
    position: "relative",
    transform: "scale(1)",
    transition: "all 300ms ease-in-out",
    [theme.breakpoints.down(660)]: {
      width: "100%",
      height: "auto",
      flexDirection: "column-reverse",
    },
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

      [theme.breakpoints.between(660, 950)]: {
        height: "170px",
      },

      [theme.breakpoints.down(750)]: {
        width: "135px",
        height: "160px",
      },
      [theme.breakpoints.down(660)]: {
        width: "95%",
        height: 200,
        maxWidth: "100%",
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
        "-webkitLineClamp": 3,
        "-webkitBoxOrient": "vertical",
        textAlign: "start",
        fontSize: `${theme.globals.fontSize.s - 2}px!important`,
        backgroundColor: "#fff!important",
        fontWeight: "400!important",
        fontStyle: "normal!important",
        color: "#505050!important",
        "& *": {
          fontSize: `${theme.globals.fontSize.s - 2}px!important`,
          backgroundColor: "#fff!important",
          fontWeight: "400!important",
          fontStyle: "normal!important",
          color: "#505050!important",
        },
      },
    },
  },
  dateDirection: {
    display: "flex",
    padding: "0px 4px",
  },
  contentContainer: {
    padding: "10px 0 10px 10px",
    fontSize: theme.globals.fontSize.xs,
    fontStyle: "normal",
    width: "60%",
    fontWeight: "400",
    lineHeight: "18px",
    color: theme.globals.colors.textLight,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",

    [theme.breakpoints.between(960, 1000)]: {
      fontSize: theme.globals.fontSize.xs - 2,
    },

    [theme.breakpoints.between(580, 650)]: {
      fontSize: theme.globals.fontSize.xs + 1,
    },
    [theme.breakpoints.down(660)]: {
      width: "97%",
      height: "auto",
    },
    "& .MuiCardHeader-subheader": {
      overflow: "hidden",
      display: "-webkit-box",
      "-webkitLineClamp": 2,
      "-webkitBoxOrient": "vertical",
      textAlign: "start",
      fontSize: theme.globals.fontSize.s + 2,
      color: "#505050",
      fontWeight: "600",
      minHeight: 22,
      [theme.breakpoints.between(1500, 1550)]: {
        fontSize: theme.globals.fontSize.xs - 1,
      },

      [theme.breakpoints.between(1000, 1050)]: {
        fontSize: theme.globals.fontSize.xs - 1,
      },

      [theme.breakpoints.down(580)]: {
        display: "none",
      },
    },
    "& .MuiCardHeader-title": {
      fontSize: 14,
      color: "#A7A7A7",
      fontWeight: 600,
    },
  },

  date: {
    display: "-webkit-box",
    fontSize: theme.globals.fontSize.s - 2,
    width: "100%",
    textAlign: "start",
    textTransform: "capitalize",
    "& svg": {
      fontSize: theme.globals.fontSize.m + 2,
      marginRight: 6,
    },
  },
  body: {
    color: theme.globals.colors.textLight,
  },
  summary: { color: theme.globals.colors.textMed },
  endBtn: {
    display: "flex",
    alignSelf: "flex-end",
    [theme.breakpoints.down(550)]: {
      marginRight: 8,
    },
  },
}));

export default useStyles;
