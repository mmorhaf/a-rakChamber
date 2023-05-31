import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    // minHeight: "100vh",

    "& div.homeCarousselContainer": {
      height: "100vh",
    },
  },
  bgColor: {
    backgroundColor: theme.globals.colors.bgWhite,
  },
  services: {
    position: "absolute",
    top: "43vh",
    width: "100%",

    [theme.breakpoints.down(600)]: {
      top: "42vh",
    },
  },

  floatingSocial: {
    position: "absolute",
    right: "0",
    top: "19vh",
    zIndex: "10",

    [theme.breakpoints.up(1300)]: {
      top: "28vh",
    },
  },
}));

export default useStyles;
