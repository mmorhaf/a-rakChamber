import { makeStyles } from "@material-ui/styles";

const useCardFlipStyles = makeStyles((theme) => ({
  cardFlipRoot: {
    perspective: "100rem",
    width: "100%",
    // height: "320px",
    // marginBottom: "50px",
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    "& div.card-body": {
      transformStyle: "preserve-3d",
      transition: "0.3s transform",
      padding:"0px",
      "& div.card-front": {
        height: "100%",
        backfaceVisibility: "hidden",
        backgroundColor: theme.globals.colors.white,
        boxShadow: 'none',
        "& .MuiCardContent-root":{
          height: "100%",
          "& .MuiBox-root:nth-child(2)":{
    height: "calc(100% - 70px)",
"& > form":{
  height: "100%",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
"& .btnContainer":{
  flex: 'inherit',
  marginBottom:"0px!important"
},
},
          },
          },
        "& .cardContentContainer":{
        height: "100%",
        },
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
