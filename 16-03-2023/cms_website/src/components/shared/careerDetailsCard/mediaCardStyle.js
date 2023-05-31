import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  mediaCard: {
    height: 245,
    width: "97%",
    boxShadow: "0px 0px 15px 3px rgba(0, 0 ,0 , 0.08)",
    background: theme.globals.colors.white,
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
    [theme.breakpoints.down(480)]: {
      height: 200,
    },
    [theme.breakpoints.down(480)]: {
      flexDirection: "column-reverse",
      height: "auto",
      width: "100%",
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
      [theme.breakpoints.between(600, 750)]: {
        minWidth: 85,
      },
      [theme.breakpoints.down(750)]: {
        width: "135px",
        height: "160px",
      },

      [theme.breakpoints.down(580)]: {
        width: "125px",
        height: "160px",
      },
      [theme.breakpoints.down(480)]: {
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

      minWidth: 80,
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
      fontSize: "14px",
      "& > span ": {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkitLineClamp": 3,
        "-webkitBoxOrient": "vertical",
        textAlign: "start",
      },
    },
  },
  dateDirection: {
    direction: theme.direction === "rtl" ? "rtl!important" : "ltr!important",
    display: "flex",
    padding: "0px 4px",
  },
  inActive: {
    position: "relative",

    "&:after": {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      content: "''",
      background: "#e0e0e0",
      opacity: 0.6,
      zIndex: 1000,
    },

    "&:hover": {
      cursor: "unset",

      transform: "scale(1)",

      "&:before ": {
        transform: "translateX(-100%)",
        opacity: "0.2",
        width: "100%",
      },

      "& .MuiCardMedia-root": {
        transform: "scale(1)",
        margin: "10px",
        borderRadius: "10px",
        border: "1px solid transparent",
      },
    },
  },

  contentContainer: {
    padding: "10px",
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

    [theme.breakpoints.down(960)]: {
      height: "90px",
    },

    [theme.breakpoints.between(580, 650)]: {
      fontSize: theme.globals.fontSize.xs + 1,
    },

    [theme.breakpoints.down(480)]: {
      height: "auto",
      width: "97%",
    },
    "& .MuiCardHeader-title": {
      overflow: "hidden",
      display: "-webkit-box",
      "-webkitLineClamp": 2,
      "-webkitBoxOrient": "vertical",
      textAlign: "start",
      fontSize: theme.globals.fontSize.s + 2,
      color: theme.globals.colors.textDark,
      fontWeight: "600",
      minHeight: 22,
      [theme.breakpoints.between(1500, 1550)]: {
        fontSize: theme.globals.fontSize.xs - 1,
      },

      [theme.breakpoints.between(1000, 1050)]: {
        fontSize: theme.globals.fontSize.xs - 1,
      },
    },
  },

  date: {
    display: "inline-block",
    fontSize: theme.globals.fontSize.s - 2,
    width: "100%",
    textAlign: "start",
    color: "#A7A7A7",
    width: "100%",
    textAlign: "start",
    fontWeight: "600",
    direction: "ltr!important",
    display: "flex",
    flexDirection: theme.direction === "rtl" ? "row-reverse" : "row",
    "& svg": {
      fontSize: theme.globals.fontSize.m + 2,
      marginRight: 6,
    },
  },
  btnLink: {
    width: "100%",
    display: "flex",
    justifyContent: "end",
  },
  main: {
    overflow: "hidden",
    display: "-webkit-box",
    "-webkitLineClamp": 2,
    "-webkitBoxOrient": "vertical",
    textAlign: "start",
    fontSize: theme.globals.fontSize.s + 2,
    color: "#444444",
    fontWeight: "600",
    minHeight: 22,
    [theme.breakpoints.down(480)]: {
      fontSize: theme.globals.fontSize.s,
    },
  },
  label: {
    color: "#5E5E5E",
    fontWeight: 600,
    fontSize: theme.globals.fontSize.s - 2,
    whiteSpace: "nowrap",
  },
  MainParagraph: {
    color: "#5E5E5E",
    fontWeight: 400,
    fontSize: theme.globals.fontSize.s - 2,
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "1",
  },
}));

export default useStyles;
