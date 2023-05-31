import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 5,
    boxShadow: "0px 11px 20px -12px rgb(0 0 0 / 25%)",
    position: "relative",
    transform: "scale(1)",
    transition: "all 500ms cubic-bezier(0.445, 0.05, 0.55, 0.95)",

    "& .MuiCardActionArea-root": {
      cursor: "default",
    },
    "& .MuiCardContent-root": {
      paddingLeft: "7px!important",
    },
    "&:before": {
      width: "0%",
      height: "1px",
      content: '""',
      zIndex: "1",
      position: "absolute",
      transform: "translateX(0%)",
      transition: "all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95)",
      backgroundColor: "#bf9e66",
    },
    "&:hover": {
      transform: "scale(1.05)",
      "&:before": {
        width: "100%",
        opacity: "0.2",
        transform: "translateX(100%)",
      },
    },
  },
  media: {
    height: 210,
    margin: 7,
    padding: 5,
  },
  header: {
    fontSize: theme.globals.fontSize.s,
    color: theme.globals.colors.textDark,
    fontWeight: 600,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    display: "-webkit-box",
    overflow: "hidden",
    maxHeight: 40,
    transition: "transform 0.4s ease",
    // wordBreak: "break-all",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    textTransform: "capitalize",
  },
  subHeader: {
    fontSize: theme.globals.fontSize.xs,
    color: theme.globals.colors.textLight,
    marginLeft: "-5px",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    display: "-webkit-box",
    overflow: "hidden",
    maxHeight: 40,
    transition: "transform 0.4s ease",
    // wordBreak: "break-all",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
  },
  send: {
    fontSize: theme.globals.fontSize.s,
    color: theme.palette.primary.main,
    textTransform: "capitalize",
    overflow: "hidden",
    transition: "background-color 500ms cubic-bezier(0.215, 0.61, 0.355, 1)",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.globals.colors.white,
      boxShadow: "none",
    },
  },
}));

export default useStyles;
