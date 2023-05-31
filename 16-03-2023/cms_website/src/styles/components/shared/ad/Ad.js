import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme, isRTL) => ({
  root: {
    "& .slick-slider": {
      direction: isRTL ? "rtl" : "ltr",
    },
    "& div.slick-active.slick-slide": {
      zIndex: 10,
    },
  },
  hiddenOverflow: {
    overflow: "hidden",
  },
  height50: {
    height: 50,
  },
  adContainer: {
    [theme.breakpoints.between(379, 1243)]: {
      margin: "0px 5px",
    },
    marginTop: 30,
    border: "0.25px solid #ABABAB",
    borderRadius: "5px",
    padding: 20,
    backgroundColor: "#fff",
  },

  contentContainer: {
    textAlign: "start",
    display: "flex",
    flexDirection: "column",
  },

  header: {
    fontSize: theme.globals.fontSize.s + 2,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontWeight: "600",
    color: "#444444",
    paddingLeft: 20,
    borderLeft: "1px solid #444444",
    borderWidth: "4px",
    textTransform: "capitalize",
  },
  headerContainer: {
    flex: "1 1 auto",
  },
  summary: {
    [theme.breakpoints.between(379, 768)]: {
      paddingLeft: "2px",
      marginBottom: "10px",
    },
    fontSize: theme.globals.fontSize.xs + 2,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    color: "#444444",
    paddingLeft: 20,
    paddingTop: 20,
    height: 150,
    overflow: "hidden",
    display: "-webkit-box",
    "-webkitBoxOrient": "vertical",
    "-webkitLineClamp": 6,
    textTransform: "capitalize",
    [theme.breakpoints.down(600)]: {
      height: "auto",
    },
  },

  image: {
    height: 200,
    width: 250,
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down(600)]: {
      width: "100%",
    },
    "& img": {
      objectFit: "cover",
      width: "100%",
      height: "100%",
    },
  },

  link: {
    height: 30,
    textTransform: "capitalize",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    border: "1px solid #ABABAB",
    display: "flex",
    width: 111,
    position: "relative",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    color: theme.globals.colors.textDark,
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: theme.globals.fontSize.xs + 2,
    lineHeight: "16px",
    "&:hover": {
      background: "url(/assets/images/home/btn.png)",
      color: theme.globals.colors.white,
    },
    [theme.breakpoints.down(600)]: {
      marginBottom: 16,
    },
  },
  button: {
    height: 30,
    textTransform: "capitalize",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    border: "1px solid #ABABAB",
    display: "flex",
    width: 111,
    position: "relative",

    "& span.MuiButton-label": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      color: theme.globals.colors.textDark,
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: theme.globals.fontSize.xs + 2,
      lineHeight: "16px",
      textAlign: "center",
    },

    "&:hover": {
      background: "url(/assets/images/home/btn.png)",

      "& span.MuiButton-label": {
        color: theme.globals.colors.white,
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
    },
  },
}));

export default useStyles;
