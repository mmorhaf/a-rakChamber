import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    zIndex: "1400",
    background: "transparent",
    height: "120px",
    width: "93px",
    display: "grid",
    placeItems: "center",
    padding: "10px",

    [theme.breakpoints.down(900)]: {
      width: "59px",
      height: "65px",
      display: "grid",
      padding: "2px 5px 5px 5px",
      borderRadius: "0px 0px 5px 5px",
    },

    "& img": {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
  },
}));

export default useStyles;
