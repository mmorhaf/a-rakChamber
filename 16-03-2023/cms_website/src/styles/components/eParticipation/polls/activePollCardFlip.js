import { makeStyles } from "@material-ui/styles";

const useCardFlipStyles = makeStyles((theme) => ({
  cardFlipRoot: {
    perspective: "100rem",
    width: "100%",
    // height: "320px",
    // marginBottom: "50px",

    "& div.card-body": {
      transformStyle: "preserve-3d",
      transition: "0.3s transform",
      // height: "auto",
      // position: "relative",
      "& div.card-front": {
        // height: "100%",
        // position: "absolute",
        // top: 0,
        // right: 0,
        // bottom: 0,
        // left: 0,
        backfaceVisibility: "hidden",
        backgroundColor: theme.globals.colors.white,
      },

      "& div.card-back": {
        // height: "100%",
        backfaceVisibility: "hidden",
        // position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        transform: " rotateX(-180deg)",
        backgroundColor: theme.globals.colors.white,
      },
    },

    "& div.flip.card-body": {
      transform: "rotateX(180deg)",
    },

    "& > .flip > .card-front": {
      display: "none",
    },
  },
}));

export default useCardFlipStyles;
