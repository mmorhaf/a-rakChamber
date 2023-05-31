import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  inActiveCard: {
    background: "rgba(0,0,0,0.1)!important",
    cursor: "none!important",
  },
  mediaCard: {
    height: 200,
    width: "96%",
    boxShadow: "0px 0px 15px 2px rgba(0, 0 ,0 , 0.08)",
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
    [theme.breakpoints.down(900)]: {
      width: "100%",
    },
    [theme.breakpoints.down(355)]: {
      justifyContent: "flex-start",
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
      [theme.breakpoints.down(355)]: {
        minWidth: 100,
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
      [theme.breakpoints.down(768)]: {
        position: "absolute",
        bottom: "27px",
      },

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
      "&  p.text ": {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkitLineClamp": 2,
        "-webkitBoxOrient": "vertical",
        textAlign: "start",
        fontSize: `${theme.globals.fontSize.s - 2}px!important`,
        // backgroundColor: "#fff!important",
        fontWeight: "400!important",
        fontStyle: "normal!important",
        color: "#747474!important",
        "& *": {
          color: `${theme.globals.colors.textLight}!important`,
          backgroundColor: "transparent!important",
        },
      },

      "& p>p :nth-child(n+2)": {
        display: "none!important",
      },
    },
  },
  noBackGroundColor: {
    backgroundColor: "transparent!important",
  },
  text: {
    overflow: "hidden",
    display: "-webkit-box",
    "-webkitLineClamp": 2,
    "-webkitBoxOrient": "vertical",
    textAlign: "start",
    fontSize: `${theme.globals.fontSize.s - 2}px!important`,
    backgroundColor: "#fff",
    fontWeight: "400!important",
    fontStyle: "normal!important",
    color: "#747474!important",
    "& *": {
      color: `${theme.globals.colors.textLight}!important`,
      backgroundColor: "transparent!important",
    },
  },
  contentContainer: {
    padding: "10px 0 10px 10px",

    fontSize: theme.globals.fontSize.s + 2,
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

    [theme.breakpoints.down(600)]: {
      height: "90px",
      width: "200px",
    },

    [theme.breakpoints.between(580, 650)]: {
      fontSize: theme.globals.fontSize.xs + 1,
    },

    "& .MuiCardHeader-title": {
      // overflow: "hidden",
      // display: "-webkit-box",
      // "-webkitLineClamp": 2,
      // "-webkitBoxOrient": "vertical",
      // textAlign: "start",
      // fontSize: theme.globals.fontSize.s + 2,
      // color: theme.globals.colors.textDark,
      // fontWeight: "600",
      // minHeight: 22,
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
    // "& div:last-child": {
    //   width: "100%",
    //   display: "flex",
    //   justifyContent: "flex-end",
    // },
  },

  date: {
    color: theme.globals.colors.textLight,
    display: "inline-block",
    fontSize: theme.globals.fontSize.s - 2,
    width: "100%",
    textAlign: "start",
    fontWeight: "normal",
    marginBottom: 3,
    textTransform: "capitalize",
    display: "flex",
    "& svg": {
      fontSize: theme.globals.fontSize.m + 2,
      marginRight: 6,
    },
  },
  title: {
    overflow: "hidden",
    display: "-webkit-box",
    "-webkitLineClamp": 2,
    "-webkitBoxOrient": "vertical",
    textAlign: "start",
    fontSize: theme.globals.fontSize.s + 2,
    color: "#505050",
    fontWeight: "600",
    minHeight: 22,
  },
  b: {
    width: "100%",
    "& button": {
      float: "right",
    },
  },
  null: {
    display: "none!important",
  },
}));

export default useStyles;
