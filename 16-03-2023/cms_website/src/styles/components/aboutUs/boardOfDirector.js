import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    // minHeight: "76vh",
    "& .MuiCardActionArea-root": {
      display: "flex",
      flexDirection: "column",
    },
    "& .MuiCardContent-root": {
      textAlign: "center",

      "& h2": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: theme.globals.fontSize.xs,
        lineHeight: "16px",
        color: theme.palette.primary.main,
        marginBottom: 10,
      },

      "& p": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: theme.globals.fontSize.xs,
        lineHeight: "16px",
        color: theme.palette.primary.main,
      },
    },
    "& > div.MuiGrid-item:first-child ": {
      maxWidth: "100%",
      flexBasis: "100%",
      "&>div": {
        width: "22.4%",
        [theme.breakpoints.down(960)]: {
          width: "95%",
        },
        [theme.breakpoints.down(600)]: {
          width: "90%",
        },
      },
    },
  },
  boardOfDirectorImage: {
    width: "100%",
    paddingBottom: "5%",
  },
  media: {
    height: 140,
    backgroundSize: "contain !important",
    backgroundRepeat: "no-repeat",
    borderRadius: "50%",
    width: "140px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },

  card: {
    "& > div.MuiPaper-elevation1": {
      margin: 6,
      marginBottom: 20,
      height: 255,
      background: theme.globals.colors.white,
      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      [theme.breakpoints.down(960)]: {
        margin: "6px auto",
      },
    },
  },
  position: {
    fontSize: 18,
    color: "#263661",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  },
  name: {
    fontSize: 14,
    color: "#263661",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  },
}));
export default useStyles;
