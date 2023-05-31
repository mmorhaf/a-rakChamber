import { makeStyles } from "@material-ui/styles";

const useVideoBtnStyles = makeStyles((theme) => ({
  root: {
    position: "relative",

    "&:hover": {
      transform: "scale(1.01)",
    },

    "&:hover div.circle": {
      opacity: 1,
    },

    "& div.circle": {
      position: "absolute",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: theme.globals.colors.white,
      opacity: "0.7",
      top: "calc(50% - 20px)",
      right: "calc(50% - 20px)",
      display: "grid",
      placeItems: "center",

      "& svg": {
        color: "rgba(0,0,0,0.6)",
      },
    },
  },
}));

export default useVideoBtnStyles;
