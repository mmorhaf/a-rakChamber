import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  mediaCard: {
    height: 200,
    width: "97%",
    boxShadow: "0px 15px 15px -8px rgba(0, 0 ,0 , 0.08)",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    position: "relative",
    transform: "scale(1)",
    transition: "all 300ms ease-in-out",
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
      textTransform: "capitalize",

      color: theme.palette.secondary.main,

      display: "flex",
      justifyContent: "flex-start",
      minWidth: 80,
      position: "relative",
      "& .MuiButton-endIcon": {
        position: "absolute",
        opacity: "0",
        right: -20,
        transition: "0.5s",
        transform: theme.direction === "rtl" ? "rotateY(180deg)" : "",
      },
      "& .MuiButton-label": {
        width: "auto",
        marginRight: 10,
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      "&:hover": {
        borderRadius: 7,
        padding: "4px 8px",

        "& .MuiButton-endIcon": { opacity: "1", right: 3 },
      },
    },
    "& .MuiCardContent-root , .MuiCardHeader-root": {
      padding: 0,
    },
    "& .MuiCardHeader-root": {
      marginBottom: theme.spacing(1),
      marginLeft: 4,
    },
    "& .MuiCardContent-root ": {
      flex: "1 1 auto",
      "& > span ": {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkitLineClamp": 3,
        "-webkitBoxOrient": "vertical",
        textAlign: "start",
        marginBottom: 5,
        "& *": {
          color: "#505050!important",
        },
      },
    },
  },
  contentContainer: {
    padding: "10px 0 10px 10px",
    fontSize: theme.globals.fontSize.xs,
    fontStyle: "normal",
    width: "60%!important",
    overflow: "hidden",
    fontWeight: "400",
    lineHeight: "18px",
    color: theme.globals.colors.textLight,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",

    [theme.breakpoints.between(960, 1000)]: {
      fontSize: theme.globals.fontSize.xs - 2,
    },

    [theme.breakpoints.down(960)]: {
      height: "90px",
    },

    [theme.breakpoints.between(580, 650)]: {
      fontSize: theme.globals.fontSize.xs + 1,
    },

    "& .MuiCardHeader-title": {
      overflow: "hidden",
      display: "-webkit-box",
      "-webkitLineClamp": 2,
      "-webkitBoxOrient": "vertical",
      textAlign: "start",
      fontSize: theme.globals.fontSize.s - 1,
      color: theme.globals.colors.textDark,
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
  },

  date: {
    color: theme.palette.secondary.main,
    display: "inline-block",
    fontSize: theme.globals.fontSize.s - 2,
    width: "100%",
    textAlign: "start",
    direction: "ltr!important",
    display: "flex",
    flexDirection: theme.direction === "rtl" ? "row-reverse" : "row",
    "& svg": {
      fontSize: theme.globals.fontSize.m + 2,
      marginRight: 6,
    },
  },
  link: {
    display: "inline-block",
  },
  icon: {
    marginRight: "5px",
  },
}));

export default useStyles;
