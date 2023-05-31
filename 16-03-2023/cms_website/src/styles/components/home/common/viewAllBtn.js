import { makeStyles } from "@material-ui/styles";

const useBtnStyles = makeStyles((theme) => ({
  btnContainer: {
    width: "98%",
    height: "41px",
    marginTop: 50,
    // marginBottom: 30,
    display: "flex",
    justifyContent: "flex-end",
    direction: theme.direction === "rtl" ? "rtl!important" : "ltr!important",
    [theme.breakpoints.down(650)]: {
      justifyContent: "center",
    },
  },
  marginTop80: {
    marginTop: "80px!important",
  },
  viewAllBtn: {
    width: "132px",
    height: "41px",
    textTransform: "unset",
    background: "rgba(255, 255, 255, 0.78)",
    borderRadius: "5px",
    border: `1px solid ${theme.palette.primary.main}`,
    transition: "all .5s ease-in-out",
    boxShadow: "none",

    "&:before": {
      content: '""',
      width: "12px",
      height: "12px",
      borderTop: `2px solid ${theme.palette.primary.main}`,
      borderLeft: `2px solid ${theme.palette.primary.main}`,
      borderTopLeftRadius: 4,
      position: "absolute",
      top: "5px",
      left: "5px",
      transition: "all .5s ease-in-out",
    },

    "& span.MuiButton-label": {
      fontSize: theme.globals.fontSize.s,
      fontWeight: "600",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      textTransform: "capitalize",
      color: theme.palette.primary.main,
    },

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.78)",

      // "&:before": {
      //   top: "-6px",
      //   left: "-6px",
      //   width: "100%",
      //   height: "100%",

      //   border: `1px solid ${theme.palette.primary.main}`,
      //   borderRadius: 5,
      // },
    },
  },
}));

export default useBtnStyles;
